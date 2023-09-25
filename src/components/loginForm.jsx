import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { loginUser } from '../storage/loginUser';
import { getLocalStorage, useAuth } from '../storage';


const schema = yup.object({
  email: yup
  .string()
  .email()
  .required('Please enter an email'),
  password: yup
  .string()
  .min(3, 'Please enter a password of minimum 3 characters')
  .matches(/[a-zA-Z1-9]/, 'Password must only contain letters and numbers')
  .required('Please enter a password')
}).required();

export function LoginForm() {
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
      console.log('Login response:', loginResponse);
      const { accessToken, venueManager, name } = loginResponse;

      login(accessToken, venueManager, name);

      const userName = getLocalStorage('userName');

      console.log('User Name:', userName);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
        <div className="loginForm">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="formColumn">
                <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input id="email" {...register('email')} />
                    <p>{errors.email?.message}</p>
                </div>
                <div className="formGroup">
                    <label htmlFor="password">Password</label>
                    <input id="password" {...register('password')} />
                    <p>{errors.password?.message}</p>
                </div>
                </div>
                <div className="formButton">
                    <input className='btn-primary' type="submit" value="Log in" />
                </div>

                <div className='mt-5'>
                    <p>Dont have an account?</p>
                    <Link to={'/register/login'}>
                        <button>Register</button>
                    </Link> 
                </div>
            </form>

    </div>
  );
}