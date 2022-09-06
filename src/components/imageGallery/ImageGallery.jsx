import React, { Component } from 'react';
import ImageGalleryItem from '../imageGalleryItem';
import Button from '../button';
import Modal from '../modal/Modal';
import Loader from '../loader';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  state = {
    imgQuery: null,
    page: 1,
    showModal: false,
    selected: null,
    loading: false,
  };

  getImages(page) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '17103623-ab930b7d528134dd68b9da242';
    this.setState({ loading: true });
    return fetch(`${BASE_URL}?q=${this.props.query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .catch((error) => {
        console.error(error.message);
        this.setState({ imgQuery: null, showModal: false, page: 1, loading: false });
      });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.query !== this.props.query) {
      this.getImages(this.state.page)
        .then(imgQuery => {
          this.setState({ imgQuery, showModal: false, page: 1, loading: false });
        });
    }
  }

  handleClick = () => {
    this.getImages(this.state.page + 1)
      .then(imgQuery => {
        this.setState(prev => ({
          imgQuery: {
            ...imgQuery,
            hits: [...prev.imgQuery.hits, ...imgQuery.hits],
          },
          page: prev.page + 1,
          loading: false,
        }));
      });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onHandleSelect = (selected) => {
    this.setState({ selected, showModal: true });
  };

  render() {
    const { imgQuery, loading, showModal, selected } = this.state;

    return (
      <>
        <ul className={s.gallery}>
          {imgQuery?.hits.map(({ id, webformatURL, type, largeImageURL }) =>
            <ImageGalleryItem key={id} imgURL={webformatURL} lgImgURL={largeImageURL} alt={type}
                              onHandleSelect={this.onHandleSelect} />)}
        </ul>
        {loading && <Loader/>}
        {imgQuery && !loading && <Button onHandleClick={this.handleClick} />}
        {showModal && <Modal onClose={this.toggleModal} selected={selected} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
