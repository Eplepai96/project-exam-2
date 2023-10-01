import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../storage/loginUser';
import { useAuth } from '../storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

const schema = yup.object({
  email: yup.string().email().required('Please enter an email'),
  password: yup
    .string()
    .min(3, 'Please enter a password of minimum 3 characters')
    .matches(/[a-zA-Z1-9]/, 'Password must only contain letters and numbers')
    .required('Please enter a password'),
}).required();

export function LoginForm() {
  const navigate = useNavigate()
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
      const loginResponse = await loginUser(data);
      const { accessToken, venueManager, name } = loginResponse;

      alert('You are now logged in')
      login(accessToken, venueManager, name);

      navigate('/')
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
            <FontAwesomeIcon icon={faEnvelope} /> Email
            </label>
            <input id="email" {...register('email')} className="form-control" placeholder='Your @noroff.no email' />
            <p className="text-danger">{errors.email?.message}</p>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="password" className="form-label">
            <FontAwesomeIcon icon={faKey} /> Password
            </label>
            <input id="password" type="password" {...register('password')} className="form-control" placeholder='Your password'/>
            <p className="text-danger">{errors.password?.message}</p>
          </div>
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" type="submit">
            Log in
          </button>
        </div>

        <div className="mb-5">
          <p>Don't have an account?</p>
          <Link to={'/register/login'} className="btn btn-secondary">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
