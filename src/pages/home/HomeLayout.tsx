import { Outlet } from "react-router-dom";
import { useDocumentTitle } from "../../utils/hooks/useDocumentTitle";
import { AppUser } from "../../utils/types/base";
import { useAuthGuard } from './../../utils/hooks/useAuthGuard';

interface HomeLayoutProps {
user:AppUser
}

export const HomeLayout = ({user}:HomeLayoutProps) => {
useAuthGuard(user,false)
useDocumentTitle('Home')
return (
 <div className='w-full  h-full'>
    <Outlet/>
 </div>
);
}
