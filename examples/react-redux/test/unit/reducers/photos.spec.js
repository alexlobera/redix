import { expect } from 'chai';
import photos from '../../../src/reducers/photos';
import { RECEIVE_PHOTOS } from '../../../src/actions/photos';
import * as initialState from '../../../src/reducers/initialState';


describe('photos reducer function', () => {

  it('should return the same state if no action type matches in the reducer', () => {
    const action = {
      type: 'LOREM_IPSUM',
      photos:  [{
          "albumId": 1,
          "id": 1,
          "title": "accusamus beatae ad facilis cum similique qui sunt",
          "url": "http://placehold.it/600/92c952",
          "thumbnailUrl": "http://placehold.it/150/30ac17",
      }]
    };
    const state =  [{
          "albumId": 2,
          "id": 2,
          "title": "accusamus beatae ad facilis cum similique qui sunt",
          "url": "http://placehold.it/600/92c952",
          "thumbnailUrl": "http://placehold.it/150/30ac17",
      }];
    const stateAfter = photos(state, action);
    expect(stateAfter).to.be.equal(state);
  });

  it('should initialise the default state if no state is set', () => {
    const action = {
      type: 'LOREM_IPSUM',
      photos: []
    };
    const stateAfter = photos(undefined, action);
    expect(stateAfter).to.be.equal(initialState.photos);
  });

  it('should return the new state after matching the action type', () => {
  	const newPhotos = [{
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "http://placehold.it/600/92c952",
      "thumbnailUrl": "http://placehold.it/150/30ac17",
  	}];
    const state =  [{
          "albumId": 2,
          "id": 2,
          "title": "accusamus beatae ad facilis cum similique qui sunt",
          "url": "http://placehold.it/600/92c952",
          "thumbnailUrl": "http://placehold.it/150/30ac17",
      }];

    const action = {
      type: RECEIVE_PHOTOS,
      photos: newPhotos
    };
    const stateAfter = photos(state, action);
    expect(stateAfter).to.be.deep.equal([...state, ...newPhotos]);
  });

});
