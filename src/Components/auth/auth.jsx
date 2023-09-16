import React from 'react';
import { useAuth } from '../../context/AuthContext';

function Auth({ capability, children }) {
  const { loggedIn, authorize } = useAuth();

  if (loggedIn && (!capability || authorize(capability))) {
    return <>{children}</>;
  }

  return null;
}

export default Auth;
