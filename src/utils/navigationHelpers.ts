import { NavigateFunction, Location } from 'react-router-dom';

export const redirectToLogin = (navigate: NavigateFunction, location: Location) => {
  navigate('/auth/login', { state: { from: location }, replace: true });
};