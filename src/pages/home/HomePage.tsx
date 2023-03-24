
import { FaPlus } from "react-icons/fa";
import { TaskForm } from "../../components/tasks/TaskForm";
import { Tasks } from "../../components/tasks/Tasks";
import { TheIcon } from "../../shared/wrappers/TheIcon";
import { AppUser } from "../../utils/types/base";
import { ReactModalWrapper } from "../../shared/wrappers/ReactModalWrapper";
import { useState } from "react";

interface HomePageProps {
user:AppUser
}

export const HomePage = ({user}:HomePageProps) => {
    
const [open,setOpen]=useState(false);
return (
    <div className='w-full h-full min-h-screen  flex items-center justify-center'>
         {/* <TaskForm/> */}
        <Tasks user={user}  />
        <div 
        className='flex items-center justify-center rounded-full aspect-square  
        p-2 bg-accent text-white hover:bg-[#c09b35] 
        fixed bottom-[10%] right-[5%]'>
        <TheIcon Icon={FaPlus} size={'40'} iconAction={()=>setOpen(true)} aria_label="add-new-task"/>
        </div>

        <ReactModalWrapper
            child={
                <div
                    // onClick={(event) => event.stopPropagation()}
                    className='z-50'>
                    <TaskForm user={user} setOpen={setOpen}/>
                </div>
            }
            closeModal={() => setOpen(false)}
            delay={0}
            isOpen={open}

            styles={{
                overlay_top: '0%',
                overlay_right: '0%',
                overlay_left: '0%',
                overlay_bottom: '0%',
                content_bottom: '2%',
                content_right: '2%',
                content_left: '2%',
                content_top: '2%'

            }} />
    </div>
);
}
