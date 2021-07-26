import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Reviews from './Reviews';
import Price from './Price';
import StyleSelector from './StyleSelector';
import SizeDropdown from './SizeDropdown';
import QuantityDropdown from './QuantityDropdown';
import ShareButtons from './ShareButtons';

const ProductInfo = (props) => {
  const {
    currentProduct,
    styles,
    currentStyle,
    setCurrentStyle,
    rating,
    reviewsCount,
    price,
    size,
    setSize,
    quantity,
    setQuantity,
    addToCart,
  } = props;

  const [showAlert, setShowAlert] = useState(false);

  const [showCartBtn, setShowCartBtn] = useState(true);

  const handleCartClick = () => {
    if (!size) {
      setShowAlert(true);
    } else {
      addToCart({
        style: currentStyle,
        size,
        quantity,
      });

      setSize(null);
      setQuantity(null);
    }
  };

  useEffect(() => {
    setShowAlert(false);
    setSize(null);
    setQuantity(null);
  }, [currentStyle]);

  useEffect(() => {
    if (size) {
      setShowAlert(false);
    }
  }, [size]);

  return (
    <div className="product-info">
      <Row className="my-1">
        <Col>
          <Reviews rating={rating} reviewsCount={reviewsCount} />
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="category-text">{currentProduct.category.toUpperCase()}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="product-name">{currentProduct.name}</span>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <Price price={price} currentStyle={currentStyle} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <StyleSelector
            styles={styles}
            currentStyle={currentStyle}
            setCurrentStyle={setCurrentStyle}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={7}>
          <Alert variant="danger" show={showAlert} className="py-1 mb-1 text-center">
            <span className="alert-text">Please select size</span>
          </Alert>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={7}>
          <SizeDropdown
            currentStyle={currentStyle}
            size={size}
            setSize={setSize}
            showAlert={showAlert}
            setShowCartBtn={setShowCartBtn}
          />
        </Col>
        <Col>
          <QuantityDropdown
            currentStyle={currentStyle}
            size={size}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </Col>
      </Row>
      {
        showCartBtn &&
        (
          <Row className="mb-3">
            <Col>
              <Button className="w-100" onClick={handleCartClick}>ADD TO CART</Button>
            </Col>
          </Row>
        )
      }
      <ShareButtons currentProduct={currentProduct} currentStyle={currentStyle} />
    </div>
  );
};

export default ProductInfo;
