import { useContext } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { UserContext } from '../context/userDetailsContext';

interface PostData {
  [key: string]: unknown;
}

interface PostDataApiParams {
  postData: PostData;
  fromLogin: boolean;
}

interface UsePostOptions {
  onSuccess?: (
    data: unknown,
    variables: PostDataApiParams,
    context: unknown
  ) => void;
  onError?: (
    error: Error,
    variables: PostDataApiParams,
    context: unknown
  ) => void;
  buffer?: boolean;
}

const usePost = (
  url: string,
  options?: UsePostOptions
): UseMutationResult<unknown, Error, PostDataApiParams> => {
  const { user } = useContext(UserContext);

  const postDataApi = async ({
    postData,
    fromLogin,
  }: PostDataApiParams): Promise<unknown> => {
    const config: AxiosRequestConfig = {
      headers: {
        username: fromLogin
          ? (postData['username'] as string | undefined)
          : undefined,
        'is-signup': fromLogin
          ? (postData['isSignUp'] as boolean | undefined)
          : undefined,
        password: fromLogin
          ? (postData['password'] as string | undefined)
          : undefined,
        newpassword: fromLogin
          ? (postData['newpassword'] as string | undefined)
          : undefined,
        'x-access-token': user?.token,
        'resource-name': '',
      },
    };

    if (options?.buffer) {
      config.responseType = 'arraybuffer';
    }

    const response = await axios.post(url, postData, config);
    return response?.data;
  };

  const mutation = useMutation({
    mutationFn: postDataApi,
    onError: options?.onError,
    onSuccess: options?.onSuccess,
  });

  return mutation;
};

export default usePost;
