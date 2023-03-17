import { useParams, useSearchParams } from "react-router-dom";
import { AppUser } from "../../utils/types/base";
import { useQuery } from "@tanstack/react-query";
import { getOneTask, statusColors } from "../../utils/api/tasks";
import { QueryStateWrapper } from "../../shared/wrappers/QueryStateWrapper";
import { TaskStatuses } from "./TaskStatuses";
import { TaskDeadline } from "./TaskDeadline";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime)

interface OneTaskProps {
user:AppUser
}

export const OneTask = ({user}:OneTaskProps) => {
const param = useParams()
const [searchparams,setSearchParams] = useSearchParams()
const page_idx = parseInt(searchparams.get("page_idx") as string)


const query = useQuery({
    queryKey: ["tasks", param.id],
    queryFn:() =>getOneTask(param.id)
    
})

if(query.isPending){
return(
    <div className='h-screen w-full flex flex-col items-center justify-center '>
        loading......
    </div>
) 
}
if (!query.data ) {
        return (
            <div className='h-screen w-full flex flex-col items-center justify-center '>
                No task found with id: {param.id}
            </div>
        )
}

const task = query.data
return (
 <div className='w-full h-full flex items-center justify-center'>
    <QueryStateWrapper query={query}>   
        <div 
         style={{ border: `1px solid ${statusColors[task?.status]}` }}
         className="w-[90%] h-full md:w-[60%] border shadow-xl rounded-lg p-4
            flex flex-col items-center justify-center ">
        
        
        <div className='h-full  flex flex-wrap items-center justify-between  gap-2 p-2'>
                    
                    <div className='h-full  flex flex-col items-center justify-center  gap-1 p-2'>
                        <h1 className='text-4xl font-bold w-full '>{task?.title}</h1>
                        <h1 className='w-full text-accent '>by: {task.expand?.created_by.name}
                            {'('}{task.expand?.created_by.type}{')'}
                        </h1>
                    </div>

                        <div className='h-full  flex items-center  gap-2 p-[1px] px-2 border rounded-lg'>
                            <div className="p-1 flex flex-col ">
                                <div className="flex flex-col gap-[1px]">
                                <h3 className='font-bold w-full '>{task?.status}</h3>
                                <h1 className='text-accent font-bold'>{task.type}</h1>
                            </div>
                         <h1 className='text-xs'>{dayjs(task.created).format('dddd DD-MMM-YYYY')}</h1>
                         
                         <h1 className='text-xs'>{dayjs().to(dayjs(task.created))}</h1>
                        </div>
                        </div>
        
   
            <p className='border-t p-2'>{task?.description}</p>
        </div>

     <TaskStatuses task={task} user={user} page_idx={page_idx}/>
    <TaskDeadline task={task}/>
    </div>
    </QueryStateWrapper>

 </div>
);
}
