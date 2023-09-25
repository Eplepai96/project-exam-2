import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser } from '../storage/registerUser';
import { useAuth } from '../storage/authContext';
import { loginUser } from '../storage/loginUser';
import { setLocalStorage } from '../storage';


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
  .required('Please enter an email'),
  password: yup
    .string()
    .min(3, 'Please enter a password of minimum 3 characters')
    .matches(/[a-zA-Z1-9]/, 'Password must only contain letters and numbers')
    .required('Please enter a password'),
  venueManager: yup
    .boolean()
    .required('Please select an option'),
}).required();

export function RegisterForm() {
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
    console.log('register form function called');
    await registerUser(data);
    const loginResponse = await loginUser(data);

    console.log('Registration and Login response:', loginResponse);

    const { accessToken, venueManager, name } = loginResponse; 

    login(accessToken, venueManager, name); 
  } catch (error) {
    console.error('Registration error:', error);
  }
};

  

  return (
    <div className="registerForm">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formColumn">
          <div className="formGroup">
            <label htmlFor="name">Name</label>
            <input id="name" {...register('name')} />
            <p>{errors.name?.message}</p>
          </div>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input id="email" {...register('email')} />
            <p>{errors.email?.message}</p>
          </div>
          <div className="formGroup">
            <label htmlFor="avatar">Avatar</label>
            <input id="avatar" {...register('avatar')} />
            <p>{errors.avatar?.message}</p>
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input id="password" {...register('password')} />
            <p>{errors.password?.message}</p>
          </div>
          <div>
            <p>Register as manager?</p>
            <label>
              <input type="radio" {...register('venueManager')}
              value={true} />
              Yes
            </label>
            <label>
              <input type="radio" {...register('venueManager')}
              value={false} />
              No
            </label>
            <p>{errors.venueManager?.message}</p>
          </div>
        </div>
        <div className="formButton">
          <input className="btn-primary" type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
}
