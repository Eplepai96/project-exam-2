import React from 'react';
import SearchComponent from '../components/searchInput';
import Continents from '../api/fetchContinents';

export function RenderHomepage() {
  return (
    <div className='container text-lg-center'>
      <h1>Book a venue today!</h1>
      <p>Whether it's business or leisure, we're here to help you find the perfect place to stay. Explore a variety of venues, from serene retreats to bustling cities. With Holidaze, your ideal experience is just a click away</p>
      <h2>Where do you want to go?</h2>
      <div><SearchComponent /></div>
      <Continents />
    </div>
  );
}

export default RenderHomepage;
