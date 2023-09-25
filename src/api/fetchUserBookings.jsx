import { getLocalStorage } from "../storage";
import { BOOKING_URL, PROFILE_URL } from "./api";
import { useState, useEffect } from "react";
import { getAuthToken } from "../storage";
import { getData } from "./api";
import { deleteData } from "./api"; 

export function UserBookings() {
  const [userBookings, setUserBookings] = useState([]); 
  const userName = getLocalStorage('userName'); 

  console.log('UserBookings called');

  useEffect(() => {

    if (userName) {

      async function fetchUserBookings() {
        try {

          const token = getAuthToken(); 

          const response = await getData(`${PROFILE_URL}/${userName}/bookings`, token);
  
          console.log('RESPONSE', response)
          if (!response.ok) {
            throw new Error('Failed to fetch user bookings data');
          }
  
          const data = await response.json();
          console.log(data)

          function formatISODate(isoDateString) {
            const date = new Date(isoDateString);
            return date.toLocaleString(); 
          }

          const mappedData = data.map((item) => ({
            id: item.id,
            dateFrom: formatISODate(item.dateFrom),
            dateTo: formatISODate(item.dateTo),
            guests: item.guests,
          }));
  
          setUserBookings(mappedData);
        } catch (error) {
          console.error('Error fetching user bookings data:', error);
        }
      }
  
      fetchUserBookings();
    }
  }, [userName]);

  async function handleDeleteBooking(bookingId) {
    try {
      const token = getAuthToken(); 
      const url = `${BOOKING_URL}/${bookingId}`; 
      await deleteData(url, token); 

      
      setUserBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  }

  return (
    <div className="row">
      <h1>Your Bookings</h1>
      {userBookings.length > 0 ? (
        <ul className="list-unstyled">
          {userBookings.map((booking) => (
            <li key={booking.id} className="booking-item rounded shadow-lg m-2">
              <div className="d-md-flex flex-md-row flex-column">
                <div className="d-flex">
                  <div className="booking-icon m-2">
                    <i className="fas fa-calendar"></i>
                  </div>
                </div>
                <div className="d-md-flex flex-md-column flex-grow-1">
                  <div>
                    <h2 className="m-2">Booking ID: {booking.id}</h2>
                    <p className="m-2">Date From: {booking.dateFrom}</p>
                    <p className="m-2">Date To: {booking.dateTo}</p>
                    <p className="m-2">Guests: {booking.guests}</p>
                  </div>
                  <div className="mt-auto">
                    <button
                      className="btn btn-primary m-2"
                      onClick={() => handleDeleteBooking(booking.id)}
                    >
                      Cancel booking
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
  
}