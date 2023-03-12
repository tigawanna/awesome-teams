
import { Outlet } from "react-router-dom";
interface PortalLayoutProps {

}

export const PortalLayout= ({}:PortalLayoutProps) => {
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


