import React, { Component } from 'react';
import { createStore , applyMiddleware } from 'redux';
import reducers from '../reducers/';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

const configureStore = () => {
  const middlewares = [promise, createLogger()];

  return createStore(
    reducers,
    applyMiddleware(...middlewares)
  )
}
export default configureStore
