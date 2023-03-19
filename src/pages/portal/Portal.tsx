
import PortalUser from "../../components/portal/PortalUser";
import { AppUser } from "../../utils/types/base";

interface PortalProps {
user:AppUser
}

export default function Portal({user}:PortalProps){
  return (
    <div className='w-full h-full '>
   <PortalUser user={user}/>
   
    </div>
  );
};


