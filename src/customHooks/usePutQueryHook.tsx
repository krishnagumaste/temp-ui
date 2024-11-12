import axios, { AxiosRequestConfig } from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/userDetailsContext';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface PutDataParams {
  updatedData: unknown;
}

interface UsePutQueryOptions {
  onSuccess?: (
    data: unknown,
    variables: PutDataParams,
    context: unknown
  ) => void;
  onError?: (error: Error, variables: PutDataParams, context: unknown) => void;
}

const usePutQuery = (
  url: string,
  options?: UsePutQueryOptions
): UseMutationResult<unknown, Error, PutDataParams> => {
  const { user } = useContext(UserContext);

  const putQuery = async ({ updatedData }: PutDataParams): Promise<unknown> => {
    const config: AxiosRequestConfig = {
      headers: {
        'x-access-token': user?.token,
        'resource-name': 'ADMIN',
      },
    };

    const response = await axios.put(url, updatedData, config);
    return response?.data;
  };

  const mutation = useMutation({
    mutationFn: putQuery,
    onError: options?.onError,
    onSuccess: options?.onSuccess,
  });

  return mutation;
};

export default usePutQuery;
