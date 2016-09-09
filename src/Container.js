import React from 'react';
import { logWarning } from './propUtils';

class Container extends React.Component {
  // This is the component that my container is going to render
  setComponent(component, options = {}) {
    this.childComponent = component;
    this.options = options;

    const propTypes = component.propTypes || options.propTypes;
    if (!propTypes) {
      logWarning(`You are rendering ${component.name|| 'a component'} that has no propTypes. PropTypes are used by the Redix Container
      to set the props the container will pass to the child component. If ${component.name|| 'your component'} doesn't use any props then ignore this warning`);
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
          src += `${key}: ${addProp},`;
      } else if (addProp) {
        logWarning(`{ addProps: {${key}} must be a string, example: 'this.state.user.id'`);
      } else {
        src += `${key}: this['${key}'] || props['${key}'] || (this.state && this.state['${key}']),`;
      }
    }

    if (propTypes) {
        src = src.slice(0,-1)
    }
    src += '}';
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
  bindThis(funcNames) {
    const isArray = Object.prototype.toString.call(funcNames) === '[object Array]';
    if (isArray && funcNames.length === 0) {
      logWarning('bindThis paramameter can not be an empty array')
    } else if (isArray) {
      funcNames.map(funcName => {
        if (typeof funcName !== 'string') {
          logWarning('bindThis paramameter has to be an array of strings')
        } else {
          this.bindThisFunc(funcName);
        }
      })
    } else if (typeof funcNames === 'string') {
      this.bindThisFunc(funcNames);
    } else {
      logWarning('bindThis paramameter has to be either a string or an array of strings')
    }
  }

  bindThisFunc(funcName) {
    if (typeof this[funcName] === 'function') {
      this[funcName] = this[funcName].bind(this)
    } else {
      logWarning(`this.${funcName} is not a function`)
    }
  }

  render() {
    // The component that will be rendered can be set in two different ways:
    // 1. Via Container's props, example <ChatContainer component="MockChat" />.
    //    It'll be available in the Container as this.props.component
    // 2. Via constructor of the component that extends this Container.
    //    It'll be available as this.childComponent
    // this.props is checked first to enable dependency injection
    const ChildComponent = this.props.component || this.childComponent;
    const children = this.options.disablePropsChildren ? null : this.props.children;
    return (
      <ChildComponent {...this.getChildProps(this.props)} children={children}/>
    );
  }
}

export default Container;
