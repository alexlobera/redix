const MockedComponent = composedProps => props => {
  composedProps.props = props;
  return (<i></i>)
};
