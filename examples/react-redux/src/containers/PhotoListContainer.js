import React, { Component } from 'react';
import PhotoList from "../components/PhotoList";
import * as actions from '../actions/photos';
import { connect } from 'react-redux';
import es6promise from 'es6-promise';
import 'isomorphic-fetch';
import { Container } from 'redix';

es6promise.polyfill();

class PhotoListContainer extends Container {

  constructor(props) {
      super(props);
      // In order to remove the render method in the container we need to specify What 
      // presentational component we want to render by using this.setComponent 
      this.setComponent(PhotoList, { mapPropFuncsToThis: props });
      
  }
  componentDidMount() {
    /*
      Because we passed the parameter { mapPropFuncsToThis: props } when did this.setComponent, 
      this.props.fetchPhotos is set as this.fetchProps. By calling this.fetchPhotos 
      we can easly mock this function later in the tests;
    */
    this.fetchPhotos().
      catch(console.log)
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
