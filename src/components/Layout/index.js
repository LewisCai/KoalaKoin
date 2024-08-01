import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '../Topbar';
import './index.scss';
import { useAuth0 } from '@auth0/auth0-react';

const Layout = () => {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Attempt to get a token silently
        await getAccessTokenSilently();
      } catch (error) {
        if (error.error === 'login_required') {
          // If a login is required, redirect the user to the login page
          loginWithRedirect();
        } else {
          console.error('An error occurred during silent authentication:', error);
        }
      }
    };

    if (!isAuthenticated) {
      checkSession(); // Call this function if the user is not already authenticated
    }
  }, [isAuthenticated, getAccessTokenSilently, loginWithRedirect]);

  return (
    <div className='App'>
      <Topbar />
      <div className='page'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
