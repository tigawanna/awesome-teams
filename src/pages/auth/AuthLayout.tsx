import React from 'react';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { AppUser } from '../../utils/types/base';
import { useLocation } from 'react-router-dom';

interface AuthLayoutProps {
  user: AppUser;
}

export const AuthLayout = ({user}: AuthLayoutProps) => {
  const navigation = useNavigation();

  
  // console.log(navigation.location)
  //no-console("user in auth layout ===", user)
  // console.log("AUTH LAYOUT +++++>>>>> ",useLocation()) 
  // React.useEffect(() => {
  //   if (user) {
  //     if (user?.email && user?.isNew) {
  //       navigate('/profile')
  //     }
  //       navigate('/')
  //     }
  // }, [user])


  return (
  <div className="w-full h-full bg-red-900">
    <Outlet />
  </div>
  )
}

