
import { FaPlus } from "react-icons/fa";
import { TaskForm } from "../../components/tasks/TaskForm";
import { Tasks } from "../../components/tasks/Tasks";
import { TheIcon } from "../../shared/wrappers/TheIcon";
import { AppUser } from "../../utils/types/base";
import { Link } from "react-router-dom";

interface HomePageProps {
user:AppUser
}

export const HomePage = ({}:HomePageProps) => {
return (
    <div className='w-full h-full min-h-screen  flex items-center justify-center'>
         {/* <TaskForm/> */}
         <Tasks/>
        <Link 
        to={'/io'}
        className='w-fit flex-center rounded-full aspect-square  p-2 bg-purple-900 text-white 
             fixed bottom-[10%] right-[5%]'>
            <TheIcon Icon={FaPlus} size={'40'}/>
        </Link>
    </div>
);
}
