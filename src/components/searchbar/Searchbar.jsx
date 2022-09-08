import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

const Searchbar = (props) => {
  const [query, setQuery] = useState('');

  const handleNameChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    // query.trim() === ''
    if (!query.trim()) {
      return;
    }
    props.onSubmitQuery(query);
    setQuery('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type='button' className={s.button}>
          <span className={s.button_label}>Search</span>
        </button>

        <input
          className={s.input}
          type='text'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmitQuery: PropTypes.func.isRequired,
};

export default Searchbar;
