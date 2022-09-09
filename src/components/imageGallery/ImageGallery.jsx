import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../imageGalleryItem';
import Button from '../button';
import Modal from '../modal/Modal';
import Loader from '../loader';
import s from './ImageGallery.module.css';

const ImageGallery = (props) => {
  const [imgQuery, setImgQuery] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '17103623-ab930b7d528134dd68b9da242';

  useEffect(() => {
    props.query &&
      fetch(`${BASE_URL}?q=${props.query}&page=${props.page || 1}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      }).then(images => {
        setImgQuery({
          ...imgQuery,
          ...images
        })
      })
      .catch((error) => {
        console.error(error.message);
        setImgQuery(null);
        setShowModal(false);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [props.query, props.page]);


  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const onHandleSelect = (selected) => {
    setSelected(selected);
    setShowModal(true);
  };

  return (
    <>
      <ul className={s.gallery}>
        {imgQuery?.hits.map(({ id, webformatURL, type, largeImageURL }) =>
          <ImageGalleryItem key={id} imgURL={webformatURL} lgImgURL={largeImageURL} alt={type}
                            onHandleSelect={onHandleSelect} />)}
      </ul>
      {loading && <Loader />}
      {imgQuery?.hits.length < imgQuery?.total && !loading && <Button onHandleClick={props.handleClick} />}
      {showModal && <Modal onClose={toggleModal} selected={selected} />}
    </>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;

