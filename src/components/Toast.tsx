import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@material-tailwind/react';
import { RootState } from './../store';
import { hideToast } from './../stores/toast.slice';

export default function Toast() {
  const dispatch = useDispatch();
  const { message, show } = useSelector((state: RootState) => state.toast);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Alert color={'blue'} onClose={() => dispatch(hideToast())}>
        {message}
      </Alert>
    </div>
  );
};
