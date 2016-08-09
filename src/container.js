import React from 'react';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.setProps(props.injectProps);
  }
  render() {
    let ChildComponent = this.props.injectComponent || this.containedComponent;
    return (
      <ChildComponent {...this.props} {...this.newProps}/>
    );
  }
  setProps(props) {
    this.newProps = Object.assign({}, this.newProps, props);
  }
  setPropsAndBind(props) {
    for (var key in props) {
      this[key] = props[key].bind(this);
    }
    this.setProps(props);
  }
}

export default Container;
