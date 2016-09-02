import { expect } from 'chai';
import { DI } from '../src/index';
import React from 'react';
import TestUtils from "react-addons-test-utils";

describe('Dependency Injector', () => {
  it('should make context available in child components', () => {
    const store = { test: 'hello' };
    const hookContext = {};
    const SomeComponent = (props, context) => {
        props.hookContext.store = context.store;
        return <i></i>;
    }

    SomeComponent.contextTypes = {
      store: React.PropTypes.object
    }

    TestUtils.renderIntoDocument(
      <DI store={store}>
        <SomeComponent hookContext={hookContext}/>
      </DI>
    )

    expect(hookContext.store).to.be.deep.equal(store);
  })
});
