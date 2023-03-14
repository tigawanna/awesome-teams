import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { QueryStateWrapper } from "../../shared/wrappers/QueryStateWrapper";
import { TheIcon } from "../../shared/wrappers/TheIcon";
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
    const value = useDebouncedValue(keyword, 2000);


    // const query = useQuery({ queryKey: ['staff', value], queryFn: () => getstaff(value),})
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

        {/* <div className="w-[90%] md:w-[40%] fixed top-10 border shadow-xl z-50 flex rounded-lg gap-2">
            <input className="p-1 w-full  md:text-xl dark:bg-slate-800 " value={keyword} onChange={handleChage} />
            <TheIcon Icon={FaSearch} size="20" iconstyle="m-2" />
        </div> */}
        <SearchBox keyword={keyword} handleChage={handleChage} />

        <div className=' flex flex-wrap items-start justify-center gap-2 m-5 mt-14'>
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
