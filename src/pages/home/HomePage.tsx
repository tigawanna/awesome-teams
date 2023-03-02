
import { AppUser } from "../../utils/types/base";

interface HomePageProps {
user:AppUser
}

export const HomePage = ({}:HomePageProps) => {
return (
 <div className='w-full min-h-screen'>
<div className="h-full w-full bg-green-500 p-4">
    HELLO
</div>
 </div>
);
}
