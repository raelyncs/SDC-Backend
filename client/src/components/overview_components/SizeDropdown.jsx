import React, { Component } from 'react';
import Select from 'react-select';

export default class SizeDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      active: null,
      menuIsOpen: false,
    };

    this.selectRef = React.createRef();
  }

  componentDidMount() {
    this.findSizes();
  }

  componentDidUpdate(prevProps, prevState) {
    const { options, active } = this.state;
    const {
      currentStyle,
      size,
      setSize,
      showAlert,
      setShowCartBtn,
    } = this.props;

    if (currentStyle.style_id !== prevProps.currentStyle.style_id) {
      this.findSizes();
      setSize(null);
    }

    if ((showAlert !== prevProps.showAlert) && showAlert && !prevState.menuIsOpen) {
      this.openMenu();
    }

    if (active !== prevState.active) {
      if (active) {
        setShowCartBtn(true);
      } else {
        setShowCartBtn(false);
      }
    }
  }

  findSizes = () => {
    const { currentStyle } = this.props;
    const skusArr = Object.values(currentStyle.skus);
    const sizeSet = new Set();
    let stockFound = false;

    skusArr.forEach((skuObj) => {
      if (skuObj.quantity > 0) {
        sizeSet.add(skuObj.size);
        stockFound = true;
      }
    });

    let sizeArr = Array.from(sizeSet);
    sizeArr = sizeArr.map((availSize) => ({
      label: availSize,
      value: availSize,
    }));

    this.setState({
      options: sizeArr,
      active: stockFound,
    });
  }

  onChange = (option) => {
    this.props.setSize(option.value);
  }

  onInputChange = (options, { action }) => {
    if (action === 'menu-close') {
      this.selectRef.current.blur();
      this.setState({ menuIsOpen: false });
    }
  }

  openMenu = () => {
    this.selectRef.current.focus();
    this.setState({ menuIsOpen: true });
  }

  render() {
    const { options, active, menuIsOpen } = this.state;
    const { currentStyle, size } = this.props;

    const customStyles = {
      dropdownIndicator: (provided, state) => ({
        ...provided,
        transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
        transition: 'all .15s ease-in-out',
      }),
    };

    let selectComponent;

    if (active) {
      selectComponent = (
        <Select
          value={size ? { label: size, value: size } : null}
          placeholder={'SELECT SIZE'}
          ref={this.selectRef}
          options={options}
          onFocus={this.openMenu}
          onInputChange={this.onInputChange}
          menuIsOpen={menuIsOpen}
          onChange={this.onChange}
          isSearchable={false}
          styles={customStyles}
        />
      );
    } else {
      selectComponent = (
        <Select
          value={size ? { label: size, value: size } : null}
          placeholder={'OUT OF STOCK'}
          ref={this.selectRef}
          isDisabled
        />
      );
    }

    return (
      selectComponent
    );
  }
}
