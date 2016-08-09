import React from 'react';

const ContainedComponent = containedComponent => props => {
  containedComponent.props = props;
  return (<i></i>)
};

export default ContainedComponent;
