import { expect } from 'chai';
import sinon from 'sinon';
import * as actions from '../../../src/actions/photos';
import * as api from "../../../src/api/photos";

describe('receivePhotos action creator', () => {
  it('should return an action with the correct property type and photos', () => {
    const photos = [{
        "albumId": 1,
        "id": 1,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "http://placehold.it/600/92c952",
        "thumbnailUrl": "http://placehold.it/150/30ac17",
    }];
    const action = actions.receivePhotos(photos);
    expect(action.type).to.equal(actions.RECEIVE_PHOTOS);
    expect(action.photos).to.be.deep.equal(photos);
  });
});

describe('getPhotos action creator', () => {
  it('should call fetchPhotos and receivePhotos if there is no error', () => {
    sinon.stub(actions, 'receivePhotos');
    sinon
      .stub(api, 'fetchPhotos')
      .returns(Promise.resolve({ json: ()=>[] }));

    actions.getPhotos().
      then(() => {
        sinon.assert.called(actions.receivePhotos);        
      })

    actions.receivePhotos.restore();
    api.fetchPhotos.restore();
  });

  it('should not call receivePhotos if there is an error',(done) => {
    sinon.stub(actions, 'receivePhotos');
    sinon
      .stub(api, 'fetchPhotos')
      .returns(Promise.reject('Fake error'));

    actions.getPhotos();

    expect(actions.receivePhotos.called).to.be.equal(false)

    actions.receivePhotos.restore();
    api.fetchPhotos.restore();
    done();
  });
});
