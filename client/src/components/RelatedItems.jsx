import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RelatedItemsComp from './related_components/RelatedItemsComp';
import YourOutfitComp from './related_components/YourOutfitComp';

const RelatedItems = (props) => {
  const {
    selectedItem,
    selectedRating,
    selectedDefault,
    handleClick,
    getRating,
    getDefault,
  } = props;

  return (
    <Container fluid className="d-flex flex-column main-container">
      <div className="related-outfit-wrapper">
        <div className="related-items-wrapper">
          <Row>
            <h3 className="related-items-title">Related Products</h3>
          </Row>
          <Row>
            <RelatedItemsComp
              selectedItem={selectedItem}
              selectedRating={selectedRating}
              selectedDefault={selectedDefault}
              handleClick={handleClick}
              getRating={getRating}
              getDefault={getDefault}
            />
          </Row>
        </div>
        <div className="your-outfit-wrapper">
          <Row>
            <h3 className="your-outfit-title">Your Outfit</h3>
          </Row>
          <Row>
            <YourOutfitComp
              selectedItem={selectedItem}
              selectedRating={selectedRating}
              selectedDefault={selectedDefault}
            />
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default RelatedItems;
