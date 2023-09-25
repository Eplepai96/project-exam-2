import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { VENUE_URL, BOOKING_URL, fetchApiData } from './api';
import { useParams } from 'react-router-dom';
import { getAuthToken } from '../storage';

function VenueInfo({ venueData }) {
  if (!venueData) {
    return null;
  }

  return (
    <div>
      <h1>{venueData.name}</h1>
      <p className='fw-bold text-primary'>Booking</p>
    </div>
  );
}

function BookVenue() {
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
      if (selectedRange.length !== 2 || isNaN(guests) || guests <= 0) {
        alert('Please select a valid date range and specify the number of guests as a positive number.');
        return;
      }

      const [dateFrom, dateTo] = selectedRange;
      const parsedGuests = parseInt(guests, 10);

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

      if (!bookingResponse.ok) {
        throw new Error('Failed to book the venue');
      }

    } catch (error) {
      console.error('Error booking the venue:', error);
    }
  };

  return (
    <div className='row'>
      <VenueInfo venueData={venueData} />
      <Calendar
        onChange={setSelectedRange}
        value={selectedRange}
        selectRange={true}
        className='m-sm-3'
      />
      <div>
        <h2>Venue Information</h2>
        <label>Number of Guests:</label>
        <input
          type="number"
          value={guests}
          onChange={(e) => {
            const inputValue = parseInt(e.target.value, 10);
            if (!isNaN(inputValue) && inputValue >= 0) {
              setGuests(inputValue);
            }
          }}
        />
        <button onClick={handleBooking}>Book Venue</button>
      </div>
    </div>
  );
}

export default BookVenue;
