import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchApiData } from '../api/index';
import { VENUE_URL } from '../api/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../scss/components/searchinput.scss'
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

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

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
    <div className='row'>
      <div className='input-group'>
        <div className="form-outline d-flex flexwrap m-lg-auto">
          <input
            className='form-control m-1'
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          {searchQuery && (
            <p className="clear-button" onClick={clearInput}></p>
          )}
          <button className="btn btn-primary my-2 d-flex p-2 text-white" onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
      {searchResults.length > 0 && (
        <div className="d-flex flex-column">
          <ul className='m-md-auto col-lg-3 p-0 p-l-xl-5'>
            {searchResults.map((result) => (
              <li className='list-unstyled bg-light p-3 m-1 color-secondary text-xl' key={result.id}>
                <Link
                  to={`/venue/${result.location.continent}/${result.location.country}/${result.location.city}/${result.id}`}
                >
                  <img src={result.media} alt={result.name} className="search-input-image" /> 
                  {result.name} - {result.location.city}, {result.location.country}, {result.location.continent}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;

