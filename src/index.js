import React from 'react';
import { reduceProps, mapPropTypesToProps } from './propUtils';

const DependencyInjector = (props) => {
  class DIR extends React.Component {
    getChildContext() {
      return reduceProps(this.props);
    }
    render() {
      return this.props.children;
    }
  }

  DIR.childContextTypes = mapPropTypesToProps(props);

  return <DIR {...props} />;
}

export default DependencyInjector;
