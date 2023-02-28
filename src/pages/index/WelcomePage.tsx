import { Hero } from '../../components/index/Hero';
import { AppUser } from '../../utils/types/base';


interface WelcomePageProps {
  user?: AppUser;
}

export const WelcomePage = () => (
  <div className="w-full h-full flex flex-col justify-start items center dark:bg-slate-900">
    <Hero />
  </div>
);
