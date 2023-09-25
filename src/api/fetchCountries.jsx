import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApiData } from './api';
import { VENUE_URL } from './api';

const RenderCountries = () => {
  const { continent } = useParams();
  const [countries, setCountries] = useState([]);
  const [countryImages, setCountryImages] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchApiData(VENUE_URL);
        const venuesData = await response.json();

        const uniqueCountries = [...new Set(
          venuesData
            .filter((venue) => venue.location.continent === continent)
            .map((venue) => venue.location.country)
        )];

        setCountries(uniqueCountries);

        const countryImagesMap = {};
        uniqueCountries.forEach((country) => {
          const countryVenue = venuesData.find((venue) => (
            venue.location.continent === continent && venue.location.country === country
          ));
          if (countryVenue) {
            countryImagesMap[country] = countryVenue.media;
          }
        });
        setCountryImages(countryImagesMap);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    }

    fetchData();
  }, [continent]);

  return (
    <div className='row'>
      <h1>Countries in {continent}</h1>
      <div className='d-flex flex-wrap'>
        {countries.map((country) => (
          <div key={country} className='col-lg-4 col-sm-6 mb-3 p-2'>
            <h3>{country}</h3>
            {countryImages[country] && (
              <div className="image-container">
                <img
                  src={countryImages[country]}
                  alt={country}
                  className='img-fluid'
                />
              </div>
            )}
            <Link to={`/cities/${continent}/${country}`}>
              <button className='btn btn-secondary mt-3'>View Cities</button>
            </Link>
          </div>
        ))}
      </div>
      <Link to={`/`}>
        <button className='btn btn-primary mt-3'>Back to Continents</button>
      </Link>
    </div>
  );
};

export default RenderCountries;








