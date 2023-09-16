// SettingsContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [displaySettings, setDisplaySettings] = useState({
    itemsPerPage: 3,
    hideCompletedItems: true,
    defaultSortField: 'difficulty',
  });

  // Function to save settings to local storage
  const saveSettingsToLocalStorage = () => {
    localStorage.setItem('displaySettings', JSON.stringify(displaySettings));
  };

  // Function to retrieve settings from local storage on application load
  const getSettingsFromLocalStorage = () => {
    const storedSettings = localStorage.getItem('displaySettings');
    if (storedSettings) {
      setDisplaySettings(JSON.parse(storedSettings));
    }
  };

  useEffect(() => {
    getSettingsFromLocalStorage();
  }, []); // Run once on component mount

  // Update local storage whenever displaySettings change
  useEffect(() => {
    saveSettingsToLocalStorage();
  }, [displaySettings]);

  return (
    <SettingsContext.Provider value={{ displaySettings, setDisplaySettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
