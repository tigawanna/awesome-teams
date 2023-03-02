import React from 'react';
import { Outlet } from "react-router-dom";
interface ContactLayoutProps {

}

export const ContactLayout= ({}:ContactLayoutProps) => {
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


