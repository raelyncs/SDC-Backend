import React from 'react';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const DefaultView = (props) => {
  const {
    currentStyle,
    setMainIndex,
    setMainSwiper,
    thumbsSwiper,
    setThumbsSwiper,
    setShowModal,
  } = props;

  SwiperCore.use([Navigation, Thumbs]);

  const handleImgClick = (photoUrl) => {
    if (photoUrl) {
      setShowModal(true);
    }
  };

  return (
    <div className="gallery-overlay">
      <div className="thumb-swiper">
        <button type="button" className="arrow-btn up-btn">
          <i className="fas fa-chevron-up" />
        </button>
        <Swiper
          spaceBetween={15}
          slidesPerView={7}
          direction={'vertical'}
          onSwiper={setThumbsSwiper}
          navigation={{
            nextEl: '.down-btn',
            prevEl: '.up-btn',
          }}
          observer
          observeParents
        >
          {currentStyle.photos.map((photoObj, index) => (
            <SwiperSlide key={index} className="thumbnail-slide">
              <img className="thumbnail-pic" src={photoObj.thumbnail_url || 'no-photo.png'} alt={`Slide ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button type="button" className="arrow-btn down-btn">
          <i className="fas fa-chevron-down" />
        </button>
      </div>

      {thumbsSwiper && (
        <Swiper
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChange={(swiper) => setMainIndex(swiper.activeIndex)}
          onSwiper={setMainSwiper}
          className="info-swiper"
          navigation
        >
          {currentStyle.photos.map((photoObj, index) => (
            <SwiperSlide key={index} className={photoObj.url ? '' : 'slider-no-img'}>
              <button type="button" className={photoObj.url ? 'slide-btn' : 'slide-btn-disabled'} onClick={() => handleImgClick(photoObj.url)}>
                <img className={photoObj.url ? 'slider-pic' : ''} src={photoObj.url || 'no-photo.png'} alt={`Slide ${index}`} />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default DefaultView;
