
import { Outlet } from "react-router-dom";
import { AppUser } from "../../utils/types/base";
interface PortalLayoutProps {
user:AppUser
}

export default function  PortalLayout({}:PortalLayoutProps){
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


