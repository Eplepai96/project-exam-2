import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchApiData } from './api';
import { VENUE_URL } from './api';

import africaImage from '../images/continents/Africa.jpeg'
import asiaImage from '../images/continents/Asia.jpeg';
import europeImage from '../images/continents/Europe.jpeg';
import americaImage from '../images/continents/America.jpeg';
import northamericaImage from '../images/continents/North-America.jpeg'
import australieImage from '../images/continents/Australia.jpeg'
import antarcticaImage from '../images/continents/Antarctica.jpeg'
import defaultImage from '../images/continents/DefaultImage.jpeg'

const Continents = () => {
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchApiData(VENUE_URL);
        const venues = await response.json();

        const uniqueContinents = [...new Set(venues.map((venue) => venue.location.continent))];
        setContinents(uniqueContinents);
      } catch (error) {
        console.error('Error fetching continents:', error);
      }
    }

    fetchData();
  }, []);

  const continentImageMap = {
    Africa: africaImage,
    Asia: asiaImage,
    Europe: europeImage,
    America: americaImage,
    "North America": northamericaImage,
    "Australia/Oceania": australieImage,
    Antarctica: antarcticaImage,
    
  };

  return (
    <div className='row'>
      <h2>Continents</h2>
      <div className='d-flex flex-wrap'>
        {continents.map((continent) => (
          <div key={continent} className='col-lg-4 col-sm-6 mb-3 p-2'>
            <h3>{continent}</h3>
              <div className="image-container">
                <img
                  src={continentImageMap[continent] || defaultImage}
                  alt={continent}
                  className='img-fluid'
                />
              </div>
            
            <Link to={`/countries/${continent}`}>
              <button className='btn btn-secondary mt-1'>View Countries</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Continents;

