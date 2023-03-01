import { Outlet } from "react-router-dom";
import { AppUser } from "../../utils/types/base";

interface HomeLayoutProps {
user:AppUser
}

export const HomeLayout = ({user}:HomeLayoutProps) => {
return (
 <div className='w-full'>
    <Outlet/>
 </div>
);
}
