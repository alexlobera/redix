import React, { Component } from 'react';
import PhotoList from "../components/PhotoList";
import * as actions from '../actions/photos';
import { connect } from 'react-redux';
import { Container } from 'redix';

class PhotoListContainer extends Container {

  constructor(props) {
      super(props);
      // In order to remove the render method in the container we need to specify what
      // presentational component we want to render by using this.setComponent
      this.setComponent(PhotoList, { mapPropFuncsToThis: props });
      // this.bindThis is a helper from the Redix Container
      // Instead of this.bindThis('fetchPhotos') you can also do:
      // this.fetchPhotos = this.fetchPhotos.bind(this)
      // If you want to bind many methods you can use an array of strings,
      // example: this.bindThis(['fetchPhotos', 'fetchUser', 'submitForm'])
      this.bindThis('fetchPhotos');

  }
  componentDidMount() {
    /*
      Because we passed the parameter { mapPropFuncsToThis: props } when we called this.setComponent,
      this.props.fetchPhotos is now also available as this.fetchProps. By calling this.fetchPhotos
      we can easily mock this function later in the tests;
    */
    this.fetchPhotos().
      catch(error => {
        // handle error
      })
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
  (state) => ({ photos: state.photos }),
  { fetchPhotos: actions.getPhotos }
)(PhotoListContainer)
