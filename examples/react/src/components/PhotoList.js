import React from "react";
import { Link } from 'react-router';

const PhotoList = (props) => (
    <div>
      <h1>Hello photos</h1>
    	{ props.photos.map(photo => <img key={photo.id} src={photo.thumbnailUrl} />) }
    </div>
)
// propTypes are a VERY GOOD PRACTICE: https://facebook.github.io/react/docs/reusable-components.html
PhotoList.propTypes = {
	photos: React.PropTypes.array
}

export default PhotoList;
