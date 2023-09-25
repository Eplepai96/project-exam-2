import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchApiData, VENUE_URL } from './api';

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
      <h1>Venues in {city}</h1>
      <p className='fw-bold text-primary'>{country}</p>
      <div>
        {venues.map((venue) => (
          <div key={venue.id} className='mt-3'>
            <h2>{venue.name}</h2>
            <Link to={`/venue/${continent}/${country}/${city}/${venue.id}`}>
              <button className='btn btn-secondary'>View Venue</button>
            </Link>
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
