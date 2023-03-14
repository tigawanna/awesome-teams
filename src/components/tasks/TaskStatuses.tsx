
import { TaskMutationFields, TasksResponse, updatetask } from "../../utils/api/tasks";
import { AppUser } from "../../utils/types/base";
import { ReactModalWrapper } from "../../shared/wrappers/ReactModalWrapper";
import { useState } from "react";
import { IconContext } from "react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { concatErrors } from "../../utils/utils";
import { ApprovedStatus, CompletedStatus, CreatedStatus, FundedStatus, InProgressStatus, RejectedStatus } from "./TaskStatusButtons";


interface TaskStatusesProps {
    task: TasksResponse
    user: AppUser
    page_idx: number
}

export const TaskStatuses = ({ task, user, page_idx }: TaskStatusesProps) => {
    const [open, setOpen] = useState(false)
    const [statusToUpdate, setStatusToupdate] = useState(task.status)

    function toggleModal(is_last: boolean, next_status: TasksResponse['status']) {
     
        setStatusToupdate((prev) => {
            return next_status
        })
        if (is_last) {
            setStatusToupdate(next_status)
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





interface TaskUpdateStatusModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    task: TasksResponse
    user: AppUser
    page_idx: number
    new_status: TasksResponse['status']
}

export const TaskUpdateStatusModal = ({ open, setOpen, new_status, task, user, page_idx }: TaskUpdateStatusModalProps) => {
    const queryClient = useQueryClient()
    const [error, setError] = useState({ name: "", message: "" })
    // console.log("new status to update === ",new_status)

    function newStatus(sts: TasksResponse['status'], task_type: TasksResponse['type']): TasksResponse {
        console.log("new status checker  ==== ",sts,task.type)
        if (task_type === "repairs") {
            if (sts === "approved") {
                return { ...task, status: sts, approved_by: user?.id }
            }
            if (sts === "funded") {
                return { ...task, status: sts, funded_by: user?.id }
            }
            if (sts === "in_progress") {
                return { ...task, status: sts, marked_in_progress_by: user?.id }
            }
            if (sts === "rejected") {
                return { ...task, status: sts, rejected_by: user?.id }
            }
        }

        if (sts === "completed") {
            return { ...task, status: sts, marked_completed_by: user?.id }
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
            setError({ name: "", message: concatErrors(error) });
        },
        onSuccess(data, variables, context) {
            queryClient.setQueryData<TasksResponse | undefined>(['tasks', data.id],
                (oldData) => {
                    if (data) return data
                    return oldData
                })
            //  close the modal
            setOpen(false)
        },


    })

    return (
        <ReactModalWrapper
            child={
                <div className="w-full  h-full flex flex-col items-center justify-center ">

                    <IconContext.Provider value={{ size: "40px" }}>
                        <div className="w-full md:w-[40%] h-full md:h-[40%] flex flex-col items-center justify-center 
        rounded-2xl shadow-xl bg-slate-500 bg-opacity-60">
                            <div className="flex  items-center justify-center gap-5">
                                <button
                                    onClick={() => mutation.mutate(newStatus(new_status, task.type))}
                                    className="px-6 py-1 text-2xl text-white font-bold rounded-full shadow-lg 
                border-2 hover:border-green-600 hover:border-2 hover:text-green-300">
                                    Yes
                                </button>
                                <button
                                    onClick={() => setOpen(false)}
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
