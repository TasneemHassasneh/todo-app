import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (username, password) => {
    
    if (username === 'example' && password === 'password') {
      const validUser = { username, capabilities: ['read', 'update', 'create', 'delete'] };
      setUser(validUser);
      setLoggedIn(true);
    }
  };

  const logout = () => {
   
    setUser(null);
    setLoggedIn(false);
  };

  const authorize = (capability) => {
   
    return user?.capabilities?.includes(capability) || false;
  };

  return (
    <AuthContext.Provider value={{ user, loggedIn, login, logout, authorize }}>
      {children}
    </AuthContext.Provider>
  );
};
