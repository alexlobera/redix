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
    propTypes[key] = getPropType(reducedProps[key])
  }
  return propTypes;
}
