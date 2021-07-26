import React, { useState, useEffect } from 'react';
import DefaultView from './DefaultView';
import ExpandedView from './ExpandedView';

const PhotoGallery = (props) => {
  const { currentStyle } = props;

  const [showModal, setShowModal] = useState(false);
  const [mainIndex, setMainIndex] = useState(0);
  const [mainSwiper, setMainSwiper] = useState();
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [expandedSwiper, setExpandedSwiper] = useState();

  const slideTo = () => {
    mainSwiper.slideTo(mainIndex);
  };

  useEffect(() => {
    if (mainSwiper) {
      slideTo();
    }
  }, [currentStyle]);

  return (
    <>
      <DefaultView
        currentStyle={currentStyle}
        setMainIndex={setMainIndex}
        setMainSwiper={setMainSwiper}
        thumbsSwiper={thumbsSwiper}
        setThumbsSwiper={setThumbsSwiper}
        setShowModal={setShowModal}
      />
      <ExpandedView
        currentStyle={currentStyle}
        setExpandedSwiper={setExpandedSwiper}
        showModal={showModal}
        setShowModal={setShowModal}
        mainIndex={mainIndex}
        mainSwiper={mainSwiper}
      />
    </>
  );
};

export default PhotoGallery;
