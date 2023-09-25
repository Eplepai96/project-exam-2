import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getAuthToken } from '../storage';
import { updateData } from './api'; 
import { VENUE_URL } from './api';
import { useParams } from 'react-router-dom';

const schema = yup.object({
  name: yup.string(),
  description: yup.string(),
  price: yup.number().min(0, 'Price must be non-negative'),
  maxGuests: yup.number().min(0, 'Max guests must be non-negative'),
 
  location: yup.object().shape({
    address: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    country: yup.string(),
    continent: yup.string(),
    lat: yup.number(),
    lng: yup.number(),
  }),
});

export function UpdateVenueForm() {
  const { venueId } = useParams(); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  

  const onSubmit = async (data) => {
    console.log('Form submitted with data:', data);
    try {
      const token = getAuthToken();
      console.log('DATA',data);
      const response = await updateData(`${VENUE_URL}/${venueId}`, data, token);
  
      if (response.ok) {
        console.log('Venue updated successfully');
      } else {
        console.error('Failed to update venue');
      }
    } catch (error) {
      console.error('Error updating venue:', error);
    }
  };
  return (
    <div className="addVenueForm">
      <h1>Add Venue</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formGroup">
          <label htmlFor="name">Name</label>
          <input id="name" {...register('name')} />
          <p>{errors.name?.message}</p>
        </div>
        <div className="formGroup">
          <label htmlFor="description">Description</label>
          <input id="description" {...register('description')} />
          <p>{errors.description?.message}</p>
        </div>
        <div className="formGroup">
          <label htmlFor="price">Price</label>
          <input id="price" type="number" {...register('price')} />
          <p>{errors.price?.message}</p>
        </div>
        <div className="formGroup">
          <label htmlFor="maxGuests">Max Guests</label>
          <input id="maxGuests" type="number" {...register('maxGuests')} />
          <p>{errors.maxGuests?.message}</p>
        </div>
        <div className="formGroup">
          <label htmlFor="media">Media</label>
          <input
            id="media"
            type="text"
            placeholder="Enter media URLs separated by commas"
            {...register('media')}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="location">Location</label>
          <div className="location-fields">
            <input id="address" {...register('location.address')} placeholder="Address" />
            <input id="city" {...register('location.city')} placeholder="City" />
            <input id="zip" {...register('location.zip')} placeholder="ZIP Code" />
            <input id="country" {...register('location.country')} placeholder="Country" />
            <input id="continent" {...register('location.continent')} placeholder="Continent" />
            <input id="lat" type="number" {...register('location.lat')} placeholder="Latitude" />
            <input id="lng" type="number" {...register('location.lng')} placeholder="Longitude" />
          </div>
          <p>{errors.location?.message}</p>
        </div>
        <div className="formButton">
          <input className="btn-primary" type="submit" value="Create Venue" />
        </div>
      </form>
    </div>
  );
}