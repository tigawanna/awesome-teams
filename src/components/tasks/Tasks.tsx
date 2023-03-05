import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../utils/api/tasks";
import { QueryStateWrapper } from "../../shared/wrappers/QueryStateWrapper";
import { TaskCard } from "./TaskCard";

interface TasksProps {

}

export const Tasks = ({}:TasksProps) => {
const query = useQuery({
    queryKey:['tasks'],
    queryFn:getTasks
})
const tasks = query.data
return (
<QueryStateWrapper query={query} length={tasks && tasks?.totalItems}>
 <div className='w-full min-h-screen flex  items-center justify-center '>
 
 <div className=' flex flex-wrap items-start justify-center gap-2 m-5'>
    { tasks&&tasks.items.map((task)=>{    
        return( <TaskCard key={task.id} task={task}/>)}
    )
    }
</div>

 </div>
</QueryStateWrapper>
);
}
