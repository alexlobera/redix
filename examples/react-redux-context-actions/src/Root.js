import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Routes from './config/Routes';
import reducers from './reducers/';
import configureStore from './store/configStore';
import { actions } from './actions/photos';
import { DI } from 'redix';

const store = configureStore()

/**
  We could use DI component for the <Provider> as well:

  const Root = () => (
    <DI actions={actions} store={store}>
      <Router history={ hashHistory }>
         {Routes}
      </Router>
    </DI>
  )
*/

const Root = () => (
  <DI actions={actions}>
    <Provider store={store}>
      <Router history={ hashHistory }>
         {Routes}
      </Router>
    </Provider>
  </DI>
)

export default Root
