import { Outlet } from "react-router-dom";
import { AppUser } from "../../utils/types/base";
import { useAuthGuard } from './../../utils/hooks/useAuthGuard';

interface HomeLayoutProps {
user:AppUser
}

export const HomeLayout = ({user}:HomeLayoutProps) => {
useAuthGuard(user,false)
return (
 <div className='w-full h-full'>
    <Outlet/>
 </div>
);
}
