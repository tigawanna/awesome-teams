import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getTasks } from "../../utils/api/tasks";
import { QueryStateWrapper } from "../../shared/wrappers/QueryStateWrapper";
import { TaskCard } from "./TaskCard";
import { useState } from "react";
import { TheIcon } from "../../shared/wrappers/TheIcon";
import { FaSearch } from "react-icons/fa";
import { useDebouncedValue } from "../../utils/hooks/useDebouncedValue";
import React from "react";
import { LoadMoreButton } from "../../shared/extra/LoadMoreButton";

interface TasksProps {

}

export const Tasks = ({ }: TasksProps) => {

const [keyword, setKeyword] = useState(" ");
    const value = useDebouncedValue(keyword, 2000);


// const query = useQuery({ queryKey: ['tasks', value], queryFn: () => getTasks(value),})
    const query = useInfiniteQuery({
        queryKey: ['tasks', value],
        queryFn: (props) => getTasks(props,value),
        defaultPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
        if(lastPage.totalPages > lastPage.page)
        return  lastPage.page + 1
        },
    })

function handleChage(e: any) {
        setKeyword(e.target.value)
    }

    const tasks = query.data
    // console.log("tasks ==== ",tasks )
   return (

        <div className='w-full min-h-screen flex flex-col  items-center justify-center '>

           <div className="w-[90%] md:w-[40%] fixed top-10 border shadow-xl z-50 flex rounded-lg gap-2">
               <input className="p-1 w-full  md:text-xl bg-slate-800 " value={keyword} onChange={handleChage} />
               <TheIcon Icon={FaSearch} size="20" iconstyle="m-2" />
           </div>

           <div className=' flex flex-wrap items-start justify-center gap-2 m-5 mt-14'>
            <QueryStateWrapper query={query}>
               {tasks?.pages.map((page, page_idx) => 
               {
                
                return (
                       <React.Fragment key={page_idx}>
                  
                           {
                               tasks && page.items.map((task) => {
                                   return (<TaskCard key={task.id} task={task} page_idx={page_idx}/>)
                               })
                           }
                       </React.Fragment>
                   )
               }
               )
               }
               </QueryStateWrapper>

           </div>
         <LoadMoreButton query={query}/>
    




        </div>

    );
}
