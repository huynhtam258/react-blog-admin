import { RouteObject } from 'react-router-dom';
import Guard from '../components/Guard';

import authRoutes from './authRoutes';
import mainRoutes from './mainRoutes';


export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Guard />,
    children: [
      ...authRoutes,
      ...mainRoutes
    ],
  },

];

export default routes;