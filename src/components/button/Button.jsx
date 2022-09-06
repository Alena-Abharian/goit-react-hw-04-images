import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onHandleClick }) => {
  return (
    <button className={s.button} onClick={onHandleClick}>Load more</button>
  );
};

Button.propTypes = {
  onHandleClick: PropTypes.func.isRequired,
};

export default Button;
