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

export const mapPropTypesToProps = (props) => {
  const reducedProps = reduceProps(props);
  const propTypes = {};
  for (let key in reducedProps) {
    // https://facebook.github.io/react/warnings/dont-call-proptypes.html
    propTypes[key] = ()=>{};
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
