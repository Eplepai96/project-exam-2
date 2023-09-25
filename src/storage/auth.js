import { setLocalStorage, getLocalStorage, removeLocalStorage } from './localStorage';
  
  const AUTH_TOKEN_KEY = 'accessToken';
  
  export function setAuthToken(token) {
    setLocalStorage(AUTH_TOKEN_KEY, token);
  }
  
  export function getAuthToken() {
    return getLocalStorage(AUTH_TOKEN_KEY);
  }
  
  export function removeAuthToken() {
    removeLocalStorage(AUTH_TOKEN_KEY);
  }
  
  export function isRegistered() {
    return !!getAuthToken();
  }
  
  export function isManager() {
    return isRegistered() && getLocalStorage('isManager') === true;
  }
  

export function isCustomer() {
  return isRegistered() && !getLocalStorage('isManager');
}

  