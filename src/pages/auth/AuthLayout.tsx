import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { AppUser } from '../../utils/types/base';
import { useEffect } from 'react';


interface AuthLayoutProps {
  user: AppUser;
}

export const AuthLayout = ({user}: AuthLayoutProps) => {
  
  const [searchBarParams, setSearchBarParams] = useSearchParams();
  const navigate = useNavigate();
  const navigate_to = searchBarParams.get('callbackUrl')
  // console.log("navigate to ==== ",navigate_to)
  useEffect(() => {
    if (user?.email) {
      if (navigate_to) {
        if (navigate_to === '/auth'){
          navigate('/');
        }else{
          navigate(navigate_to)
        }
      }
      else {
        navigate(-1)
      }
    }
  }, [user?.email])

  if(user?.email){
    return (
    <div className="w-full h-full min-h-screen flex items-center justify-center text-lg font-bold">
      Already logged in 
    </div>
    )
  }

  return (
  <div className="w-full h-full">
    <Outlet />
  </div>
  )
}

