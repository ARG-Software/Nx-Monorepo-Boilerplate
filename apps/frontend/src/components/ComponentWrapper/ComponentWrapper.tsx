import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  style?: string;
}

const Wrapper = ({ style, children }: Props) => {
  return (
    <div className={`w-full ${style}`}>
      <div className='w-full h-full m-auto md:px-8 px-4 flex justify-center'>{children}</div>
    </div>
  );
};

export default Wrapper;
