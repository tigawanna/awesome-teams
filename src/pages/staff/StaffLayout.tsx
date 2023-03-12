
import { Outlet } from "react-router-dom";
import { AppUser } from "../../utils/types/base";
interface StaffLayoutProps {
  user: AppUser
}

export default function StaffLayout({}:StaffLayoutProps){
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


