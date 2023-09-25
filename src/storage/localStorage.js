export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
}

export function getLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    console.log(`Retrieved ${key} from local storage:`, item);

    if (item) {
      const parsedItem = JSON.parse(item);
      console.log(`Parsed ${key} from JSON:`, parsedItem);
      return parsedItem;
    } else {
      console.log(`${key} not found in local storage.`);
      return defaultValue;
    }
  } catch (error) {
    console.error(`Error retrieving ${key} from local storage:`, error);
    return defaultValue;
  }
}



export function removeLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    localStorage.removeItem('isManager');
    localStorage.removeItem('userName');
  } catch (error) {
    console.error('Error removing localStorage:', error);
  }
}
