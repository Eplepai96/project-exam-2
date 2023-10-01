import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getData, PROFILE_URL } from '../api';
import { useAuth } from '../storage';
import { getLocalStorage } from '../storage';
import { getAuthToken } from '../storage';
import { CustomModal, useModal } from '../components/modal';
import { updateData } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

function Profile() {
  const { isManager, isCustomer, logout, login } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const userName = getLocalStorage('userName');
  const { name } = useParams();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleShowLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const managerRegistrationModal = useModal();

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

  const handleManagerRegistration = async () => {
    try {
      const token = getAuthToken();
      const profileUpdateResponse = await updateData(
        `${PROFILE_URL}/${userName}`,
        { venueManager: true },
        token
      );

      if (profileUpdateResponse.ok) {
        managerRegistrationModal.closeModal();
        login(token, true, userName);
      } else {
        console.error('Registration error:', profileUpdateResponse.statusText);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate('/login');
  };

  return (
    <div>
      <div className='d-flex felxwrap'>
        <h1 className='mt-3'>User Profile</h1>
        <div className='mt-2'>
          <Link to={`/edit/profile/${userName}`}>
            <FontAwesomeIcon icon={faPen} className="p-2 m-2" />
          </Link>
        </div>
      </div>

      {profileData ? (
        <>
          {profileData.avatar && (
            <div className='image-container'>
              <img src={profileData.avatar} alt="" />
            </div>
          )}
          <p className='fw-bold mt-3'>Name: {profileData.name}</p>
          <p className='fw-bold'>Email: {profileData.email}</p>
        </>
      ) : (
        <p>Loading user profile.. Try logging in again if this issue persists</p>
      )}
      {isCustomer() && (
        <div>
          {!isManager() && (
            <button className="btn btn-secondary m-2"
              onClick={() =>
                managerRegistrationModal.openModal(
                  'Register as Manager',
                  'Are you sure you want to register as a manager?',
                  handleManagerRegistration
                )}
                >Register as manager
            </button>
          )}
          <Link to="/bookings/:profile">
            <button className="btn btn-primary m-2">Booked venues</button>
          </Link>
          <div>
            <button className='btn btn-primary m-2' onClick={handleShowLogoutModal}>
              Logout
            </button>
          </div>
        </div>
      )}
      {isManager() && (
        <div>
          <Link to="/venues/:profile">
            <button className="btn btn-primary">Posted venues</button>
          </Link>
          <Link to="/bookings/:profile">
            <button className="btn btn-secondary m-2">Booked venues</button>
          </Link>
          <div>
            <button className='btn btn-primary' onClick={handleShowLogoutModal}>
              Logout
            </button>
          </div>
        </div>
      )}

      {managerRegistrationModal.isOpen && (
        <CustomModal
          show={managerRegistrationModal.isOpen}
          title={managerRegistrationModal.modalTitle}
          message={managerRegistrationModal.modalMessage}
          onConfirm={managerRegistrationModal.onConfirm}
          onHide={managerRegistrationModal.closeModal}
        />
      )}

      {showLogoutModal && (
        <CustomModal
          show={showLogoutModal}
          title="Logout Confirmation"
          message="Are you sure you want to log out?"
          onConfirm={handleConfirmLogout}
          onHide={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
}

export default Profile;

