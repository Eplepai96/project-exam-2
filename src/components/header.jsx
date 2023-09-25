import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLocalStorage, useAuth } from '../storage';
import { getData } from '../api';
import { PROFILE_URL } from '../api';

export function Header() {
  const { isCustomer, isManager, isRegistered, authToken } = useAuth();
  const userName = getLocalStorage('userName');
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function fetchUserName() {
      try {
        if (isRegistered()) {
          const response = await getData(`${PROFILE_URL}/${userName}`, authToken);
          if (response.ok) {
            const data = await response.json();
            setProfileData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    if (isRegistered()) {
      fetchUserName();
    }
  }, [authToken, isRegistered, userName]);

  return (
    <div className='container'>
      <header>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <Link className='navbar-brand' to='/'>
            Home
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              {isRegistered() ? (
                <>
                  {isCustomer() && (
                    <>
                      <li className='nav-item'>
                        <Link className='nav-link' to='/bookings/:profile'>
                          Bookings
                        </Link>
                      </li>
                      {profileData && (
                        <li className='nav-item'>
                          <Link className='nav-link' to={`/profile/${userName}`}>
                            Profile
                          </Link>
                        </li>
                      )}
                    </>
                  )}
                  {isManager() && (
                    <>
                      <li className='nav-item'>
                        <Link className='nav-link' to='/venues/:profile'>
                          Venues
                        </Link>
                      </li>
                      {isManager() && profileData && (
                        <li className='nav-item'>
                          <Link className='nav-link' to={`/profile/${userName}`}>
                            Profile
                          </Link>
                        </li>
                      )}
                    </>
                  )}
                  
                </>
              ) : (
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

