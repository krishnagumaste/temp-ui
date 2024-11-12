import { useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserContext } from '../context/userDetailsContext';

interface CustomFetchOptions {
  url: string;
  queryKey: string;
}

interface LoginDetails {
  password: string;
  username: string;
}

export const useGetQuery = <T,>({
  url,
  queryKey,
  loginDetail, // Add this line to accept loginDetail as a parameter
}: CustomFetchOptions & { loginDetail?: LoginDetails }): UseQueryResult<
  AxiosResponse,
  unknown
> => {
  const { user } = useContext(UserContext);

  const getData = async (url: string): Promise<AxiosResponse<T>> => {
    let config;

    if (queryKey === 'token') {
      // If queryKey is 'token', set the headers with password and username
      config = {
        headers: {
          password: loginDetail?.password,
          username: loginDetail?.username,
        },
      };
    } else if (queryKey !== 'get-sessions') {
      // If queryKey is not 'get-sessions', set the headers with token and resource-name
      config = {
        headers: {
          'x-access-token': user?.token,
          'resource-name': 'ADMIN',
        },
      };
    }

    const response = await axios.get<T>(url, config);
    return response;
  };

  const queryResponseData = useQuery<AxiosResponse<T>, unknown>({
    queryKey: [queryKey],
    queryFn: () => getData(url),
    enabled: false,
    retry: false,
  });

  return queryResponseData;
};
