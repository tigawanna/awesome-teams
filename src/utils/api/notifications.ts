import { useQueryClient } from "@tanstack/react-query";
import { pb } from "../pb/config";


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
    pb.realtime.subscribe('notifications', (data: RealTimeBNotificationRoot) => {
        queryClient.invalidateQueries({queryKey:['notifications']})
    })

}
