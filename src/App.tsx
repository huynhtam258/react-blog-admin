import { useEffect, useState } from 'react';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Unauthenticate from './layouts/UnauthenticateLayout';
import Auth from './pages/auth/auth';
import Blog from './pages/blog/components';
import { useNavigate, useRoutes } from 'react-router-dom'
import BlogDetail from './pages/blog/components/BlogDetail';
import Home from './pages/home/components/Home';
import CreatePost from './pages/blog/components/CreatePost';
import { RootState, useAppDispatch } from './store';
import { getUserProfile } from './pages/user/user.thunk';
import { useSelector } from 'react-redux';
import { BASE_KEY } from './enums/index'
function App() {
  const elements = useRoutes([
    {
      path: '',
      element: <Home />
    },
    {
      path: '/auth/login',
      element: <Auth />
    },
    {
      path: '/blog',
      element: <Blog />
    },
    {
      path: '/editor-blog',
      element: <CreatePost />
    },
    {
      path: '/blog/:id',
      element: <BlogDetail />
    }
  ])
  const token = localStorage.getItem(BASE_KEY.ACCESS_TOKEN)
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const userProfile = useSelector((state: RootState) => state.user.userProfile)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(!token) {
      navigate('/auth/login')
    } else {
      initDataSource()
    }
  }, [dispatch])

  useEffect(() => {
    if (userProfile) {
      setIsLogin(true)
    }
  }, [userProfile])

  const initDataSource = async () => {
    await dispatch(getUserProfile())
  }
  return (
    <div className="App">
      {
        isLogin &&
        (<MainLayout>
          {elements}
        </MainLayout>)
      }
      {
        !isLogin && (
          <Unauthenticate>
            {elements}
          </Unauthenticate>
        )
      }

    </div>
  );
}

export default App;
