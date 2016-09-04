import React from "react";
import { Link } from 'react-router';

const PhotoList = (props) => (
    <div>
      <h1>Hello photos <small>(corner cases example)</small></h1>
    	{ props.photos.map(photo => <img key={photo.id} src={photo.thumbnailUrl} />) }
    </div>
)

export default PhotoList;
