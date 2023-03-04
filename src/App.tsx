import './App.css'
import { useQuery } from '@tanstack/react-query';
import { getUser } from './utils/pb/config';
import { RouterProvider } from 'react-router-dom';
import { appRoutes } from './routes/routes';
import { LoaderElipse } from './shared/loaders/Loaders';
import { QueryStateWrapper } from './shared/wrappers/QueryStateWrapper';

function App() {

const query = useQuery({queryKey:['user'],queryFn:getUser});
  
  return (
    // <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryStateWrapper query={query} loader={<LoaderElipse />}>
        <div className=" dark:bg-slate-900 h-full dark:text-white dark:shadow-white ">
          <RouterProvider router={appRoutes(query.data)} />
        </div>
        <div className="w-full h-full fixed bottom-3 flex items-center justify-center">
          {/* <Notification /> */}
        </div>
      </QueryStateWrapper>


  )
}

export default App
