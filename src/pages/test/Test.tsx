import { AppUser } from "../../utils/types/base";

interface TestProps {
    user: AppUser
}

export const Test = ({user}:TestProps) => {
return (
 <div className='w-full h-full flex items-center justify-center
 text-4xl font-bold
   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
        TEST
 </div>
);
}
