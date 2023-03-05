import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../utils/api/tasks";
import { QueryStateWrapper } from "../../shared/wrappers/QueryStateWrapper";

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
 <div className='w-full min-h-screen 
 flex  items-center justify-center '>
 
 <div className=' flex flex-wrap items-start justify-center gap-2 m-5'>
    { tasks&&tasks.items.map((task)=>{    
        return(
        <div key={task.id} 
        className='h-full border p-2 rounded-lg w-fit md:max-w-[40%] gap-2 line-clamp-5
        flex flex-col items-center justify-center  flex-grow '>
            <h1 className='text-xl font-bold w-full px-1'>{task.title}</h1>
            <p className=''>{task.description}</p>
        </div>
    )}
    )
    }
</div>
 </div>
</QueryStateWrapper>
);
}
