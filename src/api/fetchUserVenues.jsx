import { getLocalStorage } from "../storage";
import { PROFILE_URL, VENUE_URL } from "./api";
import { useState, useEffect } from "react";
import { getAuthToken } from "../storage";
import { getData } from "./api";
import { deleteData } from "./api"; // Import the deleteData function
import { Link } from "react-router-dom";

export function UserVenues() {
  const [userVenues, setUserVenues] = useState([]); // Initialize userBookings as an empty array
  const userName = getLocalStorage('userName'); // Get the userName from local storage

  console.log('UserVenues function called');

  useEffect(() => {
    // Ensure that "userName" is defined before making the API request
    if (userName) {
      // Fetch user bookings data based on the "userName" parameter
      async function fetchUserVenues() {
        try {
          // Use the token from your storage or authentication mechanism
          const token = getAuthToken(); // Make sure you have this function
  
          // Make the API request using the "userName" from local storage
          const response = await getData(`${PROFILE_URL}/${userName}/venues`, token);
  
          console.log('RESPONSE', response)
          if (!response.ok) {
            throw new Error('Failed to fetch user venues data');
          }
  
          const data = await response.json();
          console.log(data)

          function formatISODate(isoDateString) {
            const date = new Date(isoDateString);
            return date.toLocaleString(); // You can customize the format by passing options to toLocaleString
          }
          // Map the data to match the expected structure
          const mappedData = data.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            media: item.media,
            price: item.price,
            maxGuests: item.maxGuests,
            rating: item.rating,
            city: item.location?.city,
            meta: item.meta,
          }));
  
          setUserVenues(mappedData); // Set userBookings as an array of bookings
        } catch (error) {
          console.error('Error fetching user bookings data:', error);
        }
      }
  
      fetchUserVenues();
    }
  }, [userName]);

  // Function to handle booking deletion
  async function handleDeleteVenue(venueId) {
    try {
      const token = getAuthToken(); // Get the authentication token
      const url = `${VENUE_URL}/${venueId}`; // Construct the delete URL
      await deleteData(url, token); // Use the deleteData function to delete the booking

      // Update the userBookings state by filtering out the canceled booking
      setUserVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== venueId));
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  }

  return (
    <div className="row">
      <h1>Your Venues</h1>
      <Link to="/add/:venues/:profile">
        <button className="btn btn-primary m-2">Add new</button>
      </Link>
      {userVenues.length > 0 ? (
        <ul className="list-unstyled">
          {userVenues.map((venue) => (
            <li
              key={venue.name}
              className="user-venue rounded shadow-lg m-2 d-md-flex flex-md-row flex-column"
            >
              <div className="d-flex">
                <img
                  src={venue.media}
                  alt={venue.media}
                  className="image-container img-fluid m-2"
                />
              </div>
              <div className="d-md-flex flex-md-column flex-grow-1">
                <div>
                  <h2 className="m-2">{venue.name}</h2>
                  <p className="fw-bold m-2">{venue.city}</p>
                </div>
                <div className="mt-auto">
                  <Link to={`/venues/edit/${venue.id}`}>
                    <button className="btn btn-secondary m-2">Edit</button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No venues found.</p>
      )}
    </div>
  );
      }  