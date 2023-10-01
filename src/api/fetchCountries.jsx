import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApiData } from './api';
import { VENUE_URL } from './api';
import { NavigateBack } from '../components';
import defaultImage from '../images/continents/DefaultImage.jpeg';


const Countries = () => {
  const { continent } = useParams();
  const [countries, setCountries] = useState([]);
  const [countryImages, setCountryImages] = useState({});
  const [countryCities, setCountryCities] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchApiData(VENUE_URL);
        const venues = await response.json();

        const filteredCountries = venues
          .filter((venue) => {
            return venue.location.continent === continent;
          })
          .map((venue) => venue.location.country);

        const uniqueCountries = [...new Set(filteredCountries)];
        setCountries(uniqueCountries);

        const countryImagesMap = {};
        const countryCitiesMap = {};

        uniqueCountries.forEach((country) => {
          const countryVenueData = venues
            .filter((venue) => (
              venue.location.continent === continent &&
              venue.location.country === country
            ));

          if (countryVenueData.length > 0) {
            countryImagesMap[country] = countryVenueData[0].media;

            const cityNames = countryVenueData
              .map((venue) => venue.location.city)
              .filter((value, index, self) => self.indexOf(value) === index).slice(0, 5); 
              countryCitiesMap[country] = cityNames.join(', ');
          }
        });

        setCountryImages(countryImagesMap);
        setCountryCities(countryCitiesMap);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    }

    fetchData();
  }, [continent]);

  return (
    <div>
      <NavigateBack />
      <h1>Countries in {continent}</h1>
      <div className='row'>
        {countries.map((country) => (
          <div key={country} className='col-lg-4 col-md-6 mb-4'>
            <div className='card border shadow-lg'>
              <div className='image-container'>
                <img
                  src={countryImages[country] || defaultImage}
                  alt={country}
                  className='img-fluid country-image'
                />
              </div>
              <div className='card-body'>
                <h3 className='card-title'>{country}</h3>
                <p className='card-text'>{countryCities[country]}</p>
                <Link to={`/cities/${continent}/${country}`}>
                  <button className='btn btn-secondary mt-3'>View Cities</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link to={`/`}>
        <button className='btn btn-primary mt-3'>Back to Continents</button>
      </Link>
    </div>
  );
};

export default Countries;








