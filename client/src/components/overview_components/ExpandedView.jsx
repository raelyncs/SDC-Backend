import React, { useState, useEffect } from 'react';
import SwiperCore, { Navigation, Pagination, Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Modal from 'react-bootstrap/Modal';

const ExpandedView = (props) => {
  const {
    currentStyle,
    setExpandedSwiper,
    showModal,
    setShowModal,
    mainIndex,
    mainSwiper,
  } = props;

  SwiperCore.use([Navigation, Pagination, Controller]);

  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!showModal) {
      setZoomed(false);
    }
  }, [showModal]);

  useEffect(() => {
    const paginationDOM = document.querySelector('.expanded-swiper .swiper-pagination');
    const leftNavBtn = document.querySelector('.expanded-swiper .swiper-button-prev');
    const rightNavBtn = document.querySelector('.expanded-swiper .swiper-button-next');

    if (zoomed) {
      paginationDOM.classList.add('swiper-pagination-hidden');
      leftNavBtn.classList.add('hide-arrows');
      rightNavBtn.classList.add('hide-arrows');
    }

    if (!zoomed && paginationDOM) {
      paginationDOM.classList.remove('swiper-pagination-hidden');
      leftNavBtn.classList.remove('hide-arrows');
      rightNavBtn.classList.remove('hide-arrows');
    }
  }, [zoomed]);

  const getCursorPos = (e, img) => {
    const a = img.getBoundingClientRect();
    let x = e.pageX - a.left;
    let y = e.pageY - a.top;

    x -= window.pageXOffset;
    y -= window.pageYOffset;

    return { x, y };
  };

  const moveLens = (e) => {
    e.preventDefault();

    const slideDiv = document.querySelector('.expanded-slide.swiper-slide-active');
    const img = slideDiv.querySelector('img');

    const pos = getCursorPos(e, img);
    const lens = document.querySelector('.img-zoom-lens');
    const cx = 2.5;
    const cy = 2.5;

    let x = pos.x - (lens.offsetWidth / 2);
    let y = pos.y - (lens.offsetHeight / 2);

    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }

    if (x < 0) {
      x = 0;
    }

    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }

    if (y < 0) {
      y = 0;
    }

    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;

    const lw = lens.offsetWidth;
    const lh = lens.offsetHeight;
    const zx = pos.x * cx - (0.5 * lw);
    const zy = pos.y * cy - (0.5 * lh);

    lens.style.backgroundPosition = `-${zx}px -${zy}px`;
  };

  const toggleZoom = (swiper, e) => {
    const activeSlideDOM = swiper.slides[swiper.activeIndex];
    const currentImg = activeSlideDOM.querySelector('img');
    const cx = 2.5;
    const cy = 2.5;

    if (e.target.className === 'expanded-img' && !zoomed) {
      const lens = document.createElement('div');
      lens.setAttribute('class', 'img-zoom-lens');
      currentImg.parentElement.insertBefore(lens, currentImg);
      lens.style.backgroundImage = `url("${currentImg.src}")`;
      lens.style.backgroundSize = `${currentImg.width * cx}px ${currentImg.height * cy}px`;
      moveLens(e);
      lens.addEventListener('mousemove', moveLens);
      currentImg.addEventListener('mousemove', moveLens);
      setZoomed(true);
    }

    if (e.target.className === 'img-zoom-lens' && zoomed) {
      const imgClone = currentImg.cloneNode(true);
      currentImg.parentNode.replaceChild(imgClone, currentImg);
      e.target.remove();
      setZoomed(false);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size={'lg'}
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{
            clickable: true,
          }}
          onSwiper={setExpandedSwiper}
          controller={{ control: mainSwiper }}
          initialSlide={mainIndex}
          className="expanded-swiper"
          onClick={toggleZoom}
          observer
          allowTouchMove={false}
        >
          {currentStyle.photos.map((photoObj, index) => (
            <SwiperSlide key={index} className="expanded-slide">
              <div className={`img-zoom-container ${zoomed ? 'zoomed-cursor' : 'crosshair'}`}>
                <img src={photoObj.url} className="expanded-img" alt={`Slide ${index}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal.Body>
    </Modal>
  );
};

export default ExpandedView;
