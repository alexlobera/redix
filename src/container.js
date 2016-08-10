import React from 'react';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.setProps(props.injectProps);
    for (let key in props) {
      const prop = props.injectProps[key] || props[key];
      if (!this.hasOwnProperty(key) && typeof prop === 'function') {
        this[key] = prop.bind(this);;
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
