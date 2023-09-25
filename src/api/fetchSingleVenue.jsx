
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApiData } from '../api/index';
import { VENUE_URL } from '../api/index';

function SingleVenue() {
  const { id } = useParams();
  const [venueData, setVenueData] = useState(null);

  console.log(id)
  useEffect(() => {
    async function fetchVenueData() {
      try {
        const response = await fetchApiData(`${VENUE_URL}/${id}`);
        console.log('API Response:', response);
        const data = await response.json();
        setVenueData(data);
      } catch (error) {
        console.error('Error fetching venue data:', error);
      }
    }
  
    fetchVenueData();
  }, [id]);

  if (!venueData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='row'>
      <h1>{venueData.name}</h1>
      <p className='fw-bold text-primary'>{venueData.location.city}</p>
      <div className='image-container venue-image'>
        <img 
        src={venueData.media}
        alt={venueData.name}
        className='mh-100'/>
      </div>
      <p className='fw-bold'>Price per night: {venueData.price},-</p>
      <h2 className='mt-3'>About this venue</h2>
      <p>{venueData.description}</p>
      <Link to={`/book/${venueData.name}/${venueData.location.continent}/${venueData.location.country}/${venueData.location.city}/${venueData.id}`}>
        <button className='btn btn-secondary'>Book venue</button>
      </Link>
    </div>
  );
}

export default SingleVenue;
