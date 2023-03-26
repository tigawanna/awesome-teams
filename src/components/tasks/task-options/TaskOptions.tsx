import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { TheIcon } from "../../../shared/wrappers/TheIcon";
import { TasksResponse } from "../../../utils/api/tasks";
import { AppUser } from "../../../utils/types/base";
import { DeleteOption } from "./DeleteOption";


interface TaskOptionsProps {
    task: TasksResponse
    user:AppUser

}

export function TaskOptions({task,user}:TaskOptionsProps){
const [open,setOpen]=useState(false)
const [isHovered, setIsHovered] = useState(false);



return (
 <div className='relative h-full flex items-center justify-center'>



        <div
            className={` h-full p-2 flex ${isHovered ? 'flex-row' : 'flex-col'}  gap-2 absolute right-0`}>
            <TheIcon Icon={CiMenuKebab} size='20'
                iconAction={() => setIsHovered(true)}
                iconstyle={`h-full ${isHovered ? 'hidden' : 'flex'} items-center justify-center `} />
           


            <div className={`w-fit h-full flex ${isHovered ? 'flex-row' : 'hidden '} gap-2   animate-in fade-in`}>
                
                <div className={`w-fit h-full flex ${isHovered ? 'flex-row' : 'hidden p-1'} items-center justify-center`}>
                    <TheIcon Icon={FaTimes} size='20'color="orange" iconAction={() => setIsHovered(false)}/>
                </div>
      
            {user?.id === task.created_by && <DeleteOption task={task} setIsHovered={setIsHovered}/>}

            </div>

 
 
        </div>


 </div>
);
}
