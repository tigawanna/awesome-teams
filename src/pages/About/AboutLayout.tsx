import { Outlet } from "react-router-dom";
import { AppUser } from "../../utils/types/base";

interface AboutLayoutProps {
user:AppUser
}

export const AboutLayout= ({}:AboutLayoutProps) => {
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


