
import { Outlet } from "react-router-dom";
import { useDocumentTitle } from "../../utils/hooks/useDocumentTitle";
import { AppUser } from "../../utils/types/base";
interface PortalLayoutProps {
user:AppUser
}

export default function  PortalLayout({}:PortalLayoutProps){
  useDocumentTitle('Staff Portal')
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};



