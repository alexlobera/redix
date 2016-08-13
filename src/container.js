import React from 'react';

class Container extends React.Component {
  constructor(props) {
    super(props);

    // props that are functions become a property function of the Container object.
    // In other words, this.props.doSomething() becomes this.doSomething().
    // The reason is that I want to be able to inject those dependencies, for testing purposes for instance.
    // Props are read only so I can't change them. By using this.doSomething I can change doSomething at any point.
    for (let key in props) {
      let prop = props.functions ? props.functions[key] || props[key] : props[key];
      if (!this.hasOwnProperty(key) && typeof prop === 'function') {
        this[key] = prop;
      }
    }
  }
  
  // This is the component that my container is going to render
  setComponent(component) {
    this.childComponent = component;
  }

  // These are the props that I want to pass down to the component that my container is rendering
  setProps(props) {
    this.childComponentProps = Object.assign({}, this.childComponentProps, props);
  }

  // This is a helper, it does 2 things:
  // 1. It binds a function to the container's context, meaning: this.doSomething = this.doSomething.bind(this)
  // 2. It sets the function as a prop so it will be passed down to the component the container is rendering. 
  bindProp(prop) {
    this[prop] = this[prop].bind(this);
    const newProp = {};
    newProp[prop] = this[prop];
    this.childComponentProps = Object.assign({}, this.childComponentProps, newProp);
  }

  render() {
    // The component that will be rendered can be set in two different ways:
    // 1. Via Container's props, example <ChatContainer component="MockChat" />. 
    //    It'll be available in the Container as this.props.component
    // 2. Via constructor of the component that extends this Container. 
    //    It'll be available as this.childComponent
    // this.props is checked first to enable dependency injection
    let ChildComponent = this.props.component || this.childComponent;
    return (
      <ChildComponent {...this.childComponentProps}/>
    );
  }
}

export default Container;
