import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Guard from '../components/Guard';

import UnauthenticateLayout from '../layouts/UnauthenticateLayout';
import MainLayout from '../layouts/MainLayout';

// Dynamic imports for pages
const Auth = lazy(() => import('../pages/auth/auth'));
const Home = lazy(() => import('../pages/home/components/Home'));
const Products = lazy(() => import('../pages/product/components/Products'));
const CreatePost = lazy(() => import('../pages/blog/components/CreatePost'));
const CreateProduct = lazy(() => import('../pages/product/components/ProductForm/ProductForm'));
const BlogDetail = lazy(() => import('../pages/blog/components/BlogDetail'));
const MediaList = lazy(() => import('../pages/media/components/MediaList'));
const MediaUpload = lazy(() => import('../pages/media/components/MediaUpload'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Guard />,
    children: [
      {
        path: 'auth',
        element: <UnauthenticateLayout />,
        children: [
          { path: 'login', element: <Auth /> },
        ],
      },
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: '/posts', element: <Home /> },
          { path: '/products', element: <Products /> },
          { path: '/create-blog', element: <CreatePost />},
          { path: '/create-product', element: <CreateProduct />,},
          { path: '/edit/:id', element: <CreatePost />,},
          { path: '/blog/:id', element: <BlogDetail />,},
          { path: '/media', element: <MediaList />,},
          { path: '/upload-image', element: <MediaUpload />}
        ],
      },
    ],
  },

];

export default routes;