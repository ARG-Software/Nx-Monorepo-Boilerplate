import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  gridCols: string;
  style?: string;
  px?: string;
}

const TableRow = ({
  children,
  gridCols,
  px,
  style = 'bg-nx-template-blueish-night h-[60px] sm:h-[70px] ',
}: Props) => {
  return (
    <div
      className={`w-full min-w-[1280px] grid ${gridCols} gap-2 ${style} ${px} rounded-[3px] justify-center items-center`}
    >
      {children}
    </div>
  );
};

export default TableRow;
