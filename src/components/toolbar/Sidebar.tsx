import { AppUser } from "../../utils/types/base";

interface SidebarProps {
    user: AppUser
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Sidebar = ({user,setOpen}:SidebarProps) => {
return (
 <div className='w-full h-full flex items-center justify-center'>

 </div>
);
}
