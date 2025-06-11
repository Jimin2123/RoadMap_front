import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { initializeAuth } from './useAuth';
import { getMember } from './userUser';
import { RootState } from '../types/store';

const useInitializeSession = () => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(initializeAuth()).unwrap();
        if (isAuthenticated) await dispatch(getMember()).unwrap();
      } catch (err) {
        console.warn('Session expired or not logged in.', err);
      }
    };

    init();
  }, [dispatch, isAuthenticated]);
};

export default useInitializeSession;
