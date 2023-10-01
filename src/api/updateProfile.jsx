import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PROFILE_URL, updateData, getData } from '../api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../storage';
import { NavigateBack } from '../components';

const schema = yup.object({
  avatar: yup.string().url('Please enter a valid URL for the avatar'),
});

export function EditProfileForm() {
  const { name } = useParams();
  console.log('Name parameter:', name);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [existingAvatarUrl, setExistingAvatarUrl] = useState('');

  const token = getLocalStorage('accessToken');

  useEffect(() => {
    if (name) {
      getData(`${PROFILE_URL}/${name}`, token) 
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch existing avatar URL');
          }
        })
        .then((data) => {
          setExistingAvatarUrl(data.avatar || ''); 
        })
        .catch((error) => {
          console.error('Error fetching existing avatar URL:', error);
        });
    }
  }, [name, token]);

  const onSubmit = async (data) => {
    console.log('Form submitted with data:', data);
    try {
      if (!name) {
        console.error('Name parameter is missing');
        return;
      }
      const mediaEndpoint = `${PROFILE_URL}/${name}/media`;

      console.log('Data to send:', data);

      const mediaResponse = await updateData(mediaEndpoint, data, token);

      console.log('Media Response:', mediaResponse);

      if (mediaResponse.ok) {
        console.log('Media updated successfully');
        alert('Media successfully updated');
        navigate(`/profile/${name}`);
      } else {
        console.error('Failed to update media');
      }
    } catch (error) {
      console.error('Error updating media:', error);
    }
  };

  return (
    <div className="container mt-4">
      <NavigateBack />
      <h1>Edit Avatar</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col-lg-6 mb-3">
          <label htmlFor="avatar" className="form-label">Avatar URL</label>
          <input
            id="avatar"
            {...register('avatar')}
            className="form-control"
            defaultValue={existingAvatarUrl}
          />
          <p className="text-danger">{errors.avatar?.message}</p>
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" type="submit">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
