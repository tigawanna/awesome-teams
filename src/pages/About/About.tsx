import React from 'react';
import { AppUser } from '../../utils/types/base';

interface AboutProps {
user:AppUser
}

export const About= ({}:AboutProps) => {
  return (
    <div className='w-full h-full'>
      About component
    </div>
  );
};


