import { setLocalStorage } from './localStorage';
import { LOGIN_URL } from '../api';

export async function loginUser(loginData) {
    try {
      const response = await fetch(`${LOGIN_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData), 
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      const isManager = data.venueManager;

      setLocalStorage('accessToken', data.accessToken);
      setLocalStorage('isManager', isManager);
  
      return data; 
    } catch (error) {
      console.error('Error logging in:', error);
      throw error; 
    }
  }
