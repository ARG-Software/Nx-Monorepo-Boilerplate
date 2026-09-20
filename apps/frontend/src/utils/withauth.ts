import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

const withAuth = gssp => async context => {
  const { resolvedUrl, req } = context;

  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};

  const token = cookies.Authorization;

  let isAuthenticated = false;
  let userData = null;

  if (token) {
    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is required');
      }

      userData = jwt.verify(token, jwtSecret);
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
