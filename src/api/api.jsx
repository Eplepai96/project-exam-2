export const BASE_URL = 'https://api.noroff.dev/api/v1/holidaze';
export const VENUE_URL = `${BASE_URL}/venues`;
export const BOOKING_URL = `${BASE_URL}/bookings`;
export const PROFILE_URL = `${BASE_URL}/profiles`;
export const BASE_AUTH_URL = `${BASE_URL}/auth`
export const LOGIN_URL = `${BASE_AUTH_URL}/login`
export const REGISTER_URL = `${BASE_AUTH_URL}/register`

export async function fetchApiData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

export async function postData(url, data, token) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });

    return response;
  } catch (error) {
    throw new Error('Error posting data:', error);
  }
}

export async function getData(url, token) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

export async function deleteData(url, token) {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to cancel booking');
    }
    
    return null;
  } catch (error) {
    console.error('Error canceling booking:', error);
    throw error;
  }
}

export async function updateData(url, data, token) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });

    return response;
  } catch (error) {
    throw new Error('Error posting data:', error);
  }
}
