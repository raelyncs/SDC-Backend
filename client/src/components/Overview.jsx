import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductInfo from './overview_components/ProductInfo';
import PhotoGallery from './overview_components/PhotoGallery';

const Overview = (props) => {
  const {
    currentItem,
    rating,
    reviewsCount,
    cart,
    addToCart,
    appStyles,
    defaultStyle,
  } = props;

  const [currentStyle, setCurrentStyle] = useState(null);
  const [styles, setStyles] = useState([]);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    setStyles(appStyles);
    setCurrentStyle(defaultStyle);
  }, [currentItem, appStyles, defaultStyle]);

  useEffect(() => {
    if (currentStyle !== null) {
      shiftSelectedStyle();
      filterPrice();
    }
  }, [currentStyle]);

  const shiftSelectedStyle = () => {
    const copy = [...styles];
    const index = copy.findIndex((styleObj) => styleObj.style_id === currentStyle.style_id);
    copy.splice(index, 1);
    copy.unshift(currentStyle);
    setStyles(copy);
  };

  const filterPrice = () => {
    if (currentStyle.sale_price) {
      setPrice(Number(currentStyle.sale_price));
    } else {
      setPrice(Number(currentStyle.original_price));
    }
  };

  return (
    <Container fluid className="d-flex flex-column main-container">
      {currentStyle &&
        (
          <Row>
            <Col xs={12} lg={7} className="p-0">
              <PhotoGallery currentStyle={currentStyle} />
            </Col>
            <Col xs={12} sm={8} md={6} lg={4} className="ml-3">
              <ProductInfo
                currentProduct={currentItem}
                styles={styles}
                currentStyle={currentStyle}
                setCurrentStyle={setCurrentStyle}
                rating={rating}
                reviewsCount={reviewsCount}
                price={price}
                size={size}
                setSize={setSize}
                quantity={quantity}
                setQuantity={setQuantity}
                addToCart={addToCart}
              />
            </Col>
          </Row>
        )}
      <Row className="mt-4">
        <Col xs={6} lg={7} className="px-5">
          <p className="h4">
            {currentItem.slogan}
          </p>
          <p>
            {currentItem.description}
          </p>
        </Col>
        <Col className="border-left pl-4">
          {currentItem.features && currentItem.features.map((featureObj, index) => (
            <p key={index}>
              {`${featureObj.feature}: ${featureObj.value}`}
            </p>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Overview;
