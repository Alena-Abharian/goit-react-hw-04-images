import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ alt, imgURL, onHandleSelect, lgImgURL }) => {

  const onHandleClick = () => {
    onHandleSelect({ alt, lgImgURL });
  };

  return (
    <li className={s.galleryItem} onClick={onHandleClick}>
      <img className={s.galleryImage} src={imgURL} alt={alt} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  imgURL: PropTypes.string.isRequired,
  onHandleSelect: PropTypes.func.isRequired,
  lgImgURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
