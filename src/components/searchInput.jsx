import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchApiData } from '../api/index';
import { VENUE_URL } from '../api/index';

function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchApiData(VENUE_URL);
        const data = await response.json();
        setAllData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredData = allData.filter((item) =>
      item.name.toLowerCase().includes(query) ||
      item.location.continent.toLowerCase().includes(query) ||
      item.location.country.toLowerCase().includes(query) ||
      item.location.city.toLowerCase().includes(query)
    );
    setSearchResults(filteredData);
  };

  const clearInput = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearch = () => {
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        {searchQuery && (
          <button className="clear-button" onClick={clearInput}>
            &times;
          </button>
        )}
        <button className="search-button btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <Link
              to={`/venue/${result.location.continent}/${result.location.country}/${result.location.city}/${result.id}`}
            >
              {result.name} - {result.location.city}, {result.location.country}, {result.location.continent}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchComponent;

