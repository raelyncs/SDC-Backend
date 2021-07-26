/* eslint-disable camelcase */
import React from 'react';
import Rating from 'react-rating';
import axios from 'axios';
import Photos from './Photos';

const ReviewList = (props) => {
  const { review } = props;
  const {
    response,
    date,
    review_id,
    rating,
    summary,
    body,
    recommend,
    reviewer_name,
    helpfulness,
    photos,
  } = review;

  const showResponse = () => {
    if (response !== null && response !== '') {
      return (
        <div className="reviewListEntry-response">
          {`Response from seller: ${response}`}
        </div>
      );
    }
    return null;
  };
  const formatDate = () => {
    const entireDate = new Date(date).toString();
    return (
      `${entireDate.slice(4, 10)},${entireDate.slice(10, 16)}`
    );
  };
  const showRecommendation =
    (recommend ? (
      <div>
        ✓ I recommend this product!
      </div>
    ) : null);
  const addHelpful = () => {
    axios.put(`/api/reviews2/${review_id}/helpful`)
      .then(() => {
        props.getCountReviews();
      })
      .catch((err) => {
        console.log('addHelpful: ', err);
      });
    // }
  };
  const reportReview = () => {
    axios.put(`/api/reviews2/${review_id}/report`)
      .then(() => {
        props.getCountReviews();
      })
      .catch((err) => {
        console.log('reportReview', err);
      });
  };
  const showPhotos = () => {
    if (photos.length > 0) {
      return (
        photos.map((photo) => (
          <Photos photo={photo} key={photo.id} url={photo.url} />
        ))
      );
    }
    return null;
  };

  return (
    <div className="reviewListEntry">
      Review
      {review_id}
      <div className="reviewListEntry-header">
        <div>
          <Rating
            initialRating={rating}
            readonly
            emptySymbol="far fa-star"
            fullSymbol="fas fa-star"
          />
        </div>
        <div>
          {formatDate()}
        </div>
      </div>
      <div className="reviewListEntry-summary">{summary}</div>
      <div className="reviewListEntry-body">{body}</div>
      <br />
      {showRecommendation}
      <div className="reviewListEntry-recommendation">
        <div>
          {reviewer_name}
          {' '}
          {/* ✓Verfied Purchaser(need to check email?) */}
        </div>
      </div>
      {showResponse()}
      <div className="reviews-photo-container">
        {showPhotos()}
      </div>
      <div className="reviewListEntry-footer">
        Was this review helpful?
        <button className="buttonLink" type="button" onClick={() => { addHelpful(); }}> Yes</button>
        {`(${helpfulness})`}
        <button className="buttonLink" type="button" onClick={() => { reportReview(); }}>
          Report
        </button>
      </div>
    </div>
  );
};

export default ReviewList;
