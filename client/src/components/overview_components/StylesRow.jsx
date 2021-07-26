import React from 'react';
import Style from './Style';

const StylesRow = (props) => {
  const {
    row,
    currentStyle,
    setCurrentStyle,
  } = props;

  return (
    <div className="styles-row">
      {row.map((style) => (
        <Style
          style={style}
          currentStyle={currentStyle}
          setCurrentStyle={setCurrentStyle}
          key={style.style_id}
        />
      ))}
    </div>
  );
};

export default StylesRow;
