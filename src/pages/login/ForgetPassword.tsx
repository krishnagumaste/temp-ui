'use client';
import { Button, Input, useToast } from 'hero-shad';
import React, { useCallback, useState } from 'react';
import usePost from '../../customHooks/usePostQueryHook';
import { forgetPasswordRegister } from '../../../apiConstants/urlConstants';
import { AxiosError } from 'axios';

interface NewUserDetails {
  email: string;
  password: string;
  newPassword: string;
}

interface ForgotPasswordProps {
  setShowForgetPassword: (value: boolean) => void;
  newUserFlag: boolean;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = props => {
  const { setShowForgetPassword, newUserFlag } = props;
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [newUserDetails, setNewUserDetails] = useState<NewUserDetails>({
    email: '',
    password: '',
    newPassword: '',
  });

  const onRegisterSuccess = () => {
    const message = !newUserFlag
      ? 'Your password has been successfully reset. Please check your email for the new password.'
      : 'Password reset successful!! Now login again with new password';
    toast({
      title: message,
      duration: 5000,
    });
    setIsLoading(false);
  };

  const onRegisterError = (error: unknown) => {
    if (error instanceof AxiosError) {
      const { response } = error;
      toast({
        title: response?.data?.message || 'Please try again..',
        variant: 'destructive',
        duration: 5000,
      });
    }
    setIsLoading(false);
  };

  const postRequest = {
    onSuccess: onRegisterSuccess,
    onError: onRegisterError,
    variables: {
      fromLogin: true,
    },
  };
  const forgetPasswordApi = usePost(forgetPasswordRegister, postRequest);

  const handleNewPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const new_pass = e.target.value;
      setNewUserDetails({ ...newUserDetails, newPassword: new_pass });
    },
    [newUserDetails]
  );

  const registerAccount = async () => {
    setIsLoading(true);
    const postApiReq = {
      postData: {
        username: userId,
        isSignUp: `${false}`,
      },
      fromLogin: true,
    };
    forgetPasswordApi.mutate(postApiReq);
  };

  const handleNewUser = async () => {
    setIsLoading(true);

    if (newUserDetails?.password === newUserDetails?.newPassword) {
      toast({
        title: 'New password cannot be the same as old password.',
        variant: 'destructive',
        duration: 5000,
      });

      return false;
    } else {
      const postApiReq = {
        postData: {
          username: newUserDetails?.email,
          password: newUserDetails?.password,
          newpassword: newUserDetails?.newPassword,
          isSignUp: `${true}`,
        },
        fromLogin: true,
      };
      forgetPasswordApi.mutate(postApiReq);
    }
  };

  const onBack = useCallback(() => {
    setShowForgetPassword(false);
  }, [setShowForgetPassword]);

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewUserDetails({ ...newUserDetails, email: e.target.value });
    },
    [newUserDetails]
  );

  const onChangeOldPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewUserDetails({ ...newUserDetails, password: e.target.value });
    },
    [newUserDetails]
  );

  const handleSetUSerId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserId(e.target.value);
    },
    []
  );

  return (
    <div className='flex items-center justify-center py-12'>
      <div className='flex justify-center items-center h-screen'>
        <div className='h-[478px] w-[464px]'>
          <Button
            onClick={onBack}
            className='mb-[30px]'
            data-testid='arrow-left-icon'
          >
            Back
          </Button>
          {!newUserFlag ? (
            <>
              {' '}
              <div className='mb-[30px]'>
                <h2 className='mb-[12px] text-[34px] font-bold leading-[40px]'>
                  Forgot Password
                </h2>
                <p className='text-[16px] font-normal leading-[24px]'>
                  Hello! Please enter your username or email to Autogenerate
                  passwords. Password will be sent to your registered email
                  address.
                </p>
              </div>
              <div>
                <Input
                  className='mb-[24px] rounded-none'
                  value={userId}
                  onChange={handleSetUSerId}
                  placeholder='Username or Email'
                />
              </div>
              <Button
                className='bg-[#0a2f50] w-full text-white font-medium text-[14px] h-[40px] rounded-none'
                onClick={registerAccount}
                disabled={isLoading || !userId}
              >
                Generate password
              </Button>{' '}
            </>
          ) : (
            <>
              <div className='mb-[30px]'>
                <h2 className='mb-[12px] text-[34px] font-bold leading-[40px]'>
                  Update Password
                </h2>
                <p className='text-[16px] font-normal leading-[24px]'>
                  Hello! Please enter credentials to generate new password.
                </p>
              </div>
              <div>
                <Input
                  value={newUserDetails?.email}
                  onChange={onChangeEmail}
                  placeholder='Username or Email'
                  className='mb-[24px] rounded-none'
                />
                <Input
                  type='password'
                  className='mb-[24px] rounded-none'
                  value={newUserDetails?.password}
                  onChange={onChangeOldPassword}
                  placeholder='Enter old password'
                />
                <Input
                  type='password'
                  className='mb-[24px] rounded-none'
                  value={newUserDetails?.newPassword}
                  onChange={handleNewPassword}
                  placeholder='Enter new password'
                />
              </div>

              <Button
                className='bg-[#0a2f50] w-full text-white font-medium text-[14px] h-[40px] rounded-none'
                onClick={handleNewUser}
                disabled={
                  isLoading ||
                  !newUserDetails?.email ||
                  !newUserDetails?.newPassword ||
                  !newUserDetails?.password
                }
              >
                Update Password
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
