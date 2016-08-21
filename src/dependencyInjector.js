import React from 'react';
import { reduceProps, mapPropTypesToProps } from './propUtils';

class DependencyInjector extends React.Component {
  getChildContext() {
    return reduceProps(this.props);
  }
  render() {
    return this.props.children;
  }
}

class DI extends React.Component {
  constructor(props) {
    super(props);
    DependencyInjector.childContextTypes = mapPropTypesToProps(props);
  }
  render() {
    return <DependencyInjector {...this.props} />;
  }
}

export default DI;
