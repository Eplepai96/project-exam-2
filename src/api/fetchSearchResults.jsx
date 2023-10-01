import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApiData, VENUE_URL } from './api';
import '../scss/components/searchResults.scss'

function SearchResults() {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchApiData(VENUE_URL);
        const venues = await response.json();

        const filteredResults = venues.filter((venue) =>
          venue.name.toLowerCase().includes(query.toLowerCase()) ||
          venue.location.continent.toLowerCase().includes(query.toLowerCase()) ||
          venue.location.country.toLowerCase().includes(query.toLowerCase()) ||
          venue.location.city.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(filteredResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }

    fetchData();
  }, [query]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Search Results for "{query}"</h1>
      <ul className="list-group">
        {searchResults.map((result) => (
          <li key={result.id} className="list-group-item">
            <div className="row">
              <div className="col-md-3">
                <img src={result.media} alt={result.name} className="img-fluid search-results-image" />
              </div>
              <div className="col-md-6">
                <h3>{result.name}</h3>
              </div>
              <div className="col-md-3 text-right">
                <h3>${result.price}</h3>
                <Link to={`/venue/${result.location.continent}/${result.location.country}/${result.location.city}/${result.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;


