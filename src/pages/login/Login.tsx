import React, { useEffect, useState } from 'react';
import { Button, Input, useToast } from 'hero-shad';
import MareanaImg from '../../assets/images/mareana.svg';
import MicrosoftImg from '../../assets/images/microsoft-icon.svg';
import SSOImg from '../../assets/images/sso-icon.svg';
import { useAuth } from '../../customHooks/useAuth';
import { useNavigate } from 'react-router';
import { APP_URL, authenticationUrl } from '../../../apiConstants/urlConstants';
import { useGetQuery } from '../../customHooks/useGetQueryHook';
import { AxiosError } from 'axios';
import { ForgotPassword } from './ForgetPassword';

const Login = () => {
  const [loginDetail, setLoginDetails] = useState({
    email: '',
    password: '',
    keepChecked: false,
  });
  const [isLogging, setIsLogging] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const [newUserFlag, setNewUserFlag] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const headers = {
    password: loginDetail?.password,
    username: loginDetail?.email,
  };
  const reqUrl = {
    url: authenticationUrl,
    queryKey: 'token',
    loginDetail: headers,
  };
  const loginAuthentication = useGetQuery(reqUrl);
  const navigate = useNavigate();
  const { toast } = useToast();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({ ...loginDetail, email: e.target.value });
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({
      ...loginDetail,
      password: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!loginDetail?.email) {
      toast({
        title: 'Please enter user Id',
        variant: 'destructive',
        duration: 5000,
      });
      return false;
    } else if (!loginDetail?.password) {
      toast({
        title: 'Please enter password',
        variant: 'destructive',
        duration: 5000,
      });
      return false;
    }

    try {
      setIsLogging(true);
      const { isSuccess, data, error } = await loginAuthentication.refetch();
      if (isSuccess && data?.status === 200) {
        // setting first time login true
        navigate('/');
        localStorage.setItem('firstTimeLogin', 'true');
        // checking for new user
      } else if (data?.status === 206) {
        setNewUserFlag(true);
        setShowForgetPassword(true);
      } else if (error instanceof AxiosError) {
        const { response } = error;
        if (response?.status === 403) {
          toast({
            title: response.data.message,
            variant: 'destructive',
            duration: 5000,
          });
        } else if (response?.status === 305) {
          // checking for password expired status
          toast({
            title: response.data.message,
            variant: 'destructive',
            duration: 5000,
          });
          setNewUserFlag(true);
          setShowForgetPassword(true);
        } else {
          toast({
            title: response?.data?.message,
            variant: 'destructive',
            duration: 5000,
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setIsLogging(false);
    }
  };

  //authenticating Microsoft Login
  const onMicrosoftLogin = async () => {
    window.open(
      `/auth/login?is_ui=True&base_url=${APP_URL}&redirect_url=${APP_URL}/`,
      '_self'
    );
  };

  const onClickForgotPassword = () => {
    setNewUserFlag(false);
    setShowForgetPassword(true);
  };

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate('/');
      }
    }
  }, [isLoading, isAuthenticated, navigate]);

  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
      <div className='hidden bg-muted lg:block'>
        <img
          className='h-full w-full object-cover'
          src={MareanaImg}
          alt='Mareana'
        />
      </div>

      {showForgetPassword ? (
        <ForgotPassword
          newUserFlag={newUserFlag}
          setShowForgetPassword={setShowForgetPassword}
        />
      ) : (
        <div className='flex items-center justify-center py-12'>
          <div className='h-screen flex items-center justify-center relative'>
            <img
              src='/path/to/image'
              alt='Side Image'
              className='w-full h-screen object-cover absolute top-0 left-0'
            />
          </div>

          <div className='flex justify-center items-center h-screen'>
            <div className='h-[478px] w-[464px]'>
              <div className='mb-[30px]'>
                <h2 className='mb-[12px] text-[34px] font-bold leading-[40px]'>
                  Login
                </h2>
                <p className='text-[16px] font-normal leading-[24px]'>
                  Welcome back! Please enter your details and login to your
                  account
                </p>
              </div>

              <div className='mb-[30px] flex justify-between gap-[8px]'>
                <Button
                  variant='outline'
                  onClick={onMicrosoftLogin}
                  className='w-full h-[40px] flex items-center gap-[12px] rounded-none'
                >
                  <span>
                    <img
                      src={MicrosoftImg}
                      alt='microsoft-icon'
                      height={20}
                      width={20}
                    />
                  </span>
                  Microsoft
                </Button>
                <Button
                  disabled
                  className='w-full h-[40px] flex items-center gap-[12px] rounded-none'
                >
                  <span>
                    <img src={SSOImg} alt='sso-icon' height={20} width={20} />
                  </span>
                  SSO
                </Button>
              </div>

              <div className='mb-[30px] flex items-center justify-between'>
                <div className='w-[214px] h-[1px] bg-[#d3dae6]' />
                <p className='text-[#69707d] font-normal leading-[20px]'>Or</p>
                <div className='w-[214px] h-[1px] bg-[#d3dae6]' />
              </div>

              <div>
                <Input
                  className='mb-[24px] rounded-none'
                  value={loginDetail?.email}
                  onChange={onChangeEmail}
                  placeholder='User Id'
                />

                <Input
                  type='password'
                  className='mb-[24px] rounded-none'
                  value={loginDetail?.password}
                  onChange={onChangePassword}
                  placeholder='Password'
                />
              </div>

              <div className='mb-[30px] flex justify-between items-center text-[14px]'>
                {/* <CheckboxInput text="Keep me logged in" /> */}
                <p
                  onClick={onClickForgotPassword}
                  className='text-[#0071c2] font-medium leading-[20px] cursor-pointer'
                >
                  Forgot password?
                </p>
              </div>

              <Button
                className='w-full font-medium text-[14px] h-[40px] rounded-none'
                disabled={isLogging}
                onClick={handleLogin}
                loading={isLogging}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
