import React from 'react';

class Container extends React.Component {
  constructor(props) {
    super(props);
    if (props.injectProps) {
      this.setProps(props.injectProps);
    }
    for (let key in props) {
      let prop = props.injectProps ? props.injectProps[key] || props[key] : props[key];
      if (!this.hasOwnProperty(key) && typeof prop === 'function') {
        this[key] = prop;
      }
    }
  }
  setProps(props) {
    this.childNewProps = Object.assign({}, this.childNewProps, props);
  }

  bindProp(prop) {
    this[prop] = this[prop].bind(this);
    const newProp = {};
    newProp[prop] = this[prop];
    this.childNewProps = Object.assign({}, this.childNewProps, newProp);
  }
  render() {
    let ChildComponent = this.props.injectComponent || this.containerComponent;
    return (
      <ChildComponent {...this.props} {...this.childNewProps}/>
    );
  }
}

export default Container;
