import { Link } from "react-router-dom";
import { NotificationResponse } from "../../utils/api/notifications";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { DateOutput } from "../../shared/extra/DateOutput";
dayjs.extend(relativeTime)

interface NotificationCardProps {
    event: NotificationResponse
    is_unread:boolean
}

export function NotificationCard({event,is_unread}:NotificationCardProps){

function linkToEvent(event:NotificationResponse){
    if(event.type === "task"){
        return `../${event.item_id}`
    }
    return `../portal/${event.item_id}`
}

function eventStyleTw(unread:boolean){
    if(unread){
        return "w-[100%] border rounded-xl  shadow-md  p-3 shadow-orange-500  hover:shadow-purple-600 "
    } 
    return "w-[100%] border rounded-xl  shadow-md  p-3 shadow-slate-500  hover:shadow-slate-600 "
}
return (
 <Link 
 to={linkToEvent(event)}

 
 className='w-full h-full flex items-center justify-centergap-2'>
    <div className={eventStyleTw(is_unread)}>

        {/* header */}
        <div className="flex items-center justify-between ">
            <h1 className="font-bold w-full">{event.name}</h1>
       
        </div>

        {/* main body  */}
        <div className="flex items-center justify-between border-t p-1">
            <p className="font-serif w-full">{event.details}</p>
   
     
        </div>
        {/*  footer */}
        <div className="flex items-center justify-between">
                <h3 className="w-[20%]">{event.type}</h3>
                <div className="w-[80%">
                    <DateOutput the_date={event.created} />
                </div>

       
        </div>
    </div>
  
 </Link>
);
}
