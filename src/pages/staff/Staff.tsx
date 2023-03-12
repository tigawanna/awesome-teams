import { StaffList } from "../../components/staff/StaffList";
import { AppUser } from "../../utils/types/base";

interface StaffProps {
user:AppUser
}

export const Staff= ({}:StaffProps) => {
  return (
    <div className='w-full h-full'>
     <StaffList/>
    </div>
  );
};


