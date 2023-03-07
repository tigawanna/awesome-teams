import { TasksResponse } from "../../utils/api/tasks";
import { AppUser } from "../../utils/types/base";

interface StatusManagerProps {
user:AppUser
task:TasksResponse
}

export const StatusManager = ({task,user}:StatusManagerProps) => {


return (
 <div className='w-full h-full flex flex-wrap items-center justify-center gap-2'>
{/* approve */}
        <div className="w-fit p-2 border flex rounded-xl gap-2">
<button className="w-full border rounded-xl px-2">Approve</button>
<button className="w-full border roundede-xl px-2">cancel</button>
</div>


        <button className="w-fit p-2 border rounded-xl"> fund </button>

        <button className="w-fit p-2 border rounded-xl">mark as in progress</button>

        <button className="w-fit p-2 border rounded-xl"> mark as completed</button>

 </div>
);
}
