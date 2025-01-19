// styles
import './UnauthenticateLayout.scss'

import React from 'react';
import { Outlet } from 'react-router-dom';

const UnauthenticateLayout: React.FC = () => {
  return (
    <div className="unauthenticate-layout">
      <Outlet />
    </div>
  );
};

export default UnauthenticateLayout;