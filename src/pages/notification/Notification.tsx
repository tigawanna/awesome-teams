import { EventsNotification } from "../../components/notification/EventsNotification";
import { AppUser } from "../../utils/types/base";


interface NotificationProps {
  user: AppUser
}

export default function Notification({}:NotificationProps){
  return (
    <div className='w-full h-full min-h-screen  flex items-center justify-center'>
      <EventsNotification />
    </div>
  );
};


