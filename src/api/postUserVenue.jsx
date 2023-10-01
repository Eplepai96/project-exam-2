import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getAuthToken } from '../storage';
import { postData } from './api';
import { VENUE_URL } from './api';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  name: yup.string().required('Please enter a name'),
  description: yup.string().required('Please enter a description'),
  price: yup.number().min(0, 'Price must not be negative').required('Please enter a price'),
  maxGuests: yup.number().min(0, 'Max guests must not be negative').required('Please enter the maximum number of guests'),
  media: yup.string().url('Please enter a valid URL for media').optional(),
  location: yup.object().shape({
    address: yup.string().required('Please enter an address'),
    city: yup.string().required('Please enter a city'),
    zip: yup.string(),
    country: yup.string().required('Please enter a country'),
    continent: yup.string().required('Please enter a continent'),
    lat: yup.number().min(-90).max(90).required('Please enter a latirude between -90 and 90'),
    lng: yup.number().min(-180).max(180).required('Please enter a longitude between -180 and 180'),
  }),
  meta: yup.object().optional().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
});


export function AddVenueForm() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (data.media) {
      data.media = data.media.split(',').map((url) => url.trim());
    } else {
      data.media = [];
    }
  
    console.log('Form submitted with data:', data);
  
    try {
      const token = getAuthToken();
      const response = await postData(`${VENUE_URL}`, data, token);

      if (response.ok) {
        navigate('/venues/profile');
        console.log('Venue created successfully');
      } else {
        alert('Failed to post venue')
        console.error('Failed to create venue');
      }
    } catch (error) {
      console.error('Error creating venue:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Add Venue</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col-lg-6 mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input id="name" {...register('name')} className="form-control" placeholder='Venue name'/>
          <p className="text-danger">{errors.name?.message}</p>
        </div>
        <div className="col-lg-6 mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea rows={5} id="description" {...register('description')} className="form-control" placeholder='About this venue'/>
          <p className="text-danger">{errors.description?.message}</p>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input id="price" type="number" {...register('price')} className="form-control" placeholder='price per night'/>
            <p className="text-danger">{errors.price?.message}</p>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="maxGuests" className="form-label">Max Guests</label>
            <input id="maxGuests" type="number" {...register('maxGuests')} className="form-control" placeholder='Max amount of guests'/>
            <p className="text-danger">{errors.maxGuests?.message}</p>
          </div>
        </div>
        <div className="col-lg-6 mb-3">
          <label htmlFor="media" className="form-label">Media (url)</label>
          <input
            id="media"
            type="text"
            placeholder="Enter media URLs separated by commas"
            {...register('media')}
            className="form-control"
          />
          <p className='text-danger'>{errors.media?.message}</p>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Location</label>
            <div className="location-fields">
              <input id="address" {...register('location.address')} placeholder="Address" className="form-control" />
              <input id="city" {...register('location.city')} placeholder="City" className="form-control" />
              <input id="zip" {...register('location.zip')} placeholder="ZIP Code" className="form-control" />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Location (cont.)</label>
            <div className="location-fields">
              <input id="country" {...register('location.country')} placeholder="Country" className="form-control" />
              <input id="continent" {...register('location.continent')} placeholder="Continent" className="form-control" />
              <input id="lat" type="number" {...register('location.lat')} placeholder="Latitude" className="form-control" />
              <input id="lng" type="number" {...register('location.lng')} placeholder="Longitude" className="form-control" />
            </div>
          </div>
          <div className="col-md-6 mb-3">
          <label className="form-label">Wi-Fi</label>
          <div>
            <label>
              <input
                type="radio"
                value="true"
                {...register('meta.wifi')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="false"
                {...register('meta.wifi')}
              />
              No
            </label>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Parking</label>
          <div>
            <label>
              <input
                type="radio"
                value="true"
                {...register('meta.parking')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="false"
                {...register('meta.parking')}
              />
              No
            </label>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Breakfast</label>
          <div>
            <label>
              <input
                type="radio"
                value="true"
                {...register('meta.breakfast')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="false"
                {...register('meta.breakfast')}
              />
              No
            </label>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Pets</label>
          <div>
            <label>
              <input
                type="radio"
                value="true"
                {...register('meta.pets')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="false"
                {...register('meta.pets')}
              />
              No
            </label>
          </div>
        </div>
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" type="submit">Create Venue</button>
        </div>
      </form>
    </div>
  );
}
