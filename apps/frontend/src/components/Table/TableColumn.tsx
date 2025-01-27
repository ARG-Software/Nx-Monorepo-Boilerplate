import React from 'react';

interface Props {
  gridCols: string;
  isCheckBox?: boolean;
  showFavIcon?: boolean;
  columnItems: {
    type: string;
  }[];
}

const TableColumn = ({ gridCols, columnItems, showFavIcon = true }: Props) => {
  return (
    <div
      className={`w-full min-w-[1280px] h-20 bg-nx-template-blueish-night grid ${gridCols} gap-2 ${
        showFavIcon ? '' : 'px-7'
      } rounded-[3px]`}
    >
      {columnItems.map((item, index) => {
        return (
          <button key={index} className={`w-full flex justify-center items-center`}>
            <p className='text-nx-template-bright-purple-grey font-black text-[14px] font-incon uppercase tracking-[3px]'>
              {item.type}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default TableColumn;
