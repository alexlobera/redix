import React from 'react';

const ContainedComponent = component => props => {
  component.props = props;
  return (<i></i>)
};

export default ContainedComponent;
