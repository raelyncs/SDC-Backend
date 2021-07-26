import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/components/navigation/navigation.min.css';
import RelatedItemEntry from './RelatedItemEntry';

SwiperCore.use([Navigation]);

const RelatedItemsComp = (props) => {
  const {
    selectedItem,
    selectedRating,
    selectedDefault,
    handleClick,
    getRating,
    getDefault,
  } = props;

  const [relatedItems, setRelatedItems] = useState([]);

  const getRelatedItems = (arr) => {
    const items = [];
    arr.map((item) => (
      axios.get(`/api/products/${item}`)
        .then((results) => {
          items.push(results.data);
        })
        .then(() => {
          if (items.length === arr.length) {
            setRelatedItems([...items]);
          }
        })
        .catch((err) => {
          console.log('err in getRelatedItems', err);
        })
    ));
  };

  const getRelatedIds = (id) => {
    // if (Object.keys(selectedItem).length > 0) {
    axios.get(`/api/related/${id}`)
      .then((results) => {
        const uniq = [...new Set(results.data)];
        getRelatedItems(uniq);
      })
      .catch((err) => {
        console.log('error in getRelatedIds', err);
      });
    // }
  };

  useEffect(() => {
    getRelatedIds(selectedItem.id);
  }, [selectedItem]);

  return (
    <Swiper
      slidesPerView={3.5}
      spaceBetween={25}
      navigation
      className="related-outfit-swiper"
    >
      {relatedItems.map((item, i) => (
        <SwiperSlide key={i}>
          <RelatedItemEntry
            relatedItem={item}
            selectedRating={selectedRating}
            selectedItem={selectedItem}
            selectedDefault={selectedDefault}
            handleClick={handleClick}
            getRating={getRating}
            getDefault={getDefault}
            key={item.id}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RelatedItemsComp;
