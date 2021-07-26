import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const QuantityDropdown = (props) => {
  const {
    currentStyle,
    size,
    quantity,
    setQuantity,
  } = props;

  const [limitedQuantity, setLimitedQuantity] = useState(null);

  useEffect(() => {
    if (size) {
      findQuantity();
      setQuantity(1);
    } else {
      // when currentStyle changes, size gets set to null in SizeDropdown.jsx
      // when size is null, we want quantity to be null too
      setQuantity(null);
      setLimitedQuantity(null);
    }
  }, [size]);

  const findQuantity = () => {
    const skusArr = Object.values(currentStyle.skus);
    let count = 0;

    skusArr.forEach((skuObj) => {
      if (skuObj.size === size) {
        count += skuObj.quantity;
      }
    });

    if (count > 15) {
      setLimitedQuantity(15);
    } else {
      setLimitedQuantity(count);
    }
  };

  const onChange = (option) => {
    if (quantity !== option.value) {
      setQuantity(option.value);
    }
  };

  let dropdown;

  const customStyles = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
      transition: 'all .15s ease-in-out',
    }),
  };

  if (limitedQuantity) {
    dropdown = (
      <Select
        value={quantity ? { label: quantity, value: quantity } : null}
        options={
          [...Array(limitedQuantity)]
            .map(
              (el, index) => ({ label: index + 1, value: index + 1 }),
            )
        }
        onChange={onChange}
        isSearchable={false}
        styles={customStyles}
      />
    );
  } else {
    dropdown = (
      <Select
        value={quantity ? { label: quantity, value: quantity } : null}
        placeholder={'-'}
        isDisabled
      />
    );
  }

  return (
    dropdown
  );
};

export default QuantityDropdown;
