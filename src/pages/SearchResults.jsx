import React from 'react';
import SearchResults from '../api/fetchSearchResults';

export function RenderSearchResults() {
  return (
    <div className='container'>
      <h1>Search results</h1>
      <SearchResults />
    </div>
  );
}

export default RenderSearchResults;