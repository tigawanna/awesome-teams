import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { pb } from "../pb/config";
import { useAlertStore } from "../zustand/alert";


export interface NotificationInfiniteResponse {
    pages: NotificationPageResponse[]
    pageParams: number[]
}

export interface NotificationPageResponse {
    page: number
    perPage: number
    totalItems: number
    totalPages: number
    items: NotificationResponse[]
}


export interface NotificationResponse {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    name: string
    details: string
    source: string
    item_id: string
    type: string

}

export interface RealTimeBNotificationRoot {
    action: "create"|"update"|"delete"
    record: NotificationResponse
}




type InjectedQueryFnProps = {
    queryKey: any[];
    signal: AbortSignal;
    pageParam: number;
    meta: Record<string, unknown> | undefined;
}

export async function getNotifications(page:InjectedQueryFnProps){
try {
    // fetch a paginated records list
    const resultList = await pb.collection('notifications').getList<NotificationResponse>(page.pageParam, 50, {
        filter: '',
        sort:'-created'

    });
    return resultList
} catch (error) {
    throw error;
}

}


// export function useRealTime(){
// const queryClient =useQueryClient()
// pb.realtime.subscribe('notifications', (data: RealTimeBNotificationRoot) => {
// queryClient.setQueryData<NotificationInfiniteResponse>(['notifications'], (oldData)=>{
  
// if(oldData){
// return {...oldData,pages:oldData.pages.map((page,idx)=>{
//     if(idx === 0){
//         return {
//             page:0,
//             perPage:50,
//             totalItems:page.totalItems,
//             totalPages:page.totalPages,
//             items:[...page.items,data.record]
//         }
//     }
//     return page
//    })}

//     }

// return oldData

//     }) 
// })

// }

export function useRealTime() {

const queryClient = useQueryClient()
const alerts = useAlertStore()
useEffect(() => {
    const unsubscribePromise = pb.realtime.subscribe('notifications', (data: RealTimeBNotificationRoot) => {
        queryClient.invalidateQueries({queryKey:['notifications']})
        alerts.increase(1)
        if(alerts.has_read){
            alerts.setLastAlert(data.record.created)
        }
            
        // console.log("alert sent ", data)
    })
        return () => {
            (async () => {
                (await unsubscribePromise)();
            })();
        };
    },[]);
}


export interface UnreadAlert {
    count: number;
    created: string;
    details: string;
    id: string;
    item_id: string;
    name: string;
    source: string;
    type: string;
    updated: string;
}


export function useUnreadNotications(){
    const alerts = useAlertStore()
    const [load,setLoad] = useState(true)
    const unread_alerts = useQuery({
        queryKey: ['unread-notification-count'],
        queryFn: () => notificationCount(alerts?.last_alert as string),
        enabled:load,
        onSuccess: (data) => {
            alerts.setInitialCount(data.count)
            alerts.setLastAlert(data.created)
            console.log("on success  === ",data)
            setLoad(false)
        }
    })
    // console.log("unread_alerts",unread_alerts.data)

}

export async function notificationCount(created:string){

    try {
        const result = await pb.send<UnreadAlert>('/custom_notifications', {
            params: {created}
        })
        console.log("getting last alert  === ",result)
        return result
    } catch (error:any) {
        console.log("error getting notification count", error.message)
        throw error;
    }
}
