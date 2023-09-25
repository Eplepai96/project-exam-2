import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getData, PROFILE_URL } from '../api';
import { useAuth } from '../storage';
import { getLocalStorage } from '../storage';
import { getAuthToken } from '../storage';

function Profile() {
  const { isManager, isCustomer, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const userName = getLocalStorage('userName');

  const { name } = useParams();

  useEffect(() => {
    if (name) {
      async function fetchProfileData() {
        try {
          const token = getAuthToken();

          const response = await getData(`${PROFILE_URL}/${userName}`, token);

          if (!response.ok) {
            throw new Error('Failed to fetch profile data');
          }

          const data = await response.json();
          setProfileData(data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }

      fetchProfileData();
    }
  }, [name, userName]);

  return (
    <div>
      <h1>User Profile</h1>
      {profileData ? (
        <>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
      {isCustomer() && (
        <div>
          <Link to="/register/:login" className="btn btn-secondary">
            <button className="btn btn-secondary">Register as manager</button>
          </Link>
          <Link to="/bookings/:profile">
            <button className="btn btn-primary">Booked venues</button>
          </Link>
        </div>
      )}
      {isManager() && (
        <div>
          <Link to="/venues/:profile">
            <button className="btn btn-primary m-2">Posted venues</button>
          </Link>
          <Link to="/bookings/:profile">
            <button className="btn btn-secondary m-2">Booked venues</button>
          </Link>
          <div></div>
          <li className='nav-item'>
            <button className='btn btn-primary' onClick={logout}>
              Logout
            </button>
          </li>
        </div>
      )}
    </div>
  );
}

export default Profile;