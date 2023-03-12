import { AppUser } from "../../utils/types/base";

interface PortalProps {
user:AppUser
}

export default function Portal({}:PortalProps){
  return (
    <div className='w-full h-full'>
      Portal component
    </div>
  );
};


