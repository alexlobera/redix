# Redix

React Dependency Injection for containers, components, and soon (hopefully) actions

## Why should I use this?

- It enforces good design patterns:
  - <a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.duo8qfj2v" target="_blank">Container components for the logic and presentational components for the rendering</a>
  - <a href="https://facebook.github.io/react/docs/reusable-components.html" target="_blank">Reusable Components</a>
- It makes unit testing your container components easier by facilitating <a href="http://www.martinfowler.com/bliki/TestDouble.html">test doubles</a>
- It makes the unit tests of your containers run faster because besides "mocking" the container's dependencies, it doesn't render the container's child components (and children of the children, and so on) even if you mount it.

## How to install

`npm install redix --save`

## How to use it

1 . Your container components should extend Redix Container instead of React Component:

```
import { Container } from 'redix';

class PhotosContainer extends Container {
```

2 . Your presentational component should specify all the properties it needs by setting its `propTypes` (well you should do it either you use Redix Container or not, propTypes are a good practice :). Example:

```
const Photos = (props) => <h1>He have {props.photos.length} photos</h1>
//The container will automatically pass the following props to the presentational component
Photos.propTypes = {
  photos: React.PropTypes.string
}
```

3 . The constructor of your container should call this.setComponent(Photos), passing the presentational component we want to render. Example:

```
class PhotosContainer extends Container {
  constructor(props) {
      super(props);
      this.setComponent(Photos, { mapPropFuncsToThis: props });
  }
```

By using the second parameter mapPropFuncsToThis when setting the component, props that are functions become functions of the container. In other words instead of `this.props.fetchPhotos` you can do `this.fetchPhotos`. You need to use the `this.fetchPhotos` approach if you want to easily mock that function. Why? props are read only, and many functions are injected by third modules that make it very hard to mock, like actions set by the Redux connect mapDispatchToProps. mapPropFuncsToThis is an easy workaround.

```
class PhotosContainer extends Container {
  constructor(props) {
     super(props);
     this.setComponent(Photos, { mapPropFuncsToThis: props });
     this.bindThis('fetchPhotos') // this.bindThis is a helper from the Redix Container
     // Instead of this.bindThis('fetchPhotos') you can also do:
     // this.fetchPhotos = this.fetchPhotos.bind(this)
     // To bind many methods at once pass an array of strings, example:
     // this.bindThis(['fetchPhotos', 'fetchUser', 'submitForm'])
   }

  componentDidMount() {
    // instead of this.props.fetchPhotos. This is because we set { mapPropFuncsToThis: props }
    this.fetchPhotos();
  }
}

export default connect(
  (state) => ({ photos: state.photos }),
  { fetchPhotos: actions.getPhotos }
)(PhotosContainer)
```
See the [react-redux example](https://github.com/alexlbr/redix/tree/master/examples/react-redux)

4 . No render method

Rendering the 'view' is not the concern of the container, that is the concern of the presentational component. Therefore the only thing you should write in the render method of the container is i) what component you want to render and ii) which props you want to pass down. And that is already done by the Redix Container class.

5 <a href="#5-example" name="5-example">.</a> Write a test for your container

```
import React from 'react';
import { createStore } from 'redux';
import { hookProps, DI } from 'redix';
import { expect } from 'chai';
import { mount } from 'enzyme';
import PhotosContainer from '../../../src/containers/PhotosContainer';
import sinon from 'sinon';
import TestUtils from "react-addons-test-utils";

describe('Photos container', () => {
    it(`should fetch photos and pass them down to the child component`, () => {

		const test = {};
		const FakePhotos = hookProps(test);
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
		  <PhotosContainer
			functions={injectedFunctions}
			component={FakePhotos}
		  />,
		  { context: { store: store }}
		);

		//Example using TestUtils and the generic Dependency Injector
		TestUtils.renderIntoDocument(
		<DI store={store}>
		  <PhotosContainer
		    functions={injectedFunctions}
		    component={FakePhotos}
		  />
		</DI>
		);

		//assertions
		expect(injectedFunctions.fetchPhotos.called).to.be.true;
		expect(test.props.photos).to.be.deep.equal(photos);
	})
})
```
See the [react-redux example](https://github.com/alexlbr/redix/tree/master/examples/react-redux)

## Examples

Check this folder [/examples](https://github.com/alexlbr/redix/tree/master/examples)

## Resources

* [Post (React Dependency Injection, write unit tests easily with Redix)](http://alexlobera.com/react-dependency-injection-write-unit-tests-easily-with-redix/)
* Ping @alex_lobera on Twitter
