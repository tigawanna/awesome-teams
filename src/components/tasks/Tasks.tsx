import { useInfiniteQuery} from "@tanstack/react-query";
import { getTasks } from "../../utils/api/tasks";
import { QueryStateWrapper } from "../../shared/wrappers/QueryStateWrapper";
import { TaskCard } from "./TaskCard";
import { useState } from "react";
import { useDebouncedValue } from "../../utils/hooks/useDebouncedValue";
import React from "react";
import { LoadMoreButton } from "../../shared/extra/LoadMoreButton";
import { SearchBox } from "../../shared/form/SearchBox";
import { AppUser } from "../../utils/types/base";

interface TasksProps {
user:AppUser
}

export const Tasks = ({user}: TasksProps) => {

const [keyword, setKeyword] = useState(" ");
const {value,isDebouncing} = useDebouncedValue(keyword, 2000);


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

       <div 
        data-testid="tasks-component"
       className='w-[90%] min-h-screen flex flex-col  items-center justify-start p-5'>

        <SearchBox keyword={keyword} handleChage={handleChage} placeholder='filter for tasks by title or description' 
        loading={isDebouncing||query.isFetching} />
           

           <div 
            aria-label="list-of-tasks"
            data-testid="list-of-items"
           className='w-[95%] lg:w-[75%] flex flex-wrap items-start  gap-2 mt-14 '>
            <QueryStateWrapper query={query}>
               {tasks?.pages.map((page, page_idx) => 
               {
                
                return (
                    <React.Fragment key={page_idx} >
                  
                           {
                               tasks && page.items.map((task) => {
                                   return (<TaskCard key={task.id} task={task} 
                                    page_idx={page_idx} user={user}/>)
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
