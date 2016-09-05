import React, { Component } from 'react';
import { createStore , applyMiddleware } from 'redux';
import reducers from '../reducers/';
import promise from 'redux-promise';

const configureStore = () => {
  const middlewares = [promise];

  return createStore(
    reducers,
    applyMiddleware(...middlewares)
  )
}
export default configureStore
