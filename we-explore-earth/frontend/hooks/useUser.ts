import { useAppSelector } from '../app/redux/hooks';

export const useUser = () => {
  const user = useAppSelector((state) => state.user);
  
  return {
    user,
    userId: user?.id || null,
    isAuthenticated: user !== null,
  };
};
