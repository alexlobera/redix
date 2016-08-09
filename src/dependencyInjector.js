import React from 'react';
import { reduceProps, mapPropTypesToProps } from './propUtils';

class DIR extends React.Component {
  getChildContext() {
    return reduceProps(this.props);
  }
  render() {
    return this.props.children;
  }
}

class DependencyInjector extends React.Component {
  constructor(props) {
    super(props);
    DIR.childContextTypes = mapPropTypesToProps(props);
  }
  render() {
    return <DIR {...this.props} />;
  }
}

export default DependencyInjector;
