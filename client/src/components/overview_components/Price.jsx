import React from 'react';

const Price = (props) => {
  const { price, currentStyle } = props;

  const formatPrice = (priceNum) => `$${priceNum.toFixed(2)}`;

  let displayPrice;

  if (currentStyle.sale_price) {
    displayPrice =
    (
      <div className="prices-container category-text">
        <span className="sale-price">
          {formatPrice(price)}
        </span>
        <span className="orig-price">
          $
          {currentStyle.original_price}
        </span>
      </div>
    );
  } else {
    displayPrice =
    (
      <div className="prices-container category-text">
        <span className="reg-price">{formatPrice(price)}</span>
      </div>
    );
  }

  return (
    displayPrice
  );
};

export default Price;
