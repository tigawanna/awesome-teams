import {  createBrowserRouter} from 'react-router-dom';
import { AppUser } from '../utils/types/base';

import { AuthLayout } from '../pages/auth/AuthLayout';
import { Login } from '../pages/auth/Login';
import { Signup } from '../pages/auth/Signup';
import { RootLayout } from '../pages/index/RootLayout';
import { TestLayout } from '../pages/test/TestLayout';
import { Test } from '../pages/test/Test';
import { ReactRouterError } from '../shared/errorboundary/ReactRouterError';
import { HomeLayout } from './../pages/home/HomeLayout';
import { HomePage } from './../pages/home/HomePage';
import { TasksEdit } from '../pages/home/TasksEdit';



export const appRoutes=(user:AppUser)=>{

   return createBrowserRouter([
        {
          path: '/',
          element: <RootLayout user={user}  />,
          errorElement: <ReactRouterError />,
          children: [
            { 
              element: <HomeLayout user={user}/>,
              children:[
              {
                index:true,
                element:<HomePage user={user}/>
              },
              {
                path:"/io",
                element:<TasksEdit user={user}/>
              }
            ]
            },

       
       
            // /authentication routes 
            {
              path: '/auth',
              element: <AuthLayout user={user} />,
              children: [
                {
                  index: true,
                  element: <Login />,
           
                },
                {
                  path: '/auth/signup',
                  element: <Signup />,
                },
      
              ],
            },
   


            {
              path: '/test',
              element: <TestLayout user={user} />,
              children: [
                {
                  index: true,
                  element: <Test user={user} />,
                  // loader: deferredBlogPostsLoader,
                },
              ],
            },




          ],
        },
      ]);
}


// const oldRoutesWithBrowserRouter=(user:PBUser)=>{
//   return (
//     <BrowserRouter >
//       <Routes >

//         <Route path="/" element={<RootLayout user={user} test_mode={false} />}>
//           <Route index element={<Timeline user={user} profile='general' />} />
//         </Route>


//         {/* auth routes */}
//         <Route path="/auth" element={<AuthLayout user={user} />}>
//           <Route index element={<Login user={user} />} />
//           <Route path="/auth/redirect" element={<Redirect />} />
//         </Route>

//         {/* post route  */}
//         <Route path="/post" element={<PostLayout user={user} />}>
//           <Route path=":id" element={<Post user={user} />} />
//         </Route>

//         {/* profile route  */}
//         <Route path="/profile" element={<ProfileLayout user={user} />}>
//           <Route path=":id" element={<Profile user={user} />} />
//         </Route>

//         <Route path="/test" element={<TestLayout user={user} />}>
//           <Route index element={<Test user={user} />} />
//         </Route>

//       </Routes>
//     </BrowserRouter>
//   )
// }
