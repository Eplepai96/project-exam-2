import { REGISTER_URL } from '../api';

export async function registerUser(registrationData) {
  try {
    const response = await fetch(`${REGISTER_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    console.log('Registration successful');

    return 'Registration successful'; // Return a success message
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Rethrow the error for error handling in the UI
  }
}






