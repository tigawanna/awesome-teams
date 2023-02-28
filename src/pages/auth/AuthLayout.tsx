import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppUser } from '../../utils/types/base';

interface AuthLayoutProps {
  user: AppUser;
}

export const AuthLayout = ({user}: AuthLayoutProps) => {
  const navigate = useNavigate();
  // //no-console("user in auth layout ===", user)

  React.useEffect(() => {
    if (user) {
      if (user?.email && user?.isNew) {
        navigate('/profile')
      }
        navigate('/')
      }
  }, [user])


  return (
  <div className="w-full h-full bg-red-900">
    <Outlet />
  </div>
  )
}

