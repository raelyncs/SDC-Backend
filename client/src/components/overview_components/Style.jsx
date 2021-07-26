import React from 'react';

const Style = (props) => {
  const {
    style,
    currentStyle,
    setCurrentStyle,
  } = props;

  const checkmark = <i className="fas fa-check" />;

  let thumbnail;
  if (style.photos[0].thumbnail_url === null) {
    thumbnail = <img className="thumbnail-none" src={'no-photo.png'} alt={style.name} />;
  } else {
    thumbnail = <img className="thumbnail-img" src={style.photos[0].thumbnail_url} alt={style.name} />;
  }

  const changeStyle = () => {
    if (style.style_id !== currentStyle.style_id) {
      setCurrentStyle(style);
    }
  };

  return (
    <button type="button" className="style-card" onClick={changeStyle}>
      <div className="style-thumbnail">
        {thumbnail}
      </div>
      {style.style_id === currentStyle.style_id && checkmark}
    </button>
  );
};

export default Style;
