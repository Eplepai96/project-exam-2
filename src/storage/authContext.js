import React, { createContext, useContext, useState, useEffect } from 'react';
import { removeAuthToken } from './auth';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from './localStorage'; 

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const initialAuthToken = getLocalStorage('accessToken', ''); 
  const [authToken, setAuthToken] = useState(initialAuthToken);
  const [venueManager, setVenueManager] = useState(false);
  const [userName, setUserName] = useState(''); 

  useEffect(() => {
    const storedIsManager = getLocalStorage('isManager');
    if (storedIsManager !== null) {
      setVenueManager(storedIsManager);
    }

    const storedAccessToken = getLocalStorage('accessToken');
    if (storedAccessToken) {
      setAuthToken(storedAccessToken);
    }

    const storedUserName = getLocalStorage('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const isRegistered = () => !!authToken;
  const isManager = () => isRegistered() && venueManager;
  const isCustomer = () => isRegistered() && !venueManager;

  const logout = () => {
    removeAuthToken(); 
    setAuthToken('');
    removeLocalStorage('userName');
    setVenueManager(false);

    removeLocalStorage('accessToken');
    removeLocalStorage('isManager');
    removeLocalStorage('userName');
  };

  const login = (token, isManager, name) => {
    setAuthToken(token);
    setVenueManager(isManager);
    setUserName(name);

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



