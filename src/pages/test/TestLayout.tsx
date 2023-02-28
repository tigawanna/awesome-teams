import { Outlet } from "react-router-dom";
import { AppUser } from "../../utils/types/base";

interface TestLayoutProps {
user:AppUser
}

export const TestLayout = ({user}:TestLayoutProps) => {
return (
 <div className='w-full h-full flex items-center justify-center'>
    <Outlet/>
 </div>
);
}
