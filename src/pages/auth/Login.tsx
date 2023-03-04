import { LoginForm } from '../../components/auth/LoginForm';
import { AppUser } from '../../utils/types/base';
import {  useSearchParams } from 'react-router-dom';

interface LoginProps {
  user?: AppUser;
}

export const Login = ({user}: LoginProps) =>{ 
const [searchBarParams, setSearchBarParams] = useSearchParams();

return (

<div
  className="w-full min-h-screen   h-full 
  flex flex-col items-center justify-center  ">
<LoginForm/>
</div>

)}
