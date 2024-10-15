import { useEffect, useState, Suspense, lazy, useCallback } from 'react';
import './App.css';

// enums
import { BASE_KEY } from './enums/index';

// stores
import { useRoutes } from 'react-router-dom';
import { RootState, useAppDispatch } from './store';
import { getUserProfile } from './pages/user/user.thunk';
import { useSelector } from 'react-redux';

// components
import Toast from './components/Toast';
import AuthGuard from './components/AuthGuard'; // Import AuthGuard

// Import routes from the new file
import { routes } from './routers/index';

const MainLayout = lazy(() => import('./layouts/MainLayout'));
const Unauthenticate = lazy(() => import('./layouts/UnauthenticateLayout'));

function App() {
  const elements = useRoutes(routes);
  const token = localStorage.getItem(BASE_KEY.ACCESS_TOKEN);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useAppDispatch();

  const initDataSource = useCallback(async () => {
    await dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      initDataSource();
    }
  }, [accessToken, initDataSource]);

  useEffect(() => {
    setIsLogin(!!userProfile);
  }, [userProfile]);

  return (
    <div className="App">
      <Toast />
      <Suspense fallback={<div>Loading...</div>}>
        <AuthGuard token={token}>
          {isLogin ? (
            <MainLayout>{elements}</MainLayout>
          ) : (
            <Unauthenticate>{elements}</Unauthenticate>
          )}
        </AuthGuard>
      </Suspense>
    </div>
  );
}

export default App;
