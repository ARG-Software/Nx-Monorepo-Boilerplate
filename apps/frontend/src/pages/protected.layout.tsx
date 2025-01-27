import React from 'react';
import Navibar from '@/components/Layout/Navibar';
import { useRouter } from 'next/router';

const ProtectedLayout = ({ children, user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const url = `/api/auth/logout`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      router.push('/login');
    }
  };

  return (
    <>
      <Navibar user={user} onLogout={handleLogout} />
      {children}
    </>
  );
};

export default ProtectedLayout;
