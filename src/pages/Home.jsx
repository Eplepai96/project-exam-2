import React from 'react';
import SearchComponent from '../components/searchInput';
import Continents from '../api/fetchContinents';

export function RenderHomepage() {
  return (
    <body className='container'>
      <div className='text-lg-center mt-2'>
      <h1>Book a venue today!</h1>
      <p className='m-auto'>Whether it's business or leisure, we're here to help you find the perfect place to stay. Explore a variety of venues, from serene retreats to bustling cities. With Holidaze, your ideal experience is just a click away!</p>
      <h2 className='mt-4'>Where do you want to go?</h2>
      </div>
      <div><SearchComponent /></div>
      <Continents />
    </body>
  );
}

export default RenderHomepage;
