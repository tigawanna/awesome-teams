
import { ToDoForm } from "../../components/todo/ToDoForm";
import { AppUser } from "../../utils/types/base";

interface HomePageProps {
user:AppUser
}

export const HomePage = ({}:HomePageProps) => {
return (
    <div className='w-full h-full bg-red-800  flex items-center justify-center'>
         <ToDoForm/>
    </div>
);
}
