import React, { useState } from "react";
import { QueryStateWrapper } from "../../shared/wrappers/QueryStateWrapper";
import { useDebouncedValue } from "../../utils/hooks/useDebouncedValue";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getStaff } from "../../utils/api/staff";
import { StaffCard } from "./StaffCard";
import { LoadMoreButton } from "../../shared/extra/LoadMoreButton";
import { SearchBox } from "../../shared/form/SearchBox";

interface StaffListProps {

}

export const StaffList = ({}:StaffListProps) => {
    const [keyword, setKeyword] = useState("");
    const {value,isDebouncing} = useDebouncedValue(keyword, 2000);



    const query = useInfiniteQuery({ 
        queryKey: ['staff', value],
        queryFn: (props) => getStaff(props,value),
        defaultPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.totalPages > lastPage.page)
                return lastPage.page + 1
        },
    })

    function handleChage(e:React.ChangeEvent<HTMLInputElement>) {
        setKeyword(e.target.value)
    }

const staff = query.data
return (
    <div className='w-full min-h-screen flex flex-col  items-center justify-start '>
    <SearchBox keyword={keyword} handleChage={handleChage} placeholder='filter for staff by name'
            loading={isDebouncing || query.isFetching} 
    />

        <div className='w-full flex flex-wrap items-start justify-center gap-2 m-5 mt-14 '>
            <QueryStateWrapper query={query}>
                {staff?.pages.map((page, page_idx) => {

                    return (
                        <React.Fragment key={page_idx}>
                            {
                                staff && page.items.map((staff) => {
                                    return (
                                    <StaffCard key={staff.id} staff={staff} page_idx={page_idx} />
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
