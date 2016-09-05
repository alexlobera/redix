import React, { Component } from 'react';
import PhotoList from "../components/PhotoList";
import { RECEIVE_PHOTOS, fetchPhotos } from '../actions/photos';
// import { connect } from 'react-redux';
import connect from '../../node_modules/react-redux/lib/components/connect';

import { Container } from 'redix';

class PhotoListContainer extends Container {

  constructor(props) {
      super(props);
      // In order to remove the render method in the container we need to specify what
      // presentational component we want to render by using this.setComponent
      this.setComponent(PhotoList);

  }
  componentDidMount() {
    this.props.fetchPhotos()
     .catch(console.log)
  }
  /*
  The render method is not needed anymore because the redix Container will
  take care of the render method (heads-up you must setComponent and setProps
  in the constructor
  render() {
    return <PhotoList photos={this.props.photos}/>
  }
  */
}

PhotoListContainer.propTypes = {
  fetchPhotos: React.PropTypes.func.isRequired
}

export default connect(
  state => ({ photos: state.photos }),
  { fetchPhotos: RECEIVE_PHOTOS }
)(PhotoListContainer)
