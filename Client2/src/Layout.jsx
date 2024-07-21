import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar.jsx'; // Adjust the import path if necessary

function Layout() {
  const location = useLocation();

  // Determine if the current route should display the Navbar
  const shouldShowNavbar = location.pathname === '/home' || location.pathname === '/profilepage';

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Outlet />
    </>
  );
}

export default Layout;


