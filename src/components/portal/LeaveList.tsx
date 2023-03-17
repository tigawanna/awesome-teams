import { useDebouncedValue } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getStaffLeaves } from "../../utils/api/staff";
import { AppUser } from "../../utils/types/base";

interface LeaveListProps {
user:AppUser
}

export function LeaveList({user}:LeaveListProps){
    const [keyword, setKeyword] = useState("");
    const value = useDebouncedValue(keyword, 2000);


    const leave_filter = `leave_requested_by = "${user?.id}"`

    const query = useInfiniteQuery({
        queryKey: ['staff', value],
        queryFn: (props) => getStaffLeaves(props,leave_filter),
        defaultPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.totalPages > lastPage.page)
                return lastPage.page + 1
        },
    })
return (
 <div className='w-full h-full flex items-center justify-center'>

 </div>
);
}
