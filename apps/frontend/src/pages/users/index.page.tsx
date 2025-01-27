import React from 'react';
import Wrapper from '@/components/ComponentWrapper/ComponentWrapper';
import withAuth from '@/utils/withauth';
import { useGetUsersList } from '@/queries/users/useGetUsersList';
import Spinner from '@/components/Spinners/Spinner';
import UsersList from './components/UsersList';

const Users = () => {
  const usersList = useGetUsersList();

  if (usersList.isLoading) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      <Wrapper style='w-full min-h-[calc(100vh-60px)] bg-black'>
        <div className='w-full h-full py-6 md:py-12 pl-0 md:pl-10 lg:pl-12 max-w-[1600px]'>
          <UsersList usersList={usersList.data} />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default Users;

export const getServerSideProps = withAuth(async _ => {
  return { props: {} };
});
