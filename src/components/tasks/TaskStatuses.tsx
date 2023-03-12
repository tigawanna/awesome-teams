
import { TaskMutationFields, TasksResponse, updatetask } from "../../utils/api/tasks";
import { AppUser } from "../../utils/types/base";
import { MdDone, MdCancel } from 'react-icons/md'
import { useTaskRepairStatus } from "./useTaskRepairStatus";
import { ReactModalWrapper } from "../../shared/wrappers/ReactModalWrapper";
import { useState } from "react";
import { IconContext } from "react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { concatErrors } from "../../utils/utils";




interface TaskStatusesProps {
    task: TasksResponse
    user: AppUser
}

type ButtonLabels = {
    [key in TasksResponse['status']]: string
}

export const TaskStatuses = ({ task, user }: TaskStatusesProps) => {
    // console.log("tasks === ",task)
const [open,setOpen]=useState(false)

    const tasks_steps = useTaskRepairStatus(task)
    const [statusToUpdate, setStatusToupdate] = useState(tasks_steps.last_item)
    const label_map: ButtonLabels = {
        "created": "create",
        "approved": "Approve",
        "rejected": "rejected",
        "funded": "fund",
        "in_progress": "mark in progress",
        "completed": "mark completed"
    }
  
    function toggleModal(is_last:boolean,next_status:TasksResponse['status']){
    console.log("toggle button === ",next_status)
    setStatusToupdate((prev)=>{
        return next_status
    })
    if(is_last){
        setStatusToupdate(next_status)
        setOpen(prev=>!prev)
    }

  }
//  repairs type has possible statuss of created , approved , funded ,in_progress and completed
    if (task.type === "repairs") {

        return (
            <div className='w-full h-full flex flex-wrap items-center justify-center gap-2'>
            {
            tasks_steps.taskSlice.map((item, idx) => {
            const is_last = tasks_steps.last_item === item
            if (item === "approved") {
                return (
                    <div key={item} className="flex items-center justify-center gap-2 ">
                        
                        <button 
                            style={{ backgroundColor: !is_last ? "green" : "", color: !is_last ? "white" : "" }}
                            onClick={() =>toggleModal(is_last,tasks_steps.last_item)}
                            className={is_last ?
                                `px-5 outline flex items-center justify-center gap-2 rounded-xl 
                                    hover:outline-2 hover:outline-green-400`:
                                `px-5 outline flex items-center justify-center gap-2 rounded-lg`
                            }>
                         <h1 className="text-lg">{is_last ? label_map[item] : item}</h1><MdDone />
                        </button>

                    {is_last?
                    <button 
                    onClick={() => toggleModal(is_last,"rejected")}
                    className="px-5 flex items-center bg-red-700justify-center gap-2 
                    rounded-xl hover:bg-red-600 hover:text-white">
                    <h1 className="text-lg">{"reject"}</h1>
                        <MdCancel /></button> : null}
                    </div>)
                    }
            
            if (item === "rejected") {
                    return (
                    <button 
                    key={item}
                    onClick={() => toggleModal(is_last, tasks_steps.last_item)}
                    className="px-5 flex items-center bg-red-700 justify-center gap-2 rounded-lg">
                    <h1 className="text-lg">{"rejected"}</h1></button>)
            }
                if (item === "completed"&&tasks_steps.end_of_steps) {
                    return (
                        <button
                            key={item}
                            style={{backgroundColor:"green",color:'white'}}
                            // onClick={() => toggleModal(is_last)}
                            className={`px-5 outline flex items-center justify-center gap-2 rounded-xl `}>
                            <h1 className="text-lg">{"Completed"}</h1>
                            <MdDone />
                            </button>)
                }





      return( 
      <button key={item}
              style={{ backgroundColor: !is_last ? "green" : "", color: !is_last ? "white" : "" }}
              onClick={() => toggleModal(is_last, tasks_steps.last_item)}
              className={is_last?
                `px-5 outline flex items-center justify-center gap-2 rounded-xl 
                hover:outline-2 hover:outline-green-400`:
                  `px-5 outline flex items-center justify-center gap-2 rounded-lg`
                }
       
       >
        <h1 className="text-lg"> {is_last ? label_map[item] : item}</h1> <MdDone />
        </button>
        )


    })
    }
        <TaskUpdateStatusModal
            open={open}
            setOpen={setOpen}
            task={task}
            new_status={statusToUpdate}
            user={user}
        />
    </div>
    );

    }
// else block : only states here are created and completed

    return (
        <div className='w-full h-full flex items-center justify-center'>
          <button
                style={{ backgroundColor: task.status === "completed" ? "green" : "",
                color: task.status === "completed" ? "white" : "" }}
                onClick={() => toggleModal(task.status !== "completed",tasks_steps.last_item)}
                className={task.status !== "completed"?
                `px-5 outline flex items-center justify-center gap-2 rounded-xl 
                hover:outline-2 hover:outline-green-400`:
                `px-5 outline flex items-center justify-center gap-2 rounded-lg`}
                
                >
                <h1 className="text-lg">{task.status !== "completed" ? "mark completed" : "completed"}
                </h1> <MdDone />
            </button>

            <TaskUpdateStatusModal 
            open={open} 
            setOpen={setOpen} 
            task={task} 
            new_status={statusToUpdate}
            user={user}
            />
        </div>
    );
}





