import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import UnauthenticateLayout from '../layouts/UnauthenticateLayout/UnauthenticateLayout';

// Dynamic import for the Auth component
const Auth = lazy(() => import('../pages/auth/auth'));

const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: <UnauthenticateLayout />,
    children: [
      { path: 'login', element: <Auth /> },
    ],
  },
];

export default authRoutes;