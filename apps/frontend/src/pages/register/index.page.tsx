import React from 'react';
import RegisterForm from './components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className='min-h-screen flex font-nunito items-stretch'>
      <div
        className='flex-grow-2 flex flex-col items-center justify-center bg-nx-template-purple-blueish'
        style={{ flex: 3, zIndex: 1 }}
      >
        <div className='w-full  h-full max-w-sm mt-4 mb-0'>
          <div className='w-full justify-center flex mt-20 mb-12'>
            <img src='/assets/logo.svg' alt='Nx-template Login' width={250} height={250} />
          </div>
          <h2 className='text-center font-bold text-gray-100 text-xl mb-5'>
            Let&apos;s get your account setup
          </h2>
          <RegisterForm />
          <div className='flex justify-center'>
            <p className='text-center absolute bottom-0 mb-20 text-xs text-gray-300 mt-5'>2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
