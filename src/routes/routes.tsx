import { BrowserRouter, Route, Routes, createBrowserRouter} from 'react-router-dom';
import { AppUser } from '../types/base';
import { QueryClient } from '@tanstack/react-query';
import { Redirect } from '../components/auth/Redirect';
import { AuthLayout } from '../pages/auth/AuthLayout';
import { Login } from '../pages/auth/Login';
import { Signup } from '../pages/auth/Signup';
import { RootLayout } from '../pages/index/RootLayout';

import { TestLayout } from '../pages/test/TestLayout';
import { Test } from '../pages/test/Test';
import { ReactRouterError } from '../shared/errorboundary/ReactRouterError';
import { WelcomePage } from '../pages/index/WelcomePage';
import { HomeLayout } from './../pages/home/HomeLayout';
import { HomePage } from './../pages/home/HomePage';



export const appRoutes=(user:AppUser,qc:QueryClient)=>{

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
                {
                  path: '/auth/redirect',
                  element: <Redirect />,
                }
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
