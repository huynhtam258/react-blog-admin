// src/components/AuthGuard.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { setToken } from '../pages/auth/auth.slice';

interface AuthGuardProps {
  token: string | null;
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ token, children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
    } else {
      navigate('/auth/login');
    }
  }, [token, dispatch, navigate]);

  return <>{children}</>;
};

export default AuthGuard;
