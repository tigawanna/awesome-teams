import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';

import { OAuthLogin } from '../../components/auth/OAuthLogin';
import { AppUser } from '../../utils/types/base';
import {  useSearchParams } from 'react-router-dom';

interface LoginProps {
  // eslint-disable-next-line react/require-default-props
  user?: AppUser;
}

export const Login = ({user}: LoginProps) =>{ 
  
// const loaction  = useLocation()
const [searchBarParams, setSearchBarParams] = useSearchParams();
// console.log("callback url  === ",searchBarParams.get('callbackUrl'))

return (

<div
  className="w-full  min-h-screen h-full flex flex-col items-center justify-center dark:bg-black bg-white "
>
<div className='text-6xl font-bold border rounded-lg shadow p-5'>  
Login
</div>
<div className='w-full h-full flex flex-col items-center justify-center dark:bg-black bg-white '>
      was going to 
      {searchBarParams.get('callbackUrl')}
  </div>
</div>);}
