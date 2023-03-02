import { Outlet } from "react-router-dom";
import { AppUser } from "../../utils/types/base";
import { useAuthGuard } from "../../utils/hooks/useAuthGuard";

interface TestLayoutProps {
user:AppUser
}

export const TestLayout = ({user}:TestLayoutProps) => {
useAuthGuard(user,false)
return (
 <div className='w-full h-full flex items-center justify-center'>
    <Outlet/>
 </div>
);
}
