import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
} from 'react-share';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ShareButtons = (props) => {
  const { currentProduct, currentStyle } = props;

  return (
    <Row className="mt-auto">
      <Col className="d-flex justify-content-center">
        <FacebookShareButton
          quote={currentProduct.name}
          url={'facebook.com'}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </Col>
      <Col className="d-flex justify-content-center">
        <TwitterShareButton
          title={currentProduct.name}
          url={'twitter.com'}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </Col>
      <Col className="d-flex justify-content-center">
        <PinterestShareButton
          media={currentStyle.photos[0].url}
          url={'pinterest.com'}
          description={currentProduct.name}
        >
          <PinterestIcon size={32} round />
        </PinterestShareButton>
      </Col>
    </Row>
  );
};

export default ShareButtons;
