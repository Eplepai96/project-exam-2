import React, { createContext, useContext, useState, useEffect } from 'react';
import { removeAuthToken } from './auth';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from './localStorage'; // Import the localStorage functions

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize authToken based on the presence of the accessToken in local storage
  const initialAuthToken = getLocalStorage('accessToken', ''); // Provide an empty string as the default value
  const [authToken, setAuthToken] = useState(initialAuthToken);
  const [venueManager, setVenueManager] = useState(false);
  const [userName, setUserName] = useState(''); // Define userName state

  useEffect(() => {
    // Retrieve the isManager value from localStorage on component mount
    const storedIsManager = getLocalStorage('isManager');
    if (storedIsManager !== null) {
      setVenueManager(storedIsManager);
    }

    // Retrieve the accessToken value from localStorage on component mount
    const storedAccessToken = getLocalStorage('accessToken');
    if (storedAccessToken) {
      setAuthToken(storedAccessToken);
    }

    // Retrieve the userName value from localStorage on component mount
    const storedUserName = getLocalStorage('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // Determine authentication status based on the presence of authToken
  const isRegistered = () => !!authToken;
  const isManager = () => isRegistered() && venueManager;
  const isCustomer = () => isRegistered() && !venueManager;

  const logout = () => {
    removeAuthToken(); // This function is not defined in the provided code; make sure it's properly implemented
    setAuthToken('');
    removeLocalStorage('userName');
    setVenueManager(false);

    // Clear the relevant items from local storage when logging out
    removeLocalStorage('accessToken');
    removeLocalStorage('isManager');
    removeLocalStorage('userName');
  };

  const login = (token, isManager, name) => { // Pass the name here
    setAuthToken(token);
    setVenueManager(isManager);
    setUserName(name); // Set the userName in state

    // Store the authToken, isManager, and userName values in local storage
    setLocalStorage('accessToken', token);
    setLocalStorage('isManager', isManager);
    setLocalStorage('userName', name);
  };

  const contextValue = {
    authToken,
    isRegistered,
    isManager,
    isCustomer,
    logout,
    login,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  console.log('useAuth function called');
  return useContext(AuthContext);
}



