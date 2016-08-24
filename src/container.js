import React from 'react';
import { logWarning } from './propUtils';

class Container extends React.Component {
  // This is the component that my container is going to render
  setComponent(component, options = {}) {
    this.childComponent = component;
    const propTypes = component.propTypes || options.propTypes;
    if (!propTypes) {
      logWarning(`The component you are trying to render using the Redix Container has no propTypes.
        PropTypes are used to set the props the container will pass to the child component`);
    }

    // options.addProps are props that you want to explicitly pass down to the component that the container is rendering.
    // This is not needed if you name the functions that you want to pass down with the same name as the presentational component's propType.
    // options.addProps is not needed for properties t hatare injected already in the container, for instance
    // by other functions like react-redux connect function. In most cases you don't have to use options.addProps
    const addProps = options.addProps || {};

    let src = 'return {';
    for (let key in propTypes) {
      const addProp = addProps[key];
      if (addProp && typeof addProp === 'string') {
          src = src + `${key}: ${addProp},`;
      } else if (addProp) {
        logWarning(`{ addProps: {${key}} must be a string, example: 'this.state.user.id'`);
      } else {
        src = src + `${key}: this['${key}'] || props['${key}'],`;
      }
    }
    src = src.slice(0, -1) + '}';
    this.getChildProps = Function('props', src);

    const mapPropFuncs = options.mapPropFuncsToThis;
    if (mapPropFuncs) {
      // props that are functions become a property function of the Container object.
      // In other words, this.props.doSomething() becomes this.doSomething().
      // The reason is that I want to be able to inject those dependencies, for testing purposes for instance.
      // Props are read only so I can't change them. By using this.doSomething I can change doSomething at any point.
      for (let key in mapPropFuncs) {
        let prop = mapPropFuncs.functions ? mapPropFuncs.functions[key] || mapPropFuncs[key] : mapPropFuncs[key];
        if (!this.hasOwnProperty(key) && typeof prop === 'function') {
          this[key] = prop;
        }
      }
    }
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
      <ChildComponent {...this.getChildProps(this.props)} />
    );
  }
}

export default Container;
