import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { VENUE_URL, BOOKING_URL, fetchApiData } from './api';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthToken } from '../storage';
import '../scss/components/calendar.scss'
import { NavigateBack } from '../components';

function VenueInfo({ venueData }) {
  if (!venueData) {
    return null;
  }

  return (
    <div>
      <NavigateBack />
      <h1>{venueData.name}</h1>
      <p className='fw-bold text-primary'>Booking</p>
    </div>
  );
}

function BookVenue() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [selectedRange, setSelectedRange] = useState([]);
  const [venueData, setVenueData] = useState(null);
  const [guests, setGuests] = useState(0);

  useEffect(() => {
    async function fetchVenueData() {
      try {
        const venueResponse = await fetchApiData(`${VENUE_URL}/${id}`);
        if (!venueResponse.ok) {
          throw new Error('Failed to fetch venue data');
        }
        const venueData = await venueResponse.json();
        setVenueData(venueData);

        if (venueData.availableDates) {
          setSelectedRange(venueData.availableDates);
        }
      } catch (error) {
        console.error('Error fetching venue data:', error);
      }
    }
    fetchVenueData();
  }, [id]);

  const handleBooking = async () => {
    try {
      if (
        selectedRange.length !== 2 ||
        isNaN(guests) ||
        guests <= 0 ||
        guests > (venueData?.maxGuests || 0)
      ) {
        alert('Please select a valid date range and specify the number of guests within the max guests limit.');
        return;
      }
  
      const [dateFrom, dateTo] = selectedRange;
      const parsedGuests = parseInt(guests);
  
      const token = getAuthToken();
  
      const bookingResponse = await fetch(BOOKING_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          dateFrom: dateFrom.toISOString(),
          dateTo: dateTo.toISOString(),
          venueId: id,
          guests: parsedGuests,
        }),
      });
      alert(`Successfully booked from ${dateFrom} to ${dateTo}`)
  
      navigate('/bookings/profile')
      if (!bookingResponse.ok) {
        throw new Error('Failed to book the venue');
      }
  
    } catch (error) {
      console.error('Error booking the venue:', error);
    }
  };

  if (!venueData) {
    return null;
  }
  

  return (
    <div className='row'>
      <VenueInfo venueData={venueData} />
      <div className="calendar-container">
        <Calendar
          onChange={setSelectedRange}
          value={selectedRange}
          selectRange={true}
          className="custom-calendar"
        />
      </div>
      <h2 className='mt-4'>Booking Information</h2>
      <div className="col-md-4 col-lg-3">
        <label>Number of Guests (max {venueData.maxGuests}):</label>
        <input
          className='form-control col-md-3'
          type="number"
          value={guests}
          onChange={(e) => {
            const inputValue = parseInt(e.target.value, 10);
            if (!isNaN(inputValue) && inputValue >= 0) {
              setGuests(inputValue);
            }
          }}
        />
        <button onClick={handleBooking} className="btn btn-primary my-3">Book Venue</button>
      </div>
    </div>
  );
}

export default BookVenue;
