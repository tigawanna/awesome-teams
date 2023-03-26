import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { TheIcon } from "../../../shared/wrappers/TheIcon";
import { deleteTask, TasksResponse } from "../../../utils/api/tasks";
import { concatErrors } from "../../../utils/utils";
import { useStroreValues } from "../../../utils/zustand/store";
import { ConsentModal } from "../../portal/ConsentModal";

interface DeleteFunctionProps {
    task: TasksResponse
    setIsHovered: React.Dispatch<React.SetStateAction<boolean>>
}

export function DeleteOption({task,setIsHovered}:DeleteFunctionProps){
    const store = useStroreValues()
    const [open, setOpen] = useState(false)
    const [errror, setError] = useState({ name: '', message: '' })
    const mutation = useMutation({ mutationFn: () => deleteTask(task.id),
        meta: { invalidates: ["tasks", " "] },
        onSuccess: () => {
           store.updateNotification({
                type: "success",
                message: "Task deleted successfully",
           })
        },
        onError: (err) => {
            store.updateNotification({
                type: "error",
                message:concatErrors(err),
            })
        }
    })

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        mutation.mutate()
        setOpen(false)
        setIsHovered(false)
    }  

return (
 <div className='h-full flex items-center justify-center'>
        <TheIcon Icon={FaTrash} size='20' color="red"
            iconAction={() => {setOpen(true)}}
        />
        <ConsentModal
            error={errror}
            open={open}
            handleAccept={handleClick}
            handleReject={() => setOpen(false)}
            prompt='Are you sure you want to delete this task?'
            setOpen={setOpen}
        />
 </div>
);
}
