import { useRouter } from 'next/router';
import ResetForm from './components/ResetForm';

const ResetPasswordPage = () => {
  const router = useRouter();

  const handleGoBackToLogin = () => {
    router.push('/login');
  };

  return (
    <>
      <div className='flex flex-row  font-nunito min-h-screen bg-nx-template-purple-blueish'>
        <div
          className='flex-grow min-h-screen bg-cover'
          style={{ backgroundImage: 'url(/assets/nx-template.jpg)' }}
        ></div>

        <div className='w-full max-w-md p-8 bg-nx-template-purple-blueish h-full min-h-screen'>
          <div className='w-full justify-center flex mt-10 mb-10'>
            <img src='/assets/logo.svg' alt='Nx-template Login' width={250} height={250} />
          </div>
          <h2 className='text-center font-bold text-gray-100 text-xl mb-5'>Reset password</h2>

          <ResetForm />

          <p className='text-sm text-center mt-5'>
            Take me back to{' '}
            <a href='#' onClick={handleGoBackToLogin} className='text-blue-500 hover:text-blue-600'>
              login
            </a>
            .
          </p>

          <div className='flex justify-center'>
            <p className='text-center absolute bottom-0 mb-2 text-xs text-gray-300 mt-5'>2024</p>
          </div>
        </div>

        <div
          className='flex-grow bg-cover min-h-screen'
          style={{ backgroundImage: 'url(/assets/nx-template.jpg)' }}
        ></div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
