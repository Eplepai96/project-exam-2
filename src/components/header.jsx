import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getLocalStorage, useAuth } from '../storage';
import { getData } from '../api';
import { PROFILE_URL } from '../api';
import '../scss/components/header.scss';

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

  const closeNavMenu = () => {
    const navbarToggleBtn = document.getElementById('navbarToggleBtn');
    if (navbarToggleBtn) {
      navbarToggleBtn.click();
    }
  };

  return (
    <div className='bg-light'>
      <header>
        <div className='container bg-light'>
          <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <NavLink className='navbar-brand' to='/' exact>
              Home
            </NavLink>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarNav'
              aria-controls='navbarNav'
              aria-expanded='false'
              aria-label='Toggle navigation'
              id='navbarToggleBtn'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <NavLink
                    className='nav-link'
                    to='/about'
                    exact
                    onClick={closeNavMenu}
                  >
                    About
                  </NavLink>
                </li>
                {isRegistered() ? (
                  <>
                    {isCustomer() && (
                      <>
                        <li className='nav-item'>
                          <NavLink
                            className='nav-link'
                            to='/bookings/:profile'
                            exact
                            onClick={closeNavMenu}
                          >
                            Bookings
                          </NavLink>
                        </li>
                        {profileData && (
                          <li className='nav-item'>
                            <NavLink
                              className='nav-link'
                              to={`/profile/${userName}`}
                              exact
                              onClick={closeNavMenu}
                            >
                              Profile
                            </NavLink>
                          </li>
                        )}
                      </>
                    )}
                    {isManager() && (
                      <>
                        <li className='nav-item'>
                          <NavLink
                            className='nav-link'
                            to='/venues/:profile'
                            exact
                            onClick={closeNavMenu}
                          >
                            Venues
                          </NavLink>
                        </li>
                        {isManager() && profileData && (
                          <li className='nav-item'>
                            <NavLink
                              className='nav-link'
                              to={`/profile/${userName}`}
                              exact
                              onClick={closeNavMenu}
                            >
                              Profile
                            </NavLink>
                          </li>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <li className='nav-item'>
                    <NavLink
                      className='nav-link'
                      to='/login'
                      exact
                      onClick={closeNavMenu}
                    >
                      Login
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
