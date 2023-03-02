
import { FullHeight } from '../../components/extras/FullHeight';
import { AppUser } from '../../utils/types/base';

interface AboutProps {
user:AppUser
}

export const About= ({}:AboutProps) => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center '> 
      <FullHeight/>
      <FullHeight />
      <FullHeight />
      <FullHeight />
    </div>
  );
};


