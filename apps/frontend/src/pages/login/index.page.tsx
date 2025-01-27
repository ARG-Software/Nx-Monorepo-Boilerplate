import React from 'react';
import LoginForm from './components/LoginForm';
import withAuth from '@/utils/withauth';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();

  const handleResetPasswordClick = e => {
    e.preventDefault();
    router.push('/reset');
  };

  return (
    <div className='min-h-screen flex font-nunito items-stretch'>
      <div
        className='flex-grow-2 flex flex-col items-center justify-center bg-nx-template-purple-blueish'
        style={{ flex: 2, zIndex: 1 }}
      >
        <div className='w-full  h-full max-w-sm mt-4 mb-0'>
          <div className='w-full justify-center flex mt-20 mb-20'>
            <img src='/assets/logo.svg' alt='Nx-template Login' width={250} height={250} />
          </div>
          <LoginForm />
          <div className='justify-center mt-10'>
            <p className='text-sm text-gray-300 text-center'>
              Forgot your password?{' '}
              <a
                href='#'
                onClick={handleResetPasswordClick}
                className='text-blue-400 hover:text-blue-600'
              >
                Click here
              </a>
            </p>
          </div>
          <div className='flex justify-center'>
            <p className='text-center absolute bottom-0 mb-20 text-xs text-gray-300 mt-20'>2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

export const getServerSideProps = withAuth(async _ => {
  return { props: {} };
});
