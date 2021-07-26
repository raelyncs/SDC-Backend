import React from 'react';

const Price = (props) => {
  const { sale, original } = props;

  const formatPrice = (priceNum) => `$${priceNum.toFixed(2)}`;

  let displayPrice = 0;

  if (sale || original) {
    if (sale) {
      displayPrice =
      (
        <div className="price-container related-price">
          <span className="sale-price">
            {formatPrice(Number(sale))}
          </span>
          <span className="orig-price">
            $
            {original}
          </span>
        </div>
      );
    } else {
      displayPrice =
      (
        <div className="price-container related-price">
          <span className="reg-price">{formatPrice(Number(original))}</span>
        </div>
      );
    }
  }

  return (
    displayPrice
  );
};

export default Price;
