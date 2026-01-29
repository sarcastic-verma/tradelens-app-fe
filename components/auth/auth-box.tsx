'use client';

import { useRouter } from 'next/navigation';

import { SocialButton } from '@/components/auth/social-button';

export const AuthBox = ({ type }: { type: 'signup' | 'login' }) => {
  const router = useRouter();

  return (
    <div className='h-full text-white w-full pt-0 md:pt-5 px-5 pb-2 md:pb-5 flex items-center flex-col justify-center'>
      <div className='text-lg md:text-3xl flex'>
        <div className='font-light'>          
          {type !== 'signup'
            ? "It's time to "
            : 'Get started for free with '}
        </div>
        <div className='pl-1 md:pl-2 font-bold cursor-pointer' onClick={() => router.push('/')}>
          tradelens
        </div>
      </div>

      <div className='text-md md:text-lg font-light mt-5 md:mt-10 mb-5'>
        Lets make trading trustable!!
      </div>
      <div className='w-[85%] sm:w-[55%] lg:w-[35%] flex flex-col items-center mt-6 space-y-5'>
        <SocialButton authType='Google' />        
        <SocialButton authType='Apple' />
      </div>
      <div className='text-md md:text-lg font-extralight mt-5 md:mt-10 mb-5 flex'>
        {type === 'signup' ? 'Have account?' : 'No account?'}
        <div
          className='pl-2 underline cursor-pointer'
          onClick={() => router.push(type === 'signup' ? '/login' : '/signup')}
        >
          {type === 'signup' ? 'Login now' : 'Create account'}
        </div>
      </div>
    </div>
  );
};
