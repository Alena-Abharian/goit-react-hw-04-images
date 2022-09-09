import React, { useState } from 'react';
import Searchbar from './searchbar';
import ImageGallery from './imageGallery';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const onHandleClick = () => {
      setPage(prev => prev + 1);
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmitQuery={(search) => {
        setQuery(search)
        setPage(1)
      }}/>
      <ImageGallery query={query} handleClick={onHandleClick} page={page} />
    </div>
  );
};

export default App;
