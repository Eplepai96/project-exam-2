import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getAuthToken } from '../storage';
import { postData } from './api';
import { VENUE_URL } from './api';

const schema = yup.object({
  name: yup.string().required('Please enter a name'),
  description: yup.string().required('Please enter a description'),
  price: yup.number().min(0, 'Price must be non-negative').required('Please enter a price'),
  maxGuests: yup.number().min(0, 'Max guests must be non-negative').required('Please enter the maximum number of guests'),
 
  location: yup.object().shape({
    address: yup.string().required('Please enter an address'),
    city: yup.string().required('Please enter a city'),
    zip: yup.string(),
    country: yup.string().required('Please enter a country'),
    continent: yup.string().required('Please enter a continent'),
    lat: yup.number().min(-90).max(90),
    lng: yup.number().min(-180).max(180),
  }),
});

export function AddVenueForm() {
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
      const response = await postData(`${VENUE_URL}`, data, token);

      if (response.ok) {
        console.log('Venue created successfully');
      } else {
        console.error('Failed to create venue');
      }
    } catch (error) {
      console.error('Error creating venue:', error);
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
