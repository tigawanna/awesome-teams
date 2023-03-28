
import { Outlet } from "react-router-dom";
import { AppUser } from "../../utils/types/base";
interface NotificationLayoutProps {
user:AppUser
}

export default function NotificationLayout({}:NotificationLayoutProps){
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


