import { expect } from 'chai';
import { DependencyInjector } from '../src/index';
import React from 'react';

describe('DependencyInjector', () => {
  it('should return a component new component', () => {
    const store = {};
    <DependencyInjector store={store}>
      <span>TODO finish test</span>
    </DependencyInjector>
  })
});
