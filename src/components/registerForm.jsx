import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser } from '../storage/registerUser';
import { useAuth } from '../storage/authContext';
import { loginUser } from '../storage/loginUser';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faImagePortrait, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavigateBack } from './navigateBack';

const schema = yup.object({
  name: yup
    .string()
    .min(3, 'Please enter a name of minimum 3 characters.')
    .required('Please enter your name'),
  avatar: yup
  .string()
  .url(),
  email: yup
  .string()
  .email()
  .matches(/@noroff\.no$/, 'Email must end with @noroff.no')
  .required('Please enter an email'),
  password: yup
    .string()
    .min(8, 'Please enter a password of minimum 8 characters')
    .matches(/[a-zA-Z1-9]/, 'Password must only contain letters and numbers')
    .required('Please enter a password'),
  venueManager: yup
    .boolean()
    .required('Please select an option'),
}).required();

export function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { login } = useAuth();

const onSubmit = async (data) => {
  try {
    await registerUser(data);
    const loginResponse = await loginUser(data);

    const { accessToken, venueManager, name } = loginResponse; 

    alert('Successfully registed')
    login(accessToken, venueManager, name); 
    navigate('/')
  } catch (error) {
    console.error('Registration error:', error);
  }
};

return (
  <div className="container mt-4">
    <NavigateBack/>
    <h1>Register</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <label htmlFor="name" className="form-label">
          <FontAwesomeIcon icon={faUser} /> Name
          </label>
          <input id="name" {...register('name')} className="form-control" placeholder='Your username'/>
          <p className="text-danger">{errors.name?.message}</p>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="email" className="form-label">
          <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input id="email" {...register('email')} className="form-control" placeholder='Your @noroff.no email'/>
          <p className="text-danger">{errors.email?.message}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="avatar" className="form-label">
          <FontAwesomeIcon icon={faImagePortrait} /> User image
          </label>
          <input id="avatar" {...register('avatar')} className="form-control" placeholder='Your image (url)'/>
          <p className="text-danger">{errors.avatar?.message}</p>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="password" className="form-label">
          <FontAwesomeIcon icon={faKey} /> Password
          </label>
          <input id="password" type="password" {...register('password')} className="form-control" placeholder='Your password'/>
          <p className="text-danger">{errors.password?.message}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <p className='fw-bold mt-3'>Register as manager?</p>
          <p>
            <Link to='/about'>Read more</Link> on our about page
          </p>
          <label className="form-check-label">
            <input type="radio" {...register('venueManager')} value={true} className="form-check-input" />
            Yes
          </label>
          <label className="form-check-label">
            <input type="radio" {...register('venueManager')} value={false} className="form-check-input" />
            No
          </label>
          <p className="text-danger">{errors.venueManager?.message}</p>
        </div>
      </div>
      <div className="mb-3">
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </div>
    </form>
  </div>
);

}
