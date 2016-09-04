import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Routes from './config/Routes';

const Root = () => (
  <Router history={ hashHistory }>
     {Routes}
  </Router>
)

export default Root
