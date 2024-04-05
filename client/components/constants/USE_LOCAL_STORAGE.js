import { useState } from 'react';

const USE_LOCAL_STORAGE = (key) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error fetching data from localStorage:', error);
      return null;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting data to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

export default USE_LOCAL_STORAGE;
