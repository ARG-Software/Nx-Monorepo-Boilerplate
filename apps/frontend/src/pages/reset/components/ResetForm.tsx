import Spinner from '@/components/Spinners/Spinner';
import { useGenerateResetPasswordCode } from '@/queries/auth/useRequestResetPasswordCode';
import { useResetPassword } from '@/queries/auth/useResetPassword';
import { ResetPasswordRequestDto } from '@nx-template/dtos';
import { FormEvent, useState } from 'react';

type ResetPasswordType = {
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
};

type ResetErrorsType = {
  code: string;
  email: string;
  password: string;
  confirmPassword: string;
  resetSubmit: string;
  resetSubmitCode: string;
};

const ResetForm = () => {
  const [resetPasswordDetails, setResetPasswordDetails] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    code: '',
  } as ResetPasswordType);
  const [step, setStep] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
    resetSubmitCode: '',
    resetSubmit: '',
  } as ResetErrorsType);
  const requestNewCodeForPasswordReset = useGenerateResetPasswordCode();
  const resetPassword = useResetPassword();
  const { isPending: resetPasswordPending } = resetPassword;
  const [isCodeRequestDisabled, setIsCodeRequestDisabled] = useState(false);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setResetPasswordDetails(prevState => ({ ...prevState, [name]: value }));
  };

  const handleRequestResetCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = validateEmailField();

    if (!valid) {
      return;
    }

    requestNewCodeForPasswordReset.mutate(
      { email: resetPasswordDetails.email },
      {
        onSuccess: () => {
          setIsCodeRequestDisabled(true);
          setStep('code');
        },
        onError: error => {
          setErrors({ ...errors, resetSubmitCode: error.message });
        },
      },
    );
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resetPasswordParameters: ResetPasswordRequestDto = {
      email: resetPasswordDetails.email,
      password: resetPasswordDetails.password,
      code: resetPasswordDetails.code,
    };

    const validEmail = validateEmailField();

    if (!validEmail) {
      return;
    }

    const valid = validateFormFields();

    if (!valid) {
      return;
    }

    resetPassword.mutate(
      { resetPasswordParameters },
      {
        onSuccess: () => {
          setStep('success');
        },
        onError: error => {
          setErrors(prevState => ({ ...prevState, resetSubmit: error.message }));
        },
      },
    );
  };

  const validateEmailField = () => {
    const { email } = resetPasswordDetails;

    if (!email) {
      setErrors(prevState => ({ ...prevState, email: 'Email is required' }));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrors(prevState => ({ ...prevState, email: 'Invalid email' }));
      return false;
    }

    return true;
  };

  const validateFormFields = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!resetPasswordDetails.code) {
      newErrors.code = 'Code is required';
      valid = false;
    } else {
      newErrors.code = '';
    }

    if (!resetPasswordDetails.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else {
      newErrors.password = '';
    }

    if (!resetPasswordDetails.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
      valid = false;
    } else {
      newErrors.confirmPassword = '';
    }

    if (resetPasswordDetails.password !== resetPasswordDetails.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  if (resetPasswordPending) {
    return <Spinner message='Resetting password...' />;
  }

  return (
    <>
      {step !== 'success' && (
        <>
          <p className='text-sm text-center mb-5'>
            Just let us know the email you use to sign in to Nx-template and we’ll send you a code
            to your email, so you can set a new password.
          </p>
          <form onSubmit={handleRequestResetCode} className='w-full max-w-sm space-y-6'>
            <div className='mb-5'>
              <label htmlFor='name' className='block text-sm text-gray-100'>
                Email
              </label>
              <input
                type='text'
                id='email'
                name='email'
                required
                disabled={isCodeRequestDisabled}
                className='mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white'
                value={resetPasswordDetails.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className='mt-1 text-white-500 text-xs italic'>{errors.email}</p>}
            </div>
            {!isCodeRequestDisabled && (
              <div>
                <button
                  type='submit'
                  className=' w-full flex justify-center mt-10 py-3 px-4 border border-black rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                >
                  Request reset password code
                </button>
                {errors.resetSubmitCode && (
                  <p className='mt-1 text-white-500 text-xs italic'>{errors.resetSubmitCode}</p>
                )}
              </div>
            )}
          </form>
        </>
      )}
      {step === 'code' && (
        <form onSubmit={handleResetPassword}>
          <div className='mt-5 mb-5'>
            <label htmlFor='code' className='block text-sm text-gray-100'>
              Code
            </label>
            <input
              type='number'
              id='code'
              name='code'
              required
              className='mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white'
              onChange={handleInputChange}
              value={resetPasswordDetails.code}
            />
            {errors.code && <p className='mt-1 text-white-500 text-xs italic'>{errors.code}</p>}
          </div>
          <div className='mb-5'>
            <label htmlFor='password' className='block text-sm text-gray-100'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              required
              className='mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white'
              value={resetPasswordDetails.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className='mt-1 text-white-500 text-xs italic'>{errors.password}</p>
            )}
          </div>
          <div className='mb-5'>
            <label htmlFor='confirmPassword' className='block text-sm text-gray-100'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              required
              className='mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white'
              value={resetPasswordDetails.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <p className='mt-1 text-white-500 text-xs italic'>{errors.confirmPassword}</p>
            )}
          </div>
          <div className='mb-5'>
            <button
              type='submit'
              className=' w-full flex justify-center mt-10 py-3 px-4 border border-black rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
            >
              Reset password
            </button>
          </div>
          {errors.resetSubmit && (
            <p className='mt-1 text-white-500 text-xs italic'>{errors.resetSubmit}</p>
          )}
        </form>
      )}
      {step === 'success' && (
        <div className='text-center'>
          <p className='text-white'>
            Password reset successfully. Go back to login page, and login again.
          </p>
        </div>
      )}
    </>
  );
};

export default ResetForm;
