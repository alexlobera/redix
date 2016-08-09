import React from 'react';

const MockedComponent = composedProps => props => {
  composedProps.props = props;
  return (<i></i>)
};

export default MockedComponent;
