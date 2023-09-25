import { setLocalStorage } from './localStorage';
import { LOGIN_URL } from '../api';

export async function loginUser(loginData) {
    try {
      const response = await fetch(`${LOGIN_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData), // Replace loginData with user input
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
  
      // Extract the user's manager status from the response
      const isManager = data.venueManager;
  
      // Store the access token and user's manager status in localStorage
      setLocalStorage('accessToken', data.accessToken);
      setLocalStorage('isManager', isManager);
  
      return data; // Return login response (e.g., user data)
    } catch (error) {
      console.error('Error logging in:', error);
      throw error; // Rethrow the error for error handling in the UI
    }
  }
