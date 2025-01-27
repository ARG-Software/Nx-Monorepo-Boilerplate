import React from 'react';
import TableColumn from '@/components/Table/TableColumn';
import TableRow from '@/components/Table/TableRow';
import { Typography } from '@/components/Typography/Typography';
import { Data } from '../../../../Data/Data';
import { usersListDTO } from '@/queries/users/useGetUsersList';

interface Props {
  usersList: usersListDTO[];
}

const UsersList = ({ usersList }: Props) => {
  return (
    <React.Fragment>
      <div className='flex flex-col gap-6 sm:gap-8'>
        <p className='font-nunito text-[30px] tracking-[5px] font-black uppercase text-white'>
          registered users
        </p>

        <div className='w-full overflow-auto flex flex-col gap-2'>
          <TableColumn columnItems={Data.usersPage.columnData} gridCols='grid-cols-3' />

          {usersList.map((user, index) => {
            return (
              <TableRow key={index} gridCols='grid-cols-3'>
                <div className='w-full flex justify-center items-center'>
                  <Typography.Text2 className='text-nx-template-new-green'>
                    {user.name}
                  </Typography.Text2>
                </div>
                <div className='w-full flex justify-center items-center'>
                  <Typography.Text2 className='text-nx-template-new-green'>
                    {user.email}
                  </Typography.Text2>
                </div>
                <div className='w-full flex justify-center items-center'>
                  <Typography.Text2 className='text-nx-template-new-green'>
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    }).format(new Date(user.createdAt))}
                  </Typography.Text2>
                </div>
              </TableRow>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UsersList;
