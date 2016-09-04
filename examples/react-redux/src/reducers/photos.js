import { RECEIVE_PHOTOS } from '../actions/photos';
import * as initialState from './initialState';

const photos = (state = initialState.photos, action) => {
  switch (action.type) {
    case RECEIVE_PHOTOS:
      return [...state, ...action.photos]
    default:
      return state
  }
}

export default photos
