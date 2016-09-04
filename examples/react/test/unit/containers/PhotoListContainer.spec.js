import React from 'react';
import { hookProps, DI } from 'redix';
import { expect } from 'chai';
import PhotoListContainer from '../../../src/containers/PhotoListContainer';
import sinon from 'sinon';
import TestUtils from "react-addons-test-utils";
import { mount } from 'enzyme';
import * as api from '../../../src/api/photos';

describe('PhotoList container using ezyme mount', () => {
    it(`should fetch photos and pass them down to the child component`, () => {

      const test = {};
      const FakePhotoList = hookProps(test);
      const photos = [];
      sinon.stub(api, 'fetchPhotos').returns(Promise.resolve(photos));

      mount(
        <PhotoListContainer
          component={FakePhotoList}
        />
      );

      expect(api.fetchPhotos.called).to.be.true;
      expect(test.props.photos).to.be.deep.equal(photos);
      api.fetchPhotos.restore();
    })
})

describe('PhotoList container using TestUtils and DI', () => {
    it(`should fetch photos and pass them down to the child component`, () => {

      const test = {};
      const FakePhotoList = hookProps(test);
      const photos = [];
      sinon.stub(api, 'fetchPhotos').returns(Promise.resolve(photos));

      TestUtils.renderIntoDocument(
        <PhotoListContainer
          component={FakePhotoList}
        />
      );

      expect(api.fetchPhotos.called).to.be.true;
      expect(test.props.photos).to.be.deep.equal(photos);
      api.fetchPhotos.restore();
    })
})
