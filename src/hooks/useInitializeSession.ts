import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { initializeAuth } from './useAuth';

const useInitializeSession = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(initializeAuth()).unwrap();
      } catch (err) {
        console.warn('Session expired or not logged in.', err);
      }
    };

    init();
  }, [dispatch]);
};

export default useInitializeSession;
