
import { AppUser } from "../../utils/types/base";

interface HomePageProps {
user:AppUser
}

export const HomePage = ({}:HomePageProps) => {
return (
    <div className='w-full h-full 
    flex items-center justify-center
    bg-gradient-to-r from-purple-900 via-slate-500 to-orange-800
    '>
    <div className="p-4 text-4xl font-bold">
        HELLO
    </div>
 </div>
);
}
