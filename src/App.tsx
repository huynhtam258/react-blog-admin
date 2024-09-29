import { useEffect, useState } from 'react';
import './App.css';

// enums
import { BASE_KEY } from './enums/index'

// stores
import { useNavigate, useRoutes } from 'react-router-dom'
import { RootState, useAppDispatch } from './store';
import { getUserProfile } from './pages/user/user.thunk';
import { useSelector } from 'react-redux';
import { setToken } from './pages/auth/auth.slice';

// components
import Toast from './components/Toast';

// pages
import Auth from './pages/auth/auth';
import Home from './pages/home/components/Home';
import Products from './pages/product/components/Products';
import CreatePost from './pages/blog/components/CreatePost';
import CreateProduct from './pages/product/components/CreateProduct/CreateProduct';
import BlogDetail from './pages/blog/components/BlogDetail';

// layout
import MainLayout from './layouts/MainLayout';
import Unauthenticate from './layouts/UnauthenticateLayout';
function App() {
  const elements = useRoutes([
    {
      path: '',
      element: <Home />
    },
    {
      path: '/products',
      element: <Products />
    },
    {
      path: '/auth/login',
      element: <Auth />
    },
    {
      path: '/create-blog',
      element: <CreatePost />
    },
    {
      path: '/create-product',
      element: <CreateProduct />
    },
    {
      path: '/edit/:id',
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
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      dispatch(setToken(token))
    } else {
      navigate('/auth/login')
    }
  }, [token])

  useEffect(() => {
    if (accessToken) {
      initDataSource()
    }
  }, [accessToken])

  useEffect(() => {
    setIsLogin(!!userProfile)
  }, [userProfile])

  const initDataSource = async () => {
    await dispatch(getUserProfile())
    navigate('/')
  }
  return (
    <div className="App">
      <Toast />
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
