import React from 'react';
import SearchResults from '../api/fetchSearchResults';

export function RenderSearchResults() {
  return (
    <div className='container'>
      <SearchResults />
    </div>
  );
}

export default RenderSearchResults;