import { useParams } from "react-router-dom";
import { AppUser } from "../../utils/types/base";
import { useQuery } from "@tanstack/react-query";
import { getOneTask } from "../../utils/api/tasks";
import { QueryStateWrapper } from "../../shared/wrappers/QueryStateWrapper";
import { StatusManager } from "./StatusManager";

interface OneTaskProps {
user:AppUser
}

export const OneTask = ({user}:OneTaskProps) => {
const param = useParams()

const query = useQuery({
    queryKey: ["tasks", param.id],
    queryFn:() =>getOneTask(param.id)
    
})

    const statusColors = {
        "created": "#330c4a",
        "approved": "#FFC107",
        "funded": "#00BCD4",
        "in_progress": "#22fa0a",
        "completed": "#d0aae6",
        "cancelled": "#F44336"
    };
if(query.isPending){
return(
    <div className='h-screen w-full flex flex-col items-center justify-center '>
        loading-------
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


return (
 <div className='w-full h-full flex items-center justify-center'>
    <QueryStateWrapper query={query}>   
        <div 
         style={{ border: `1px solid ${statusColors[query.data?.status]}` }}
         className="w-[90%] h-full md:w-[60%] border shadow-xl rounded-lg p-4
            flex flex-col items-center justify-center ">
        <div className='h-full  flex flex-col items-center justify-center  gap-2 p-2'>
            <h1
               
                className='text-4xl font-bold w-full px-1'>{query.data?.title}</h1>
            <p className=''>{query.data?.description}</p>
        </div>

     <StatusManager task={query.data} user={user} />

    </div>
    </QueryStateWrapper>

 </div>
);
}
