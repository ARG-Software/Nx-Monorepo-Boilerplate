import React from 'react';

interface Props {
  message?: string;
  embedded?: boolean;
}

export default function Spinner({ message, embedded }: Props) {
  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex items-center justify-center h-screen flex flex-col'>
        <div
          className={`${
            embedded ? 'w-6 h-6' : 'w-16 h-16'
          } border-4 border-blue-400 border-solid rounded-full animate-spin`}
          style={{ borderTopColor: 'transparent' }}
        ></div>
        <div className='py-2'>{message ? message : 'Fetching...'}</div>
      </div>
    </div>
  );
}
