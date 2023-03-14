import { useInfiniteQuery} from "@tanstack/react-query";
import { getTasks } from "../../utils/api/tasks";
import { QueryStateWrapper } from "../../shared/wrappers/QueryStateWrapper";
import { TaskCard } from "./TaskCard";
import { useState } from "react";
import { useDebouncedValue } from "../../utils/hooks/useDebouncedValue";
import React from "react";
import { LoadMoreButton } from "../../shared/extra/LoadMoreButton";
import { SearchBox } from "../../shared/form/SearchBox";

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

    function handleChage(e: React.ChangeEvent<HTMLInputElement>) {
        setKeyword(e.target.value)
    }

    const tasks = query.data
    // console.log("tasks ==== ",tasks )
   return (

        <div className='w-full min-h-screen flex flex-col  items-center justify-start '>

        <SearchBox keyword={keyword} handleChage={handleChage}/>

           <div className='lg:w-[75%] flex flex-wrap items-start  gap-2 m-5 mt-14'>
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
