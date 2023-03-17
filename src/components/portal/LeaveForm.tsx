import { useMutation } from "@tanstack/react-query";
import { FormInput } from "../../shared/form/FormInput";
import { FormSelect } from "../../shared/form/FormSelect";
import { FormTextArea } from "../../shared/form/FormTextArea";
import { useCustomForm } from "../../shared/form/useCustomForm";
import { StaffLeaveMutationFields, StaffLeaveResponse, addStaffLeaveRequest } from "../../utils/api/staff";
import { concatErrors } from "../../utils/utils";
import { AppUser } from "../../utils/types/base";
import { PlainFormButton } from "../../shared/form/FormButton";
import { useStroreValues } from "../../utils/zustand/store";


interface LeaveFormProps {
user:AppUser
setOpen:React.Dispatch<React.SetStateAction<boolean>>
}

export function LeaveForm({user,setOpen}:LeaveFormProps){



function getDayString(days_later:number){
    const today = new Date();
    today.setDate(today.getDate() + days_later);
    return today.toISOString().split('T')[0];
}
 const store = useStroreValues()

const mutation = useMutation({
        mutationFn: (input:StaffLeaveMutationFields) => addStaffLeaveRequest(input),
        onError(error, variables, context) {
            setError({ name: "main", message: concatErrors(error) });
        },
        onSuccess(data, variables, context) {
            store.updateNotification({type:"success",message:"leave request successfully sent"})
            setOpen(false)
        },
})

    const { error, handleChange, input, setError, setInput, handleSubmit, success }
        =
        useCustomForm<StaffLeaveMutationFields, StaffLeaveResponse>({
            initialValues: {
                // user defined
                leave_type: "annual",
                leave_reason: "attending to personal matter",
                leave_start: getDayString(0),
                leave_end: getDayString(3),

                // backend defined

                leave_request_status: "pending",
                leave_requested_by: user?.id as string,
                remaining_leave_days: 7,
                remaining_sick_leave_days: 28

            },mutation
     })



    const leave_type_options = [
    { value: 'annual', label: 'Annual' },
    { value: 'sick', label: 'Sick' },
    { value: 'maternity', label: 'Maternity' },
    { value: 'other', label: 'Other' },
    ]



return (
 <div className='w-full h-full md:p-10 rounded-xl
 flex items-center justify-center 
 bg-slate-300 dark:bg-slate-900 bg-opacity-60'>
    
    <div className="w-[100%] md:w-[60%] h-full dark:text-white">
    <form onSubmit={handleSubmit}
    className="w-full h-full flex flex-col items-center justify-center p-2 ">
    
        <FormSelect<StaffLeaveMutationFields>
                error={error}
                input={input}
                label="Leave Type"
                prop="leave_type"
                    select_options={leave_type_options}
                setInput={setInput}
             />
            <div className="w-[100%] p-2 flex items-center justify-center">
                <FormInput
                    error={error}
                    handleChange={handleChange}
                    input={input}
                    label="from"
                    prop="leave_start"
                    type="date"
                    input_props={{
                        min: new Date().toISOString().split('T')[0],
                        max: new Date('2025').toISOString().split('T')[0],
                        style: {
                            minWidth: "40%",
                        }
                    }}
                />
                <FormInput
                    error={error}
                    handleChange={handleChange}
                    input={input}
                    label="to"
                    prop="leave_end"
                    type="date"
                    input_props={{
                        min: new Date().toISOString().split('T')[0],
                        max: new Date('2025').toISOString().split('T')[0],
                        style: {
                            minWidth: "40%",
                        }
                    }}
                />
                </div>

                <FormTextArea
                    error={error}
                    handleChange={handleChange}
                    input={input}
                    label="Leave  Reason"
                    prop="leave_reason"
                />

                <PlainFormButton
                    disabled={mutation.isPending}
                    isSubmitting={mutation.isPending}
                    label="Submit"
                />

                <div className="m-1 w-[90%] flex  flex-col items-center justify-center">
                    {error?.message !== "" ? (
                        <div
                        className="m-1 w-full text-center  line-clamp-4 p-2 bg-red-100 border-2 
                        border-red-800 text-red-900  rounded-xl">
                            {error.message}
                        </div>
                    ) : null}
                </div>
                <div className="m-1 w-[90%] flex  flex-col items-center justify-center">
                    {success&&(
                        <div
                        className="m-1 w-full text-center  line-clamp-4 p-2  border-2 
                        border-green-800 text-green-900  rounded-xl animate-in fade-in"
                        >Leave request sent
                        </div>
                    )}  
                </div>

    </form> 

    </div>

 </div>
);
}
