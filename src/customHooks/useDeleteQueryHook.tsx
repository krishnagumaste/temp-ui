import { useContext } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { UserContext } from '../context/userDetailsContext';

interface DeleteDataApiParams {
  url: string;
  deleteData: unknown;
}

interface UseDeleteQueryOptions {
  onDeleteSuccess?: (
    data: unknown,
    variables: DeleteDataApiParams,
    context: unknown
  ) => void;
  onDeleteError?: (
    error: Error,
    variables: DeleteDataApiParams,
    context: unknown
  ) => void;
  deleteDataSource: unknown;
}

const useDeleteQuery = (
  url: string,
  options: UseDeleteQueryOptions
): UseMutationResult<unknown, Error, DeleteDataApiParams> => {
  const { user } = useContext(UserContext);

  const deleteDataApi = async (url: string): Promise<unknown> => {
    const config: AxiosRequestConfig = {
      headers: {
        'x-access-token': user?.token,
      },
      data: options.deleteDataSource,
    };

    const response = await axios.delete(url, config);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: () => deleteDataApi(url),
    onSuccess: options.onDeleteSuccess,
    onError: options.onDeleteError,
  });

  return mutation;
};

export default useDeleteQuery;
