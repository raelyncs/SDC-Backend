import React, { useState, useEffect } from 'react';
import Rating from 'react-rating';
import Image from './Image';
import Price from './Price';
import ProductInfo from './ProductInfo';
import CompareModal from './CompareModal';

const RelatedItemEntry = (props) => {
  const {
    relatedItem,
    selectedRating,
    selectedItem,
    selectedDefault,
    handleClick,
    getRating,
    getDefault,
  } = props;

  const [defaultStyle, setDefaultStyle] = useState({});
  const [rating, setRating] = useState(0);
  const [showCompModal, setShowCompModal] = useState(false);
  const itemId = relatedItem.id;

  useEffect(() => {
    getDefault(itemId, ((results) => {
      setDefaultStyle(results);
    }));
    getRating(itemId, ((results) => {
      setRating(results);
    }));
  }, [relatedItem]);

  return (
    <div className="product-card">
      <CompareModal
        show={showCompModal}
        onHide={() => setShowCompModal(false)}
        selectedItem={selectedItem}
        selectedDefault={selectedDefault}
        selectedRating={selectedRating}
        relatedItem={relatedItem}
        relatedRating={rating}
      />
      <Image
        photos={defaultStyle.photos}
        item={relatedItem}
        handleClick={handleClick}
      />
      <ProductInfo
        category={relatedItem.category}
        mainName={relatedItem.name}
        styleName={defaultStyle.name}
      />
      <Price
        sale={defaultStyle.sale_price}
        original={defaultStyle.original_price}
      />
      <Rating
        initialRating={rating}
        readonly
        emptySymbol="far fa-star"
        fullSymbol="fas fa-star"
        className="rating"
      />
      <button className="compare-button" type="button" onClick={() => setShowCompModal(true)} label="compare"><i className="far fa-star" /></button>
    </div>
  );
};

export default RelatedItemEntry;
