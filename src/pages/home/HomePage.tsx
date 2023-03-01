
import { AppUser } from "../../utils/types/base";

interface HomePageProps {
user:AppUser
}

export const HomePage = ({}:HomePageProps) => {
return (
 <div className='w-full '>
<div className="h-full w-full bg-green-500">
    hello
</div>
 </div>
);
}
