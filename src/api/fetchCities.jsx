
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApiData } from './api';
import { VENUE_URL } from './api';

const Cities = () => {
  const { continent, country } = useParams();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchApiData(VENUE_URL); 
        const venues = await response.json();

        const filteredCities = venues.filter((venue) => {
            return (
              venue.location.continent === continent &&
              venue.location.country === country
            );
          })
          .map((venue) => venue.location.city);

        const uniqueCities = [...new Set
        (filteredCities)];

        setCities(uniqueCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }

    fetchData();
  }, [continent, country]);

  return (
    <div className='row'>
      <h1>Cities in {country}</h1>
      <p className='fw-bold text-primary'>{continent}</p>
      <div className='d-flex flex-wrap'>
        {cities.map((city) => (
          <div key={city} className='mt-3'>
            <h2>{city}</h2>
            <Link to={`/venues/${continent}/${country}/${city}`}>
              <button className='btn btn-secondary'>View Venues</button>
            </Link>
          </div>
        ))}
      </div>
      <Link to={`/countries/${continent}`}>
        <button className='btn btn-primary mt-5'>Back to {continent}</button>
      </Link>
    </div>
  );
};

export default Cities;
