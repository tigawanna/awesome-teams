
import { TaskMutationFields, TasksResponse, updatetask } from "../../utils/api/tasks";
import { AppUser } from "../../utils/types/base";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { concatErrors } from "../../utils/utils";
import { ApprovedStatus, CompletedStatus, CreatedStatus, FundedStatus, InProgressStatus, RejectedStatus } from "./TaskStatusButtons";
import { useStroreValues } from "../../utils/zustand/store";
import { ConsentModal } from "../portal/ConsentModal";


interface TaskStatusesProps {
    task: TasksResponse
    user: AppUser
    page_idx: number
}

export const TaskStatuses = ({ task, user, page_idx }: TaskStatusesProps) => {
    const [open, setOpen] = useState(false)
    const [statusToUpdate, setStatusToupdate] = useState({next_status:task.status,message:"Accept action"})

    function toggleModal(is_last: boolean, next_status: TasksResponse['status'],message:string) {
     
        setStatusToupdate((prev) => {
            return { next_status,message }
        })
        if (is_last) {
            setStatusToupdate({next_status, message })
            setOpen(prev => !prev)
        }
    }
 

    return (
        <div className='w-full h-full flex items-center justify-center'>
        {task.status === "rejected" && <RejectedStatus task={task} />}
            {task.status === "created" && <CreatedStatus is_last task={task} user={user} toggleModal={toggleModal}/>}
            {task.status === "approved" && <ApprovedStatus is_last task={task} user={user} toggleModal={toggleModal} />}
            {task.status === "funded" && <FundedStatus is_last task={task} user={user} toggleModal={toggleModal} />}
            {task.status === "in_progress" && <InProgressStatus is_last task={task} user={user}  toggleModal={toggleModal} />}
            {task.status === "completed" && <CompletedStatus task={task} user={user}  toggleModal={toggleModal} />}

            <TaskUpdateStatusModal
                open={open}
                setOpen={setOpen}
                task={task}
                new_status={statusToUpdate}
                user={user}
                page_idx={page_idx}
            />
        </div>
    );
}





type NewStatus={
    next_status: TasksResponse['status'];
    message: string;
}
interface TaskUpdateStatusModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    task: TasksResponse
    user: AppUser
    page_idx: number
    new_status:NewStatus
}

export const TaskUpdateStatusModal = ({ open, setOpen, new_status, task, user, page_idx }: TaskUpdateStatusModalProps) => {
    const queryClient = useQueryClient()
    const store = useStroreValues()
    const [error, setError] = useState({ name: "", message: "" })
    // console.log("new status to update === ",new_status)

    function newStatus(new_sts:NewStatus, task_type: TasksResponse['type']): TasksResponse {
        
        if (task_type === "repairs") {
            if (new_sts.next_status === "approved") {
                return { ...task, status: new_sts.next_status, approved_by: user?.id,approved_on:new Date().toISOString()}
            }
            if (new_sts.next_status === "funded") {
                return { ...task, status: new_sts.next_status, funded_by: user?.id,funded_on:new Date().toISOString()}
            }
            if (new_sts.next_status === "in_progress") {
                return { ...task, status: new_sts.next_status, marked_in_progress_by: user?.id,marked_in_progress_on:new Date().toISOString()}
            }
            if (new_sts.next_status === "rejected") {
                return { ...task, status: new_sts.next_status, rejected_by: user?.id, rejected_on: new Date().toISOString() }
            }
        }

        if (new_sts.next_status === "completed") {
            return { ...task, status: new_sts.next_status, marked_completed_by: user?.id,completed_on:new Date().toISOString()}
        }
        return task
    }

    const mutation = useMutation({
        mutationFn: (variables: TaskMutationFields) => updatetask(variables),

        meta: {
            infinitelist: {
                key: ['tasks', " "],
                page: page_idx
            }
        },

        onError(error, variables, context) {
            setError({ name: "main", message: concatErrors(error) });
        },
        onSuccess(data, variables, context) {
            queryClient.setQueryData<TasksResponse | undefined>(['tasks', data.id],
                (oldData) => {
                    if (data) return data
                    return oldData
                })
            //  close the modal
            store.updateNotification({ type: "success", message:`Task status updated to ${data.status}` })
            setOpen(false)
        },


    })



    return (
        <ConsentModal
            error={error}
            handleAccept={() => {
                mutation.mutate(newStatus(new_status, task.type))
                setOpen(false)
            }}
            handleReject={() => {
                mutation.mutate(newStatus(new_status, task.type))
                setOpen(false)
            }}
            open={open}
            prompt={`Are you sure you want to update status to ${new_status.next_status}?`}
            setOpen={setOpen}
        />
    );
}
