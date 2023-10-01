import React, { useState, useEffect } from "react";
import { getLocalStorage } from "../storage";
import { PROFILE_URL, VENUE_URL } from "./api";
import { getAuthToken } from "../storage";
import { getData } from "./api";
import { deleteData } from "./api";
import { Link } from "react-router-dom";
import { NavigateBack } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faList, faPen } from "@fortawesome/free-solid-svg-icons";
import { useModal, CustomModal } from "../components";

export function UserVenues() {
  const [userVenues, setUserVenues] = useState([]);
  const userName = getLocalStorage("userName");
  const {
    isOpen,
    modalTitle,
    modalMessage,
    openModal,
    closeModal,
    onConfirm,
  } = useModal();

  useEffect(() => {
    if (userName) {
      async function fetchUserVenues() {
        try {
          const token = getAuthToken();
          const response = await getData(
            `${PROFILE_URL}/${userName}/venues`,
            token
          );

          console.log("RESPONSE", response);
          if (!response.ok) {
            throw new Error("Failed to fetch user venues data");
          }

          const data = await response.json();
          console.log(data);

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

          setUserVenues(mappedData);
        } catch (error) {
          console.error("Error fetching user venues data:", error);
        }
      }

      fetchUserVenues();
    }
  }, [userName]);

  async function handleDeleteVenue(venueId) {
    try {
      const token = getAuthToken();
      const url = `${VENUE_URL}/${venueId}`;
      await deleteData(url, token);
      setUserVenues((prevVenues) =>
        prevVenues.filter((venue) => venue.id !== venueId)
      );
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  }

  return (
    <div className="row">
      <NavigateBack />
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
              <div className="image-container">
                <img
                  src={venue.media}
                  alt={venue.media}
                  className="venue-image img-fluid m-2"
                />
              </div>
              <div className="d-md-flex flex-md-column">
                <div>
                  <div className="d-flex">
                  <h2 className="m-2">
                    {venue.name}
                  </h2>
                  <Link to={`/venues/edit/${venue.id}`}>
                    <FontAwesomeIcon icon={faPen}className="p-2 m-2"/>
                  </Link>
                  </div>
                  
                  <p className="fw-bold m-2">{venue.city}</p>
                </div>
                <div className="mt-auto mb-0 text-danger">
                    <FontAwesomeIcon icon={faTrash} className="p-2"
                      onClick={() =>
                        openModal(
                          "Confirm Deletion",
                          "Are you sure you want to delete this venue? This action cannot be undone.",
                          () => {
                            handleDeleteVenue(venue.id);
                            closeModal()
                          }
                        )
                      }
                    />
                  </div>
                <div className="d-flex mt-auto">
                  <div className="mt-2">
                    <Link to={`/venues/guestlist/${venue.id}`}>
                      <button className="btn btn-primary m-2">
                        <FontAwesomeIcon icon={faList} className="mr-2" /> Guestlist</button>
                    </Link>
                  </div>
                  
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No venues found.</p>
      )}

      <CustomModal
        show={isOpen}
        title={modalTitle}
        message={modalMessage}
        onConfirm={onConfirm}
        onHide={closeModal}
      />
    </div>
  );
}
