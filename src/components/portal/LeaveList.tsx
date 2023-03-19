
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getStaffLeaves } from "../../utils/api/staff";
import { AppUser } from "../../utils/types/base";
import { QueryStateWrapper } from "../../shared/wrappers/QueryStateWrapper";
import React from "react";
import { StaffLeavesRow } from "./StaffLeavesRow";
import { LoadMoreButton } from "../../shared/extra/LoadMoreButton";
import { useDebouncedValue } from "../../utils/hooks/useDebouncedValue";

interface LeaveListProps {
user:AppUser
}

export function LeaveList({user}:LeaveListProps){
    const [keyword, setKeyword] = useState(" ");
    const value = useDebouncedValue(keyword, 2000);


    // const leave_filter = `leave_requested_by = "${user?.id}"`

    const query = useInfiniteQuery({
        queryKey: ['staff_leaves', value],
        queryFn: (props) => getStaffLeaves(props,''),
        defaultPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.totalPages > lastPage.page)
                return lastPage.page + 1
        },
    })
const staff_leaves = query.data
return (
 <div className='w-full h-full flex items-center justify-center'>

        <div className='w-full flex flex-wrap items-start justify-center gap-2 m-5 mt-14 '>
            <QueryStateWrapper query={query}>
                {staff_leaves?.pages.map((page, page_idx) => {

                    return (
                        <React.Fragment key={page_idx}>
                            {
                                staff_leaves && page.items.map((leave) => {
                                    return (
                                        <StaffLeavesRow key={leave.id} leave={leave} page_idx={page_idx} user={user} />
                                    )
                                })
                            }
                        </React.Fragment>
                    )
                }
                )
                }
            </QueryStateWrapper>

        </div>

        <LoadMoreButton query={query} />

 </div>
);
}
