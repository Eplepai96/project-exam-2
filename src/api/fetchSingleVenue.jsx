import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApiData } from '../api/index';
import { VENUE_URL } from '../api/index';
import { useAuth } from '../storage';
import { CustomModal, useModal } from '../components/modal';
import { NavigateBack } from '../components';

function SingleVenue() {
  const { id } = useParams();
  const [venueData, setVenueData] = useState(null);
  const { isRegistered } = useAuth();
  const loginModal = useModal();

  useEffect(() => {
    async function fetchVenueData() {
      try {
        const response = await fetchApiData(`${VENUE_URL}/${id}`);
        console.log('API Response:', response);
        const data = await response.json();
        setVenueData(data);
      } catch (error) {
        console.error('Error fetching venue data:', error);
      }
    }

    fetchVenueData();
  }, [id]);

  if (!venueData) {
    return <div>Could not find the requested venue venue</div>;
  }

  const renderButton = () => {
    if (!isRegistered()) {
      return (
        <button
          className="btn btn-secondary"
          onClick={() => loginModal.openModal()}
        >
          Book venue
        </button>
      );
    } else {
      return (
        <Link
          to={`/book/${venueData.name}/${venueData.location.continent}/${venueData.location.country}/${venueData.location.city}/${venueData.id}`}
        >
          <button className="btn btn-secondary">Book venue</button>
        </Link>
      );
    }
  };

  return (
    <div className="row">
      <div>
        <NavigateBack />
        <h1>{venueData.name}</h1>
        <p className="fw-bold text-primary">{venueData.location.city}</p>
        <div className="venue-image d-flex">
          <div className='image-container'>
          <img src={venueData.media} 
          alt={venueData.name} 
          className="mh-100 align-content-center" />
          </div>
        </div>
      </div>
      <div className='row d-flex flexwrap'>
        <div className='mt-3'>
        <p className="fw-bold">Price per night: {venueData.price},-</p>
        </div>
      
      <div>
        {isRegistered() ? (
          renderButton()
        ) : (
          <button
            className="btn btn-secondary"
            onClick={() => loginModal.openModal()}
          >
            Book venue
          </button>
        )}
      </div>
      {loginModal.isOpen && (
        <CustomModal
          show={loginModal.isOpen}
          title={loginModal.modalTitle}
          message="Ypu need to be logged in to book a venue. Log in now?"
          onConfirm={() => {
            loginModal.closeModal();
            window.location.href = '/login'; 
          }}
          onHide={loginModal.closeModal}
        />
      )}
      </div>
      <h2 className="mt-3">About this venue</h2>
      <div className='col-md-7'>
        <p>{venueData.description}</p>
      </div>

      <div className='col-md-5 col-xl-2 bg-light border border-grey'>
        <p className='fw-bold'>Max guests: {venueData.maxGuests}</p>
        <p className='fw-bold'>Rating: {venueData.rating}</p>
        <p className='fw-bold'>Wi-Fi: {venueData.meta.wifi ? "Yes" : "No"}</p>
        <p className='fw-bold'>Parking: {venueData.meta.parking ? "Yes" : "No"}</p>
        <p className='fw-bold'>Breakfast: {venueData.meta.breakfast ? "Yes" : "No"}</p>
        <p className='fw-bold'>Pets: {venueData.meta.pets ? "Allowed" : "Not Allowed"}</p>
      </div>

      <p className='mt-5 mb-1'>Updated: {venueData.updated}</p>
    </div>
  );
}

export default SingleVenue;


