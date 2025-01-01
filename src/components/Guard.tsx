import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { redirectToLogin } from '../utils/navigationHelpers';
import { BASE_KEY } from '../enums';

const Guard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem(BASE_KEY.ACCESS_TOKEN);
      if (!token) {
        redirectToLogin(navigate, location)
      } else {
        if (location.pathname === '/') {
          navigate('/posts', { replace: true });
        }
        
      }
    } catch (error) {
      redirectToLogin(navigate, location)
    }
    
  }, [location, navigate]);

  return <Outlet />;
};

export default Guard;