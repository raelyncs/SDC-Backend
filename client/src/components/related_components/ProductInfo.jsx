import React from 'react';

const ProductInfo = (props) => {
  const {
    category,
    mainName,
    styleName,
  } = props;

  return (
    <div className="product-info-wrapper">
      <div className="product-info-category">{category}</div>
      <div className="product-info-name">
        <div className="product-name-main">{mainName}</div>
        <div className="product-name-style">{styleName}</div>
      </div>
    </div>
  );
};

export default ProductInfo;
