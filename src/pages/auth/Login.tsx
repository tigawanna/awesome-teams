import { AppUser } from '../../utils/types/base';
import {  useSearchParams } from 'react-router-dom';

interface LoginProps {
  user?: AppUser;
}

export const Login = ({user}: LoginProps) =>{ 
const [searchBarParams, setSearchBarParams] = useSearchParams();

return (

<div
  className="w-full min-h-screen  bg-blue-800 h-full 
  flex flex-col items-center justify-center  ">

<div className='text-6xl font-bold border rounded-lg shadow p-5'>  
Login
</div>

<div className=' text-lg p-3 w-full h-full 
  flex flex-col items-center justify-center dark:bg-black bg-white '>
      was going to {" "}
      {searchBarParams.get('callbackUrl')}
  </div>
</div>

)}
