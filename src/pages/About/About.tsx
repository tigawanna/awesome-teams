
import { AppUser } from '../../utils/types/base';

interface AboutProps {
user:AppUser
}

export const About= ({}:AboutProps) => {
  return (
    <div className='w-full h-full flex items-center justify-center
    bg-gradient-to-r from-purple-900 via-slate-500 to-orange-800
 '>    ABOUT
    </div>
  );
};


