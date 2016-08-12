import React from 'react';

class Container extends React.Component {
  constructor(props) {
    super(props);
    if (props.props) {
      this.setProps(props.props);
    }
    for (let key in props) {
      let prop = props.props ? props.props[key] || props[key] : props[key];
      if (!this.hasOwnProperty(key) && typeof prop === 'function') {
        this[key] = prop;
      }
    }
  }
  
  setComponent(component) {
    this.childComponent = component;
  }

  setProps(props) {
    this.childComponentProps = Object.assign({}, this.childComponentProps, props);
  }

  bindProp(prop) {
    this[prop] = this[prop].bind(this);
    const newProp = {};
    newProp[prop] = this[prop];
    this.childComponentProps = Object.assign({}, this.childComponentProps, newProp);
  }
  render() {
    let ChildComponent = this.props.injectComponent || this.childComponent;
    return (
      <ChildComponent {...this.childComponentProps}/>
    );
  }
}

export default Container;
