import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Routes from './config/Routes';
import reducers from './reducers/';
import configureStore from './store/configStore';

const store = configureStore()

const Root = () => (
  <Provider store={store}>
    <Router history={ hashHistory }>
       {Routes}
    </Router>
  </Provider>
)

export default Root