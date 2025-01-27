import React from 'react';
import Wrapper from '@/components/ComponentWrapper/ComponentWrapper';
import withAuth from '@/utils/withauth';

const About = () => {
  return (
    <React.Fragment>
      <Wrapper style='w-full min-h-[calc(100vh-60px)] bg-black'>
        <div className='w-full h-full py-6 md:py-12 pl-0 md:pl-10 lg:pl-12 max-w-[1600px] grid gap-8'>
          <p className='font-nunito text-[30px] tracking-[5px] font-black uppercase text-white'>
            about
          </p>
          <p className='text-2xl text-gray-300'>Template made by ARG Software</p>
          <p className='text-sm text-gray-300'>
            We transform bold business ideas into exceptional digital products. Are you searching
            for a partner who will take the process of software development off your hands? You’ve
            come to the right place. We ideate, design, and develop data-driven digital products
            that answer business challenges
          </p>
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default About;

export const getServerSideProps = withAuth(async _ => {
  return { props: {} };
});
