import { expect } from 'chai';
import { hookProps } from '../src/index';
import { reduceProps, mapPropTypesToProps } from '../src/propUtils';
import React from 'react';

describe('hookProps', () => {
  it('should get the props that are injected into a component', () => {
    const FakeComponent = {};
    const props = { prop1: 1, prop2: 2 };
    const HookedComponent = hookProps(FakeComponent);

    HookedComponent(props);

    expect(FakeComponent.props).to.be.deep.equal(props);
  })

  it('should not get the context that is injected into a component', () => {
    const FakeComponent = {};
    const props = { prop1: 1, prop2: 2 };
    const context = { store: 'hello' };
    const HookedComponent = hookProps(FakeComponent);

    HookedComponent(props, context);

    expect(FakeComponent.context).not.to.be.deep.equal(context);
  })
});

describe('reduceProps', () => {
  it('should remove children from the props of the component', () => {
    const props = { prop1: 1, prop2: 2, children: {} };
    const expected = { prop1: 1, prop2: 2 };
    const reducedProps = reduceProps(props);

    expect(reducedProps).to.be.deep.equal(expected);
  })
});

describe('mapPropTypesToProps', () => {
  it('should return a JSON that maps every prop key to a function', () => {
    const props = { prop1: 1, children: {} };
    const expected = {};
    expected.prop1 = () => {};

    const mappedPropTypesToProps = mapPropTypesToProps(props);

    expect(Object.keys(mappedPropTypesToProps).length).to.be.deep.equal(1);
    expect(typeof mappedPropTypesToProps.prop1).to.be.equal('function');
  })
});