interface  TaskUpdateStatusModalProps {
    open:boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    task:TasksResponse
    user:AppUser
    new_status:TasksResponse['status']
}

export const TaskUpdateStatusModal = ({open,setOpen,new_status,task,user }: TaskUpdateStatusModalProps) => {
    const queryClient = useQueryClient()
    const [error, setError] = useState({ name: "", message: "" })
    console.log("new status to update === ",new_status)
    function newStatus(sts:TasksResponse['status']):TasksResponse{
        console.log("staus ",sts)
        if(sts === "approved"){
            return {...task,status:sts,approved_by:user?.id}
        }
        if(sts === "funded"){
            return {...task,status:sts,funded_by:user?.id}
        }
        if(sts === "in_progress"){
            return {...task,status:sts,marked_in_progress_by:user?.id}
        }
        if(sts === "completed"){
            return {...task,status:sts,marked_completed_by:user?.id}
        }
        if(sts === "rejected"){
            return {...task,status:sts,rejected_by:user?.id}
        }
    return task
    }
    
    const mutation=useMutation({
        mutationFn: (variables:TaskMutationFields)=>updatetask(variables),
        meta:{
            updatelistitems:['tasks', " "]
        },
        
        onError(error, variables, context) {
            setError({ name: "", message: concatErrors(error) });
        },
        onSuccess(data, variables, context) {
            //  update single task
        queryClient.setQueryData<TasksResponse|undefined>(['tasks',data.id],
        (oldData) => {
         if(data) return data
        return oldData
        })
        
        // update tasks list
        // queryClient.setQueryData<ListResult<TasksResponse> | undefined>(['tasks'," "], (oldData) => {
        //     // console.log("oldData === ",oldData)
        //         if (data.id && oldData) {
        //             const updatedItems = oldData.items.map((item) => {
        //                 if (item.id === data.id) {
        //                     // Return the new object if the id matches
        //                     return data;
        //                 }
        //                 // Otherwise, return the current item
        //                 return item;
        //             });

        //             // Return the updated data with the new items array
        //             return {
        //                 ...oldData,
        //                 items: updatedItems,
        //             };
        //         }

                
        //         return oldData
        // })


        //  close the modal
        setOpen(false)
        },
    

    })

return (
    <ReactModalWrapper
        child={
        <div className="w-full h-full flex flex-col items-center justify-center 
        rounded-lg shadow-xl bg-orange-300 bg-opacity-40 ">
            
            <IconContext.Provider value={{size:"40px"}}>
            <div className="flex items-center justify-center gap-5">
                <button 
                onClick={()=>mutation.mutate(newStatus(new_status))}
                className="px-6 py-1 text-2xl font-bold rounded-full shadow-lg 
                outline hover:outline-green-600">
                    Yes
                </button>
                <button 
                onClick={()=>setOpen(false)}
                className="px-6 py-1 text-2xl  rounded-full bg-red-600 hover:bg-red-500 text-white">
                    Cancel
                </button>
            </div>
                    
                <div className="m-1 w-[90%] flex  flex-col items-center justify-center">
                        {error?.message !== "" ? (
                            <div
                                className="m-1 w-full text-center  line-clamp-4 p-2 bg-red-100 border-2 
                        border-red-800 text-red-900  rounded-xl"
                            >
                                {error.message}
                            </div>
                        ) : null}
                </div>


            </IconContext.Provider>

        </div>
        }
        closeModal={() => setOpen(false)}
        isOpen={open}
        styles={{
            overlay_top: '0%',
            overlay_right: '0%',
            overlay_left: '0%',
            overlay_bottom: '0%',
            content_bottom: '20%',
            content_right: '10%',
            content_left: '10%',
            content_top: '10%',
            

        }}
    />
);
}
