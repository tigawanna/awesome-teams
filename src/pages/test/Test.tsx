import { AppUser } from "../../utils/types/base";

interface TestProps {
    user: AppUser
}

export const Test = ({user}:TestProps) => {
    
return (
 <div className='w-full h-full min-h-screen flex items-center justify-center'>
            test
 </div>
);
}


