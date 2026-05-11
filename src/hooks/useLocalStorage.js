import React from 'react';

function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = React.useState(() => {
    try {
      const localStorageItem = localStorage.getItem(itemName);
      if (!localStorageItem) {
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        return initialValue;
      }
      return JSON.parse(localStorageItem);
    } catch (error) {
      console.error(`Error reading localStorage key "${itemName}":`, error);
      return initialValue;
    }
  });

  const saveItem = (newItem) => {
    try {
      if (typeof newItem === 'function') {
        setItem((prev) => {
          const updated = newItem(prev);
          localStorage.setItem(itemName, JSON.stringify(updated));
          return updated;
        });
      } else {
        setItem(newItem);
        localStorage.setItem(itemName, JSON.stringify(newItem));
      }
    } catch (error) {
      console.error(`Error saving to localStorage key "${itemName}":`, error);
    }
  };

  return [item, saveItem];
}

export { useLocalStorage };
