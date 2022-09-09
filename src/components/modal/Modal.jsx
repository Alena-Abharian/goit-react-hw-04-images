import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = (props) => {

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        props.onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      props.onClose();
    }
  };

  const { selected: { lgImgURL, alt } } = props;
  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={lgImgURL} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
};

export default Modal;

