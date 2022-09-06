import React, { Component } from 'react';
import Searchbar from './searchbar';
import ImageGallery from './imageGallery';

class App extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = (query) => {
    this.setState({ query });
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',

        }}
      >
        <Searchbar onSubmitQuery={this.handleFormSubmit} />
        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}

export default App;
