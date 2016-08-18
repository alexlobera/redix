import React from 'react';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.childComponentExpectedProps = [];
    this.childComponentProps = {};
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
  setComponent(component, propTypes) {
    this.childComponent = component;
    propTypes = component.propTypes || propTypes;
    console.log('asdfasdfafdasdf', propTypes);
    if (!propTypes) {
      const warning = `Warning, the component you are trying to render using the Redix Container has no propTypes`;
      if (console.error) {
         console.error(warning);
      } else {
        console.log(warning);
      }
    }
    for (let key in propTypes) {
      this.childComponentExpectedProps.push(key);
    }
  }

  // These are props that you want to explicitly pass down to the component that the container is rendering.
  // This is not needed if you name the class properties and functions that you want to pass down
  // with the same name as any of the presentational component's propTypes 
  setProps(props) {
    this.childComponentProps = Object.assign({}, this.childComponentProps, props);
  }

  // this is just syntactic sugar
  bindThis(func) {
    this[func] = this[func].bind(this);
  }

  render() {
    // The component that will be rendered can be set in two different ways:
    // 1. Via Container's props, example <ChatContainer component="MockChat" />. 
    //    It'll be available in the Container as this.props.component
    // 2. Via constructor of the component that extends this Container. 
    //    It'll be available as this.childComponent
    // this.props is checked first to enable dependency injection
    const ChildComponent = this.props.component || this.childComponent;
    return (
      <ChildComponent
          {...this.childComponentExpectedProps.reduce((previousValue, key) => {
            if (this.childComponentProps[key]) {
              previousValue[key] = this.childComponentProps[key];
            } else if (this.hasOwnProperty(key)) {
              previousValue[key] = this[key];
            } else if (typeof this.props[key] !== 'undefined') {
              previousValue[key] = this.props[key];
            }
            return previousValue;
          }, {})}
      />
    );
  }
}

export default Container;
