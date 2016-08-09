import React from 'react';

class Container extends React.Component {
  render() {
    let ChildComponent = this.props.injectComponent || this.containerComp;
    return (
      <ChildComponent {...this.props} {...this.newProps}/>
    );
  }
  setProps(props) {
    this.newProps = Object.assign({}, this.newProps, props);
  }
}

export default Container;
