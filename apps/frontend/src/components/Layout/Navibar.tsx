'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Drawer } from '@mui/material';
import { IconButton } from '@mui/material';
import { Spin as Hamburger } from 'hamburger-react';

import React, { useState } from 'react';

import Wrapper from '../ComponentWrapper/ComponentWrapper';
import * as Icons from '../Icons/Icons';

import { Data } from '../../../Data/Data';

const Navibar = ({ user, onLogout }) => {
  const Router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='w-full bg-nx-template-dark-blue h-[60px] z-10'>
      <Wrapper style='w-full bg-nx-template-purple-blueish navibarShap h-full navibarShap'>
        <div className='w-full h-full flex justify-between items-center max-w-[1600px] md:px-8 px-4'>
          <div className='hidden md:flex gap-10 lg:gap-40 justify-center items-center'>
            <div className={' w-[160px] h-[43px] relative'}>
              <Link href='/users'>
                <Image
                  src='/assets/logo.svg'
                  fill
                  alt='nx-template-logo'
                  className='object-contain'
                />
              </Link>
            </div>
            <div className='flex justify-center items-center gap-6 lg:gap-14'>
              {Data.navibar.map((item, index) => {
                return (
                  <Link key={index} href={item.path}>
                    <p
                      className={`font-rajd text-[17px] font-semibold uppercase tracking-[3px] cursor-pointer ${
                        Router.pathname === item.path
                          ? 'text-nx-template-medim-green'
                          : 'text-nx-template-pinky'
                      }`}
                    >
                      {item.name}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className='hidden md:flex justify-center items-center gap-6'>
            <>
              <div className='flex font-incon tracking-[1px] sm:text-[18px] font-semibold uppercase px-2'>
                <div>
                  Hi, <span className='text-nx-template-pinky'>{user?.userName}</span>{' '}
                </div>
              </div>
              <div className='flex font-incon tracking-[1px] sm:text-[18px] font-semibold uppercase px-2'>
                <a href='#' onClick={onLogout}>
                  Logout
                </a>
              </div>
            </>
          </div>

          <div className='md:hidden w-full flex justify-end items-center'>
            <Hamburger color='#6A6A9F' rounded size={34} toggled={isOpen} toggle={setIsOpen} />
            <Drawer
              sx={{
                '& .MuiPaper-root': {
                  width: '100%',
                  background: '#202040',
                },
              }}
              transitionDuration={500}
              anchor='right'
              open={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <div className='w-full flex flex-col gap-10 items-start px-4 py-6'>
                <div className='w-full flex justify-between items-center'>
                  <Image
                    src='assets/logo.svg'
                    width={150}
                    height={80}
                    alt=''
                    className='object-contain'
                  />
                  <IconButton onClick={() => setIsOpen(false)} sx={{ p: 0 }}>
                    <Icons.Cross fill='#ffffff' ClassName='w-[48px] h-[48px]' />
                  </IconButton>
                </div>
                <div className='w-full grid grid-cols-[2fr,.4fr] gap-2'>
                  <div className='w-full grid grid-cols-[0.1fr,1fr] border-[2px] border-nx-template-purple-blue h-[45px] justify-center items-center px-2 rounded-[6px]'>
                    <Icons.Search fill='#6A6A9F' ClassName='w-[20px] h-[20px]' />
                    <input
                      type='text'
                      placeholder='search'
                      className='w-full h-full outline-none bg-transparent px-1 rounded-[6px] placeholder:font-rajd placeholder:text-[18px] placeholder:text-nx-template-purple-blue placeholder:font-semibold font-rajd text-[18px] text-white font-semibold'
                    />
                  </div>
                  <div className='w-full flex justify-center items-center'>
                    <Icons.Account fill='#6A6A9F' ClassName='w-[34px] h-[34px]' />
                  </div>
                </div>
                <div className='flex flex-col justify-center items-start gap-6 pl-4'>
                  {Data.navibar.map((item, index) => {
                    return (
                      <Link key={index} href={item.path}>
                        <p
                          className={`font-rajd text-[24px] font-semibold uppercase tracking-[3px] ${
                            Router.pathname === item.path
                              ? 'text-nx-template-medim-green'
                              : 'text-nx-template-pinky'
                          }`}
                        >
                          {item.name}
                        </p>
                      </Link>
                    );
                  })}
                </div>
                <div className='w-full flex gap-8 justify-center items-center'>
                  {LeftNavigationIcon.map((item, index) => {
                    return (
                      <IconButton key={index} color='primary'>
                        {item.icon}
                      </IconButton>
                    );
                  })}
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

const LeftNavigationIcon = [
  {
    icon: <Icons.Strategy fill='#FF00B2' ClassName='w-[32px] h-[32px]' />,
  },
  {
    icon: <Icons.Star fill='#FF00B2' ClassName='w-[32px] h-[32px]' />,
  },
  {
    icon: <Icons.OrderHistory fill='#FF00B2' ClassName='w-[32px] h-[32px]' />,
  },
  {
    icon: <Icons.PluginAPi fill='#00FF17' ClassName='w-[32px] h-[32px]' />,
  },
];

export default Navibar;
