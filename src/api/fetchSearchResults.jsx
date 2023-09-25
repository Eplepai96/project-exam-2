import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApiData, VENUE_URL } from './api';

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
    <div>
      <h1>Search Results for "{query}"</h1>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <Link to={`/venue/${result.location.continent}/${result.location.country}/${result.location.city}/${result.id}`}>
              {result.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;

