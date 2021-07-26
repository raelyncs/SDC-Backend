import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const SortBy = (props) => {
  const { totalReviews, setSortState } = props;
  // need to fix sorting when count is only 2
  return (
    <div className="sortBy-header">
      {totalReviews}
      {' '}
      reviews
      &nbsp;
      <DropdownButton className="dropdown-sortby-button" title="Sort by" variant="outline-dark" size="sm">
        <Dropdown.Item onClick={() => { setSortState('relevant'); }}>Most Relevant</Dropdown.Item>
        <Dropdown.Item onClick={() => { setSortState('newest'); }}>Most Recent</Dropdown.Item>
        <Dropdown.Item onClick={() => { setSortState('helpful'); }}>Most Helpful</Dropdown.Item>
      </DropdownButton>
    </div>
    // <span>
    //   {totalReviews}
    //   {' '}
    //   reviews, Sort by
    //   &nbsp;
    //   <select onChange={(e) => { setSortState(e.target.value); }}>
    //     <option value="relevant">Most Relevant</option>
    //     <option value="newest">Most Recent</option>
    //     <option value="helpful">Most Helpful</option>
    //   </select>
    // </span>
  );
};

export default SortBy;
