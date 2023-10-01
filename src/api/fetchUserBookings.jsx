import { getLocalStorage } from "../storage";
import { BOOKING_URL, PROFILE_URL } from "./api";
import { useState, useEffect } from "react";
import { getAuthToken } from "../storage";
import { getData } from "./api";
import { deleteData } from "./api";
import { CustomModal, useModal } from '../components/modal';
import { NavigateBack } from "../components";

export function UserBookings() {
  const [userBookings, setUserBookings] = useState([]);
  const userName = getLocalStorage('userName');
  const deleteBookingModal = useModal();

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

          function formatDate(isoDateString) {
            const date = new Date(isoDateString);
            return date.toLocaleString();
          }

          const mappedData = data.map((item) => ({
            id: item.id,
            dateFrom: formatDate(item.dateFrom),
            dateTo: formatDate(item.dateTo),
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

      deleteBookingModal.openModal(
        'Confirm Deletion',
        'Are you sure you want to cancel this booking?',
        async () => {
          await deleteData(url, token);

          setUserBookings((prevBookings) =>
            prevBookings.filter((booking) => booking.id !== bookingId)
          );
        }
      );
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  }

  return (
    <div className="row">
      <NavigateBack />
      <h1>Your Bookings</h1>
      {userBookings.length > 0 ? (
        <ul className="list-unstyled">
          {userBookings.map((booking) => (
            <li key={booking.id} className="user-venue booking-item rounded shadow-lg m-2">
              <div className="d-md-flex flex-md-row flex-column">
                <div className="d-md-flex flex-md-column flex-grow-1">
                  <div>
                    <h2 className="m-2">Booking ID: {booking.id}</h2>
                    <p className="m-2">Booked From: {booking.dateFrom}</p>
                    <p className="m-2">Booked To: {booking.dateTo}</p>
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

      {deleteBookingModal.isOpen && (
        <CustomModal
          show={deleteBookingModal.isOpen}
          title={deleteBookingModal.modalTitle}
          message={deleteBookingModal.modalMessage}
          onConfirm={deleteBookingModal.onConfirm}
          onHide={deleteBookingModal.closeModal}
        />
      )}
    </div>
  );
}
