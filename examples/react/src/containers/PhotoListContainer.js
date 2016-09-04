import React, { Component } from 'react';
import { Container } from 'redix';
import PhotoList from '../components/PhotoList';
import * as api from '../api/photos';

class PhotoListContainer extends Container {

  constructor(props) {
      super(props);
      this.state = { photos: [], page: -1};
      // In order to remove the render method in the container we need to specify What
      // presentational component we want to render by using this.setComponent
      // The addProps parameter enables explicit mapping of props.
      this.setComponent(PhotoList, {
        mapPropFuncsToThis: props,
        addProps: { photos: 'this.state.photos' }
      });
      // this.bindThis is a helper from the Redix Container
      // Instead of this.bindThis('fetchPhotos') you can also do:
      // this.fetchPhotos = this.fetchPhotos.bind(this)
      // If you want to bind many methods you can use an array of strings,
      // example: this.bindThis(['fetchPhotos', 'fetchUser', 'submitForm'])
      this.bindThis('fetchPhotos');

  }
  componentDidMount() {
    /*
      Because we passed the parameter { mapPropFuncsToThis: props } when did this.setComponent,
      this.props.fetchPhotos is set as this.fetchProps. By calling this.fetchPhotos
      we can easly mock this function later in the tests;
    */
    this.fetchPhotos();
  }

  fetchPhotos() {
    api.fetchPhotos()
      .then(photos => {
        const itemsPerPage = 20;
        this.setState({page: this.state.page + 1});
        this.setState({photos : photos.slice(this.state.page, itemsPerPage)});
      })
      .catch(console.log);
  }
  /*
  The render method is not needed anymore because the redix Container will
  take care of the render method (heads-up you must setComponent and setProps
  in the constructor
  render() {
    return <PhotoList photos={this.state.photos}/>
  }
  */
}

export default PhotoListContainer;
