import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import YourOutfitEntry from './YourOutfitEntry';

SwiperCore.use([Navigation]);

const YourOutfitComp = (props) => {
  const {
    selectedItem,
    selectedRating,
    selectedDefault,
  } = props;

  const [yourOutfit, setYourOutfit] = useState(
    JSON.parse(localStorage.getItem('yourOutfitInLocal')) || [],
  );

  const [outfitIds, setOutfitIds] = useState([]);

  useEffect(() => {
    localStorage.setItem('yourOutfitInLocal', JSON.stringify(yourOutfit));
  }, [yourOutfit]);

  const handleAdd = () => {
    if (!outfitIds.includes(selectedItem.id)) {
      setOutfitIds([...outfitIds, selectedItem.id]);
      selectedItem.rating = selectedRating;
      selectedItem.photos = selectedDefault.photos;
      selectedItem.styleName = selectedDefault.name;
      selectedItem.salePrice = selectedDefault.sale_price;
      selectedItem.origPrice = selectedDefault.original_price;
      setYourOutfit([...yourOutfit, selectedItem]);
    }
  };

  const handleRemove = (id) => {
    setOutfitIds(outfitIds.filter((outfitId) => outfitId !== id));
    setYourOutfit(yourOutfit.filter((outfitItem) => outfitItem.id !== id));
  };

  return (
    <Swiper
      slidesPerView={3.5}
      spaceBetween={25}
      navigation
      className="related-outfit-swiper"
    >
      <SwiperSlide>
        <button type="button" onClick={handleAdd} className="product-card" id="add-outfit">
          <i className="fas fa-plus" />
          <div className="add-label">Add Selected Item to Your Outfit</div>
        </button>
      </SwiperSlide>
      {yourOutfit.map((item, i) => (
        <SwiperSlide key={i}>
          <YourOutfitEntry
            item={item}
            handleRemove={handleRemove}
            key={item.id}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default YourOutfitComp;
