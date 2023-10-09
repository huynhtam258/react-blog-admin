import { useEffect, useState } from 'react';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Unauthenticate from './layouts/UnauthenticateLayout';
import Auth from './pages/auth/auth';
import Blog from './pages/blog/components';
import { useNavigate, useRoutes } from 'react-router-dom'
import BlogDetail from './pages/blog/components/BlogDetail';
function App() {
  const elements = useRoutes([
    {
      path: '/auth/login',
      element: <Auth />
    },
    {
      path: '/blog',
      element: <Blog />
    },
    {
      path: '/blog/:id',
      element: <BlogDetail />
    }
  ])
  const token = localStorage.getItem('access_token')
  const [login] = useState<boolean>(!!token)
  const navigate = useNavigate()

  useEffect(() => {
    if(login) {
      navigate('/blog')
    }else {
      navigate('/auth/login')
    }
  }, [login])
  return (
    <div className="App">
      {
        token &&
        (<MainLayout>
          {elements}
        </MainLayout>)
      }
      {
        !token && (
          <Unauthenticate>
            {elements}
          </Unauthenticate>
        )
      }

    </div>
  );
}

export default App;
