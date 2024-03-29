import { EventsNotification } from "../../components/notification/EventsNotification";
import { AppUser } from "../../utils/types/base";

interface TestProps {
    user: AppUser
}

export default function Test({user}:TestProps){
    
return (
 <div className='w-full h-full min-h-screen flex items-start justify-center'>
      <EventsNotification/>

 </div>
);
}


