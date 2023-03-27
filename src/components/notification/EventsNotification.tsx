import { useInfiniteQuery  } from "@tanstack/react-query";
import React from "react";
import { LoadMoreButton } from "../../shared/extra/LoadMoreButton";
import { getNotifications, useRealTime } from "../../utils/api/notifications";

interface EventsNotificationProps {

}

export function EventsNotification({}:EventsNotificationProps){



    const query = useInfiniteQuery({
        queryKey: ['notifications'],
        queryFn: (props)=>getNotifications(props),
        defaultPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.totalPages > lastPage.page)
                return lastPage.page + 1
        },
    })
    useRealTime()
    if (query.isFetching) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                loading ..
            </div>
        )
    }

    if (query.isError) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <div className='p-2 flex items-center justify-center bg-red-200 text-red-700'>
                    {query.error.message}
                </div>
            </div>
        )
    }
    if (!query.data) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                no data
            </div>
        )
    }
    if (query.data && query.data.pages[0].items.length === 0) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                no notifications 
            </div>
        )
    }

const notifications  = query.data
// console.log("notification  ",notifications)
return (
 <div className='w-full min-h-full flex items-center justify-center'>
        <div className='w-[95%] h-full flex flex-col items-center justify-start gap-2'>
        {notifications?.pages.map((page, page_idx) => {

            return (
                <React.Fragment key={page_idx}>
                    {
                        notifications && page.items.map((event) => {
                            return (
                                <div 
                                key={event.id}
                                className='w-full h-full flex items-center justify-center border-shadow p-2'>
                                    {event.name}
                                </div>

                            )
                        })
                    }
                </React.Fragment>
            )
        }
        )
        }
        <LoadMoreButton query={query} />
        </div>
 </div>
);
}
