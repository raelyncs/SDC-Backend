import React from 'react';
import Rating from 'react-rating';

const Reviews = (props) => {
  const { rating, reviewsCount } = props;

  return (
    <div>
      <Rating
        initialRating={rating}
        readonly
        emptySymbol="far fa-star"
        fullSymbol="fas fa-star"
      />
      {reviewsCount > 0 &&
        (
        <a href="#ratingsReview-container" className="reviews-link">
          Read all
          {` ${reviewsCount} `}
          reviews
        </a>
        )}
    </div>
  );
};

export default Reviews;
