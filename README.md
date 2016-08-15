# redix

React Dependency Injection for containers and components

## Why I should use it?

- It makes unit testing your container components easier by facilitating <a href="http://www.martinfowler.com/bliki/TestDouble.html">test doubles</a>
- It enforces good design patterns <a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.duo8qfj2v" target="_blank">container components for the logic and presentational components for the rendering</a>
- It makes the unit tests of your containers run faster because besides "mocking" the container's dependencies, it doesn't render the container's child components (and children of the children) even if you mount it.

## How to install

`npm install redix --save`

## How to use it

1. Your container components should extend Redix Container instead of React Component:

```
import { Container } from 'redix';

class PhotoListContainer extends Container {
```

2 . The constructor of your container should call:
	a. super(props). You must pass props in the super() call since props are used in the parent container's constructor.
	b. this.setComponent(PhotoList); Specify the presentational component we want to render.
	c. this.setProps({ ... }). Set the props we want to pass down to the presentational component

```
class PhotoListContainer extends Container {
  constructor(props) {
      super(props);
      this.setComponent(PhotoList);
      this.setProps({
        photos: props.photos
      })
  }
```

3 . By extending the Redix container, props that are functions become functions of the container. In other words instead of this.props.fetchPhotos you can do this.fetchPhotos. You need to use the this.fetchPhotos if you want to easly mock that function. Why? props are read only, and many functions are injected by third modules that make it very hard to mock, like actions set by the Redux connect mapDispatchToProps.

```
class PhotoListContainer extends Container

 // constructor ...

componentDidMount() {
    this.fetchPhotos(); // instead of this.props.fetchPhotos
  }
}

export default connect(
  (state) => ({ photos: state.photos }),
  { fetchPhotos: actions.getPhotos }
)(PhotoListContainer)

```
4 . Write a test for your container

```
import React from 'react';
import { createStore } from 'redux';
import { hookProps, DependencyInjector as DI } from 'redix';
import { expect } from 'chai';
import { mount } from 'enzyme';
import PhotoListContainer from '../../../src/containers/PhotoListContainer';
import sinon from 'sinon';
import TestUtils from "react-addons-test-utils";

describe('PhotoList container', () => {
    it(`should fetch photos and pass them down to the child component`, () => {

		const test = {};
		const FakePhotoList = hookProps(test);
		const injectedFunctions = {
		fetchPhotos: sinon.spy(() => (Promise.resolve())),
		};
		const photos = [{
		  "albumId": 1,
		  "id": 1,
		  "title": "accusamus beatae ad facilis cum similique qui sunt",
		  "url": "http://placehold.it/600/92c952",
		  "thumbnailUrl": "http://placehold.it/150/30ac17",
		}];
		const store = createStore(()=>{});
		sinon.stub(store, 'getState').returns({ photos });
		
		//Example using Enzyme
		const container = mount(
		<PhotoListContainer
		  functions={injectedFunctions}
		  component={FakePhotoList}
		/>,
		{ context: { store: store }}
		);
		
		//Example using TestUtils
		TestUtils.renderIntoDocument(
		<DI store={store}>
		  <PhotoListContainer
		    functions={injectedFunctions}
		    component={FakePhotoList}
		  />
		</DI>
		);
		
		//assertions
		expect(injectedFunctions.fetchPhotos.called).to.be.true;
		expect(test.props.photos).to.be.deep.equal(photos);
	})
})

```

## Examples:

https://github.com/alexlbr/react-bootcamp-2016-august/blob/master/test/unit/containers/PhotoListContainer.spec.js

https://github.com/alexlbr/react-bootcamp-2016-august/blob/master/src/containers/PhotoListContainer.js

`git clone git@github.com:alexlbr/react-bootcamp-2016-august.git`
`cd react-bootcamp-2016-august`
`npm i && npm test`


