import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApiData } from './api';
import { VENUE_URL } from './api';
import { NavigateBack } from '../components';
import defaultImage from '../images/continents/DefaultImage.jpeg';


const Cities = () => {
  const { continent, country } = useParams();
  const [cities, setCities] = useState([]);
  const [cityImages, setCityImages] = useState({});
  const [cityVenues, setCityVenues] = useState({});
 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchApiData(VENUE_URL);
        const venues = await response.json();

        const filteredCities = venues
          .filter((venue) => {
            return (
              venue.location.continent === continent &&
              venue.location.country === country
            );
          })
          .map((venue) => venue.location.city);

        const uniqueCities = [...new Set(filteredCities)];
        setCities(uniqueCities);

        const cityImagesMap = {};
        const cityVenuesMap = {};

        uniqueCities.forEach((city) => {
          const cityVenueData = venues
            .filter((venue) => (
              venue.location.continent === continent &&
              venue.location.country === country &&
              venue.location.city === city
            ));

          if (cityVenueData.length > 0) {
            cityImagesMap[city] = cityVenueData[0].media;
            const venueNames = cityVenueData.map((venue) => venue.name).slice(0, 5);
            cityVenuesMap[city] = venueNames.join(', ');
          }
        });

        setCityImages(cityImagesMap);
        setCityVenues(cityVenuesMap);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }

    fetchData();
  }, [continent, country]);

  return (
    <div>
      <NavigateBack />
      <h1>Cities in {country}</h1>
      <p className='fw-bold text-primary'>{continent}</p>
      <div className='row'>
        {cities.map((city) => (
          <div key={city} className='col-lg-4 col-md-6 mb-4'>
            <div className='card border shadow-lg'>
              <div className='image-container'>
                <img
                  src={cityImages[city] || defaultImage}
                  alt={city}
                  className='card-img-top city-image'
                />
              </div>
              <div className='card-body'>
                <h3 className='card-title'>{city}</h3>
                <p className='card-text'>{cityVenues[city]}</p>
                <Link to={`/venues/${continent}/${country}/${city}`}>
                  <button className='btn btn-secondary mt-3'>View Venues</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link to={`/countries/${continent}`}>
        <button className='btn btn-primary mt-3'>Back to {continent}</button>
      </Link>
    </div>
  );
};

export default Cities;
