import { Outlet } from "react-router-dom";
import { AppUser } from "../../types/base";

interface HomeLayoutProps {
user:AppUser
}

export const HomeLayout = ({user}:HomeLayoutProps) => {
return (
 <div className='w-full h-full flex items-center justify-center'>
    <Outlet/>
 </div>
);
}
