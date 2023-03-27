import {  createBrowserRouter} from 'react-router-dom';
import { AppUser } from '../utils/types/base';

import { AuthLayout } from '../pages/auth/AuthLayout';
import { Login } from '../pages/auth/Login';
import { Signup } from '../pages/auth/Signup';
import { RootLayout } from '../pages/index/RootLayout';
import { ReactRouterError } from '../shared/errorboundary/ReactRouterError';
import { HomeLayout } from './../pages/home/HomeLayout';
import { HomePage } from './../pages/home/HomePage';
import { OneTask } from '../components/tasks/OneTask';


import { Suspense, lazy } from 'react';
import { LoaderElipse } from '../shared/loaders/Loaders';
import OneLeave from '../pages/portal/OneLeave';

const Portal = lazy(() => import('../pages/portal/Portal'));
const PortalLayout = lazy(() => import('../pages/portal/PortalLayout'));

const Staff = lazy(() => import('../pages/staff/Staff'));
const StaffLayout = lazy(() => import('../pages/staff/StaffLayout'));

const Test = lazy(() => import('../pages/test/Test'));
const TestLayout = lazy(() => import('../pages/test/TestLayout'));


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
                path:':id',
                element:<OneTask user={user}/>
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
              path: '/staff',
      
              element: 
                <Suspense fallback={<LoaderElipse />}>
                  <StaffLayout user={user} />
                </Suspense>,

              children: [
                {
                  index: true,
                  element: 
                  <Suspense fallback={<LoaderElipse />}>
                  <Staff user={user} />
                  </Suspense>,
                  // loader: deferredBlogPostsLoader,
                },
                
              ],
            },
            {
              path: '/portal',
              element: 
                <Suspense fallback={<LoaderElipse />}>
                  <PortalLayout user={user} />
                </Suspense>,

               children: [
                {
                  index: true,
                  element: 
                  <Suspense fallback={<LoaderElipse/>}>
                    <Portal user={user} />,
                  </Suspense>
                  // loader: deferredBlogPostsLoader,
                },
                 {
                   path:':id',
                   element:
                     <Suspense fallback={<LoaderElipse />}>
                       <OneLeave user={user} />
                     </Suspense>
                   // loader: deferredBlogPostsLoader,
                 },

              ],
            },

            {
              path: '/test',
              element:
                <Suspense fallback={<LoaderElipse />}> 
              <TestLayout user={user} />
              </Suspense>,
              children: [
                {
                  index: true,
                  element: 
                  <Suspense fallback={<LoaderElipse />}>
                  <Test user={user} />
                  </Suspense>,
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
