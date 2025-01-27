import React, { FormEvent, useEffect, useState } from 'react';
import { useUserLogin } from '@/queries/auth/useUserLogin';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinners/Spinner';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHuman, setIsHuman] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    isHuman: '',
    login: '',
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const useLogin = useUserLogin();

  const { data: loginData, isSuccess: loginSuccess, isPending: loginPending } = useLogin;

  const router = useRouter();

  useEffect(() => {
    if (isLoggingIn && loginSuccess) {
      const timer = setTimeout(() => {
        router.push('/users');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoggingIn]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
      isHuman: '',
      login: '',
    };

    if (!email.trim()) {
      newErrors.email = 'Username is required';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    if (!isHuman) {
      newErrors.isHuman = 'You must verify that you are not a robot';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      useLogin.mutate(
        { authenticationParameters: { email: email, password } },
        {
          onError: async (error: Error) => {
            console.log(error);
            setErrors({ ...errors, login: error.message });
          },
        },
      );
    }
  };

  const goToRegisterPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push('/register');
    return <Spinner message='Going to registration page...' />;
  };

  if (loginPending) {
    return <Spinner message='Login in...' />;
  }

  if (isLoggingIn) {
    return <Spinner message='Logging in...' />;
  }

  if (loginSuccess) {
    if (loginData?.isVerified === true) {
      setIsLoggingIn(true);
    } else {
      router.push('/register?email=' + email);
    }
  }

  return (
    <>
      <p className='text-center text-gray-300 mb-10 text-sm'>
        Don&apos;t have an account? Please{' '}
        <a href='#' onClick={goToRegisterPage} className='text-blue-400 hover:text-blue-600'>
          click here
        </a>{' '}
        to create a new one.
      </p>
      <form onSubmit={handleSubmit} className='w-full'>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm text-gray-100'>
            Email
          </label>
          <input
            type='text'
            id='email'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white'
            required
          />
          {errors.email && <p className='text-red-500 text-xs italic'>{errors.email}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-sm text-gray-100'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white'
            required
          />
          {errors.password && <p className='text-white-500 text-xs italic'>{errors.password}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='human-check' className='flex items-center text-sm text-gray-100' />
          <input
            type='checkbox'
            id='human-check'
            checked={isHuman}
            onChange={e => setIsHuman(e.target.checked)}
            className='mr-2'
          />
          Verify that I&apos;m human
          {errors.isHuman && <p className='text-white-500 text-xs italic'>{errors.isHuman}</p>}
        </div>
        <button
          type='submit'
          className='w-full flex justify-center py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
        >
          Log in
        </button>
        {errors.login && <p className='text-white-500 text-xs italic'>{errors.login}</p>}
      </form>
    </>
  );
};

export default LoginForm;
