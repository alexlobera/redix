import React from 'react';

const ContainedComponent = injectedProps => props => {
  injectedProps.props = props;
  return (<i></i>)
};

export default ContainedComponent;
