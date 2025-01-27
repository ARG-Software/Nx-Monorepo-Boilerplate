import { FormEvent, useEffect, useState } from 'react';
import { useUserRegistration } from '@/queries/auth/useUserRegistration';
import { useRouter } from 'next/router';
import { useValidateCode } from '@/queries/auth/useValidateCode';
import Spinner from '@/components/Spinners/Spinner';
import { useRequestNewCode } from '@/queries/auth/useRequestNewCode';

type RegisterUserDetailsType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterErrorsType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
  register: string;
};

const RegisterForm = () => {
  const [step, setStep] = useState('register');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  } as RegisterUserDetailsType);
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    code: '',
  } as RegisterErrorsType);
  const [lastCodeRequestedAt, setLastCodeRequestedAt] = useState(null);
  const [isCodeRequestDisabled, setIsCodeRequestDisabled] = useState(false);

  const [userEmail, setUserEmail] = useState('');

  const registerUser = useUserRegistration();

  const { isPending: registerPending } = registerUser;

  const validateUser = useValidateCode();

  const { isSuccess: validateUserSuccess, isPending: validateUserPending } = validateUser;

  const requestNewCode = useRequestNewCode();

  const router = useRouter();

  const routerParams = router.query;

  useEffect(() => {
    if (routerParams && routerParams.email) {
      setUserEmail(routerParams.email.toString());
      setStep('confirm');
    }

    awaitCodeRequest();

    if (validateUserSuccess) {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [routerParams, lastCodeRequestedAt, validateUserSuccess]);

  const awaitCodeRequest = async () => {
    if (lastCodeRequestedAt) {
      const timerId = setTimeout(() => {
        setIsCodeRequestDisabled(false);
      }, 60000);

      return () => {
        clearTimeout(timerId);
      };
    }
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserDetails(prevState => ({ ...prevState, [name]: value }));
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateRegisterFields(userDetails);
    if (Object.values(newErrors).some(err => err)) {
      setErrors(newErrors);
      return;
    }

    registerUser.mutate(
      { registrationParameters: userDetails },
      {
        onError: async (error: Error) => {
          setErrors({ ...errors, register: error.message });
        },
        onSuccess: async () => {
          setUserEmail(userDetails.email);
          setStep('confirm');
        },
      },
    );
  };

  const handleCodeConfirmation = async event => {
    event.preventDefault();
    if (!code) {
      setErrors({ ...errors, code: 'Confirmation code is required' });
      return;
    }

    validateUser.mutate(
      { validationCodeParameters: { code, email: userEmail } },
      {
        onError: async (error: Error) => {
          setErrors({ ...errors, code: error.message });
        },
      },
    );
  };

  const handleRequestNewCode = async event => {
    event.preventDefault();
    requestNewCode.mutate(
      { email: userEmail },
      {
        onError: async (error: Error) => {
          setErrors({ ...errors, code: error.message });
        },
        onSuccess: async () => {
          setLastCodeRequestedAt(new Date());
          setIsCodeRequestDisabled(true);
        },
      },
    );
  };

  const handleRedirectToLogin = event => {
    event.preventDefault();
    router.push('/login');
  };

  const validateRegisterFields = (fields: RegisterUserDetailsType) => {
    const errors: RegisterErrorsType = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      code: '',
      register: '',
    };
    // Name validation
    if (!fields.name.trim()) {
      errors.name = 'Name is required';
    }
    // Email validation
    if (!fields.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      errors.email = 'Email is invalid';
    }
    // Password validation
    if (!fields.password) {
      errors.password = 'Password is required';
    } else if (fields.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    // Confirm password validation
    if (!fields.confirmPassword) {
      errors.confirmPassword = 'Confirming password is required';
    } else if (fields.password !== fields.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  if (registerPending) {
    return <Spinner message='Registering...' />;
  }

  if (validateUserPending) {
    return <Spinner message='Validating user...' />;
  }

  if (validateUserSuccess) {
    // pass a message to the login page
    return (
      <Spinner message='Redirecting you to the login page, please login with your new account' />
    );
  }

  return (
    <>
      {step === 'register' && (
        <>
          <form onSubmit={handleRegister} className='w-full max-w-sm space-y-6'>
            <div className='mb-8'>
              <label htmlFor='name' className='block text-sm text-gray-100'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                required
                className='mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white'
                value={userDetails.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className='mt-1 text-white-500 text-xs italic'>{errors.name}</p>}
            </div>
            <div className='mb-8'>
              <label htmlFor='email' className='block text-sm text-gray-100'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                required
                className='mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white'
                value={userDetails.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className='mt-1 text-white-500 text-xs italic'>{errors.email}</p>}
            </div>
            <div className='mb-8'>
              <label htmlFor='password' className='block text-sm text-gray-100'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                required
                className='mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white'
                value={userDetails.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <p className='mt-1 text-white-500 text-xs italic'>{errors.password}</p>
              )}
            </div>
            <div className='mb-8'>
              <label htmlFor='confirmPassword' className='block text-sm text-gray-100'>
                Confirm Password
              </label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                required
                className='mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white'
                value={userDetails.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <p className='mt-1 text-white-500 text-xs italic'>{errors.confirmPassword}</p>
              )}
            </div>
            <div className='mb-8'>
              <button
                type='submit'
                className=' w-full flex justify-center mt-10 py-3 px-4 border border-black rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
              >
                Register
              </button>
            </div>
            {errors.register && (
              <p className='mt-1 text-red-500 text-xs italic'>{errors.register}</p>
            )}
          </form>
          <p className='mt-5 text-sm text-center text-gray-300'>
            Already have an account?{' '}
            <a
              href='#'
              onClick={e => handleRedirectToLogin(e)}
              className='text-blue-400 hover:text-blue-600'
            >
              Login instead.
            </a>
          </p>
        </>
      )}

      {step === 'confirm' && (
        <>
          <form onSubmit={handleCodeConfirmation} className='w-full max-w-sm mt-20'>
            <div>
              <label htmlFor='code' className='block text-sm text-gray-100'>
                Confirmation Code
              </label>
              <input
                type='text'
                id='code'
                name='code'
                required
                className='mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white'
                onChange={event => setCode(event.target.value)}
                value={code}
              />
            </div>
            <button
              type='submit'
              className='w-full flex justify-center py-3 px-4 mt-10 border border-black rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
            >
              Confirm Registration Code
            </button>
            <p className='mt-10 text-sm text-gray-300'>
              If you don&apos;t find it, check your spam folder.
            </p>
            {isCodeRequestDisabled && (
              <p className='mt-5 text-sm text-gray-300'>
                A new code can be requested in 60 seconds.
              </p>
            )}
            {!isCodeRequestDisabled && (
              <p className='mt-5 text-sm text-gray-300'>
                Didn&apos;t get a code?{' '}
                <a
                  href='#'
                  onClick={e => handleRequestNewCode(e)}
                  className='text-blue-400 hover:text-blue-600'
                >
                  Request a new one.
                </a>
              </p>
            )}
            {errors.code && <p className='mt-1 text-red-500 text-xs italic'>{errors.code}</p>}
          </form>
        </>
      )}
    </>
  );
};

export default RegisterForm;
