// SettingsContext.js
import  { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  const [displayItemCount, setDisplayItemCount] = useState(3);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    // Load settings from Local Storage
    const storedDisplayItemCount = localStorage.getItem('displayItemCount');
    const storedShowCompleted = localStorage.getItem('showCompleted');

    if (storedDisplayItemCount) {
      setDisplayItemCount(parseInt(storedDisplayItemCount));
    }

    if (storedShowCompleted !== null) {
      setShowCompleted(storedShowCompleted === 'true');
    }
  }, []);

  useEffect(() => {
    // Save settings to Local Storage whenever they change
    localStorage.setItem('displayItemCount', displayItemCount);
    localStorage.setItem('showCompleted', showCompleted.toString());
  }, [displayItemCount, showCompleted]);

  return (
    <SettingsContext.Provider value={{ displayItemCount, setDisplayItemCount, showCompleted, setShowCompleted }}>
      {children}
    </SettingsContext.Provider>
  );
};