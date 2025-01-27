import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/constants';

const withAuth = gssp => async context => {
  const { resolvedUrl, req } = context;

  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};

  const token = cookies.Authorization;

  let isAuthenticated = false;
  let userData = null;

  if (token) {
    try {
      userData = jwt.verify(token, JWT_SECRET);
      isAuthenticated = true;
    } catch (error) {
      console.error('Token verification failed:', error);
      isAuthenticated = false;
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  }

  const notProtectedRoutes = ['/login', '/register'];

  if (!isAuthenticated && !notProtectedRoutes.includes(resolvedUrl)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (isAuthenticated && notProtectedRoutes.includes(resolvedUrl)) {
    return {
      redirect: {
        destination: '/users',
        permanent: false,
      },
    };
  }

  const result = await gssp(context);
  if (typeof result !== 'object') {
    throw new Error('`getServerSideProps` must return an object.');
  }

  return {
    ...result,
    props: {
      ...result.props,
      isAuthenticated,
      userData,
    },
  };
};

export default withAuth;
