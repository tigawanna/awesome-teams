
import { Outlet } from "react-router-dom";
import { useDocumentTitle } from "../../utils/hooks/useDocumentTitle";
import { AppUser } from "../../utils/types/base";
interface StaffLayoutProps {
  user: AppUser
}

export default function StaffLayout({}:StaffLayoutProps){
  useDocumentTitle('Staff Page')
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


