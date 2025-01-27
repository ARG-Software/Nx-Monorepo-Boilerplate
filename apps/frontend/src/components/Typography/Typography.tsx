import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

function H1Heading({ children, className }: Props) {
  return (
    <p
      className={`font-nunito leading-[31px] text-[30px] tracking-[5px] font-black uppercase ${className}`}
    >
      {children}
    </p>
  );
}

function H2Heading({ children, className }: Props) {
  return (
    <p
      className={`font-nunito font-black uppercase leading-[30px] text-[20px] tracking-[1.5px] ${className}`}
    >
      {children}
    </p>
  );
}

function Text1({ children, className }: Props) {
  return (
    <p
      className={`font-rajd tracking-[3px] uppercase font-semibold text-[15px] sm:text-[17px] ${className}`}
    >
      {children}
    </p>
  );
}

function Text2({ children, className }: Props) {
  return (
    <p className={`font-nunito uppercase font-semibold text-[14px] sm:text-[16px] ${className}`}>
      {children}
    </p>
  );
}

function Text3({ children, className }: Props) {
  return (
    <p
      className={`font-rajd tracking-[1px] uppercase font-bold text-[12px] sm:text-[15px] ${className}`}
    >
      {children}
    </p>
  );
}

function Text4({ children, className }: Props) {
  return (
    <p className={`font-incon tracking-[1px] text-[15px] sm:text-[18px] ${className}`}>
      {children}
    </p>
  );
}

export const Typography = {
  H1: H1Heading,
  H2: H2Heading,
  Text1,
  Text2,
  Text3,
  Text4,
};
