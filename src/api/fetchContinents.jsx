import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchApiData } from './api';
import { VENUE_URL } from './api';

import africaImage from '../images/continents/Africa.jpeg';
import asiaImage from '../images/continents/Asia.jpeg';
import europeImage from '../images/continents/Europe.jpeg';
import americaImage from '../images/continents/America.jpeg';
import defaultImage from '../images/continents/DefaultImage.jpeg';

const Continents = () => {
  const [continents, setContinents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [displayedContinents, setDisplayedContinents] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchApiData(VENUE_URL);
        const venuesData = await response.json();
        setVenues(venuesData);

        const uniqueContinents = [...new Set(venuesData.map((venue) => venue.location.continent))];
        setContinents(uniqueContinents);
      } catch (error) {
        console.error('Error fetching continents:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const orderedContinents = ['Europe', 'America', 'Asia'];
    const filteredContinents = orderedContinents.filter((continent) => continents.includes(continent));
    setDisplayedContinents(showAll ? continents : filteredContinents);
  }, [continents, showAll]);

  const continentImageMap = {
    Africa: africaImage,
    Asia: asiaImage,
    Europe: europeImage,
    America: americaImage,
  };

  const renderCountries = (continent) => {
    const continentVenues = venues.filter((venue) => venue.location.continent === continent);
    const uniqueCountries = [...new Set(continentVenues.map((venue) => venue.location.country))].slice(0, 5);
    return uniqueCountries.join(', ');
  };

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className='mt-4'>
      <h2 >Continents</h2>
      <div className='row'>
        {displayedContinents.map((continent) => (
          <div key={continent} className='col-lg-4 col-md-6 mb-4'>
            <div className='card border shadow-lg'>
            <div className='image-container'>
              <img
                src={continentImageMap[continent] || defaultImage}
                alt={continent}
                className='img-fluid continent-container'
              />
              </div>
              <div className='card-body'>
                <h5 className='card-title'>{continent}</h5>
                <p className='card-text text-grey'>{renderCountries(continent)}</p>
                <Link to={`/countries/${continent}`} className='btn btn-secondary'>
                  View Countries
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center mt-4'>
        <button className='btn btn-primary' onClick={handleToggleShowAll}>
          {showAll ? 'Show Less' : 'Show All'}
        </button>
      </div>
    </div>
  );
};

export default Continents;

