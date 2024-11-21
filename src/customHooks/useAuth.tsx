import { useEffect, useContext, useState } from 'react';
import { useGetQuery } from './useGetQueryHook';
import { authBase } from '../../apiConstants/urlConstants';
import { UserContext } from '../context/userDetailsContext';

export const useAuth = () => {
  const reqObj = {
    url: authBase,
    queryKey: 'get-sessions',
  };

  const { updateUser } = useContext(UserContext);

  const sessionDetails = useGetQuery(reqObj);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSessions = async () => {
      try {
        const apiResponse = await sessionDetails.refetch();
        if (apiResponse?.isSuccess) {
          if (apiResponse?.data?.data?.data) {
            updateUser(apiResponse?.data?.data?.data);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching session details:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    getSessions();
  }, []);

  return { isAuthenticated, isLoading };
};
