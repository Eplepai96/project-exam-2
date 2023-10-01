import React, { useState, useEffect } from "react";
import { VENUE_URL, getData } from "./api";
import { useParams } from "react-router-dom";
import { getAuthToken } from "../storage";

export function Guestlist() {
  const { venueId } = useParams();
  const [guestlist, setGuestlist] = useState([]);
  const [venueName, setVenueName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  console.log("ID from useParams:", venueId);

  useEffect(() => {
    async function fetchGuestlist() {
      const token = getAuthToken();

      try {
        const response = await getData(`${VENUE_URL}/${venueId}?_bookings=true`, token);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error("Failed to fetch guestlist data");
        }

        const data = await response.json();
        console.log('Data:', data);

        setVenueName(data.name);

        setGuestlist(data.bookings);
      } catch (error) {
        console.error("Error fetching guestlist data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGuestlist();
  }, [venueId]);

  return (
    <div>
      <h1>Guestlist for {venueName}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : guestlist.length > 0 ? (
        <ul className="my-3">
          {guestlist.map((booking) => (
            <li key={booking.id} className="list-unstyled">
              Date From: {new Date(booking.dateFrom).toLocaleString()}<br />
              Date To: {new Date(booking.dateTo).toLocaleString()}<br /> 
              Guests: {booking.guests}<br />
            </li>
          ))}
        </ul>
      ) : (
        <p>This venue has no bookings.</p>
      )}
    </div>
  );
}


