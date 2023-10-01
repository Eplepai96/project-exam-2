import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchApiData, VENUE_URL } from './api';
import { NavigateBack } from '../components';

const Venues = () => {
  const { continent, country, city } = useParams();
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchApiData(VENUE_URL);
        const data = await response.json();

        const filteredVenues = data.filter((venue) => {
          return (
            venue.location.continent === continent &&
            venue.location.country === country &&
            venue.location.city === city
          );
        });

        setVenues(filteredVenues);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    }

    fetchData();
  }, [continent, country, city]);

  return (
    <div className='row'>
      <NavigateBack />
      <h1>Venues in {city}</h1>
      <p className='fw-bold text-primary'>{country}</p>
      <div className='d-flex flex-wrap'>
        {venues.map((venue) => (
          <div key={venue.id} className='user-venue booking-item rounded shadow-lg m-2'>
            <div className='d-flex flex-column'>
              <div className='image-container'>
              <img src={venue.media} alt={venue.name} />
              </div>
              
              <div className='d-flex justify-content-between align-items-start p-2'>
                <div>
                  <h2>{venue.name}</h2>
                  <p>${venue.price} per night</p>
                </div>
                <Link to={`/venue/${continent}/${country}/${city}/${venue.id}`}>
                  <button className='btn btn-secondary'>View Venue</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to={`/cities/${continent}/${country}`}>
        <button className='btn btn-primary mt-3'>Back to {city}</button>
      </Link>
    </div>
  );
};

export default Venues;



