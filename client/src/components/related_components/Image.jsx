import React, { useState, useEffect } from 'react';

const Image = (props) => {
  const { photos, handleClick, item } = props;
  const [imgUrl, setImgUrl] = useState('no-photo.png');

  useEffect(() => {
    if (photos && (photos.length > 0)) {
      if (photos[0].thumbnail_url) {
        setImgUrl(photos[0].thumbnail_url);
      }
    }
  }, [photos]);

  let photoEl;
  if (!photos) {
    photoEl = null;
  } else {
    photoEl = (
      <div className="product-photo-wrapper">
        <input type="image" className="product-photo" src={imgUrl} alt="product default style" onClick={() => handleClick(item)} />
      </div>
    );
  }

  return photoEl;
};

export default Image;
