import { useEffect } from "react";
import { EventsNotification } from "../../components/notification/EventsNotification";
import { AppUser } from "../../utils/types/base";
import { useAlertStore } from "../../utils/zustand/alert";


interface NotificationProps {
  user: AppUser
}

export default function Notification({}:NotificationProps){
  const alerts = useAlertStore()
  
  useEffect(()=>{
    alerts.clearNotification()
  },[])

  return (
    <div className='w-full h-full min-h-screen  flex flex-col items-center justify-center'>
      <h1 className="w-full text-center text-3xl font-bold fixed top-5 backdrop-blur-lg">Notifications</h1>
      <EventsNotification />
    </div>
  );
};


