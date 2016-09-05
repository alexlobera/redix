import React from 'react';
import { hookProps, DI } from 'redix';
import { expect } from 'chai';
import sinon from 'sinon';
import TestUtils from "react-addons-test-utils";
import { mount } from 'enzyme';
import configureStore from '../../../src/store/configStore.test';
import PhotoListContainer from '../../../src/containers/PhotoListContainer';
import { RECEIVE_PHOTOS } from '../../../src/actions/photos';

describe('PhotoList container using TestUtils and DI', () => {
    it(`should fetch photos and pass them down to the child component`, () => {

      const test = {};
      const FakePhotoList = hookProps(test);
      const photos = [{
          "albumId": 1,
          "id": 1,
          "title": "accusamus beatae ad facilis cum similique qui sunt",
          "url": "http://placehold.it/600/92c952",
          "thumbnailUrl": "http://placehold.it/150/30ac17",
      }];
      const actions = {
        RECEIVE_PHOTOS: sinon.spy(() => { return Promise.resolve({ type: '' }) }),
      };
      const store = configureStore();
      sinon.stub(store, 'getState').returns({ photos });

      TestUtils.renderIntoDocument(
        <DI store={store} actions={actions}>
          <PhotoListContainer
            component={FakePhotoList}
          />
        </DI>
      );

      expect(actions.RECEIVE_PHOTOS.called).to.be.true;
      expect(test.props.photos).to.be.deep.equal(photos);
      store.getState.restore();
    })
})
/*
describe('PhotoList container using ezyme mount and enzyme context parameter', () => {
    it(`should fetch photos and pass them down to the child component`, () => {

      const test = {};
      const FakePhotoList = hookProps(test);
      const actions = {
        RECEIVE_PHOTOS: sinon.spy(() => Promise.resolve()),
      };
      const photos = [{
          "albumId": 1,
          "id": 1,
          "title": "accusamus beatae ad facilis cum similique qui sunt",
          "url": "http://placehold.it/600/92c952",
          "thumbnailUrl": "http://placehold.it/150/30ac17",
      }];
      const store = configureStore();
      sinon.stub(store, 'getState').returns({ photos });

      mount(
        <PhotoListContainer
          component={FakePhotoList}
        />,
        { context: { store, actions }}
      );

      expect(actions.RECEIVE_PHOTOS.called).to.be.true;
      expect(test.props.photos).to.be.deep.equal(photos);
      store.getState.restore();
    })
})
*/
