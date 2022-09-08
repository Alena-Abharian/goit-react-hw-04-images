import React, { useState } from 'react';
import Searchbar from './searchbar';
import ImageGallery from './imageGallery';

const App = () => {
  const [query, setQuery] = useState('');

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmitQuery={setQuery} />
      <ImageGallery query={query} />
    </div>
  );
};

export default App;
