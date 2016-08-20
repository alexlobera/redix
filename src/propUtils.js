import React from 'react';

// This component is for test doubles, that's why we return a "dummy" <i></i>
export const hookProps = component => props => {
  component.props = props;
  return (<i></i>)
};

export const reduceProps = (props) => (
  Object.keys(props).reduce((reducedProps, propKey) => {
    if (propKey !== 'children') {
      reducedProps[propKey] = props[propKey];
    }
    return reducedProps;
  }, {})
)

export const getPropType = (prop) => {
  const jsType = typeof prop;
  switch (jsType) {
    case 'array':
      return React.PropTypes.array;
    case 'boolean':
      return React.PropTypes.bool;
    case 'function':
      return React.PropTypes.func;
    case 'number':
      return React.PropTypes.number;
    case 'object':
      return React.PropTypes.object;
    case 'string':
      return React.PropTypes.string;
    case 'symbol':
      return React.PropTypes.symbol;
    default:
      new Error(`React PropType not found for ${jsType}`)
  }
}

export const mapPropTypesToProps = (props) => {
  const reducedProps = reduceProps(props);
  const propTypes = {};
  for (let key in reducedProps) {
    // temp workarround for
    // https://facebook.github.io/react/warnings/dont-call-proptypes.html
    propTypes[key] = ()=>{};//getPropType(reducedProps[key])
  }
  return propTypes;
}

export const logWarning = (message) => {
  const warning = `Warning: ${message}`;
  if (console.error) {
      console.error(warning);
  } else {
    console.log(warning);
  }
}
