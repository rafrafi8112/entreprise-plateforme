import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import Rooms from "./views/Rooms.jsx";
import RoomForm from "./views/RoomForm.jsx";
import LoginSignUp from "./views/LoginSignUp.jsx";
import Reservations from "./views/Reservations.jsx";
import ReservationsForm from "./views/ReservationsForm.jsx";
import UserLayout from "./components/UserLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Projects from "./Projectviews/Projects.jsx";
import ProjectsForm from "./Projectviews/ProjectsForm.jsx";
const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/users"/>
            },
            {
                path: '/dashboard', 
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                                <Dashboard/>
                    </ProtectedRoute>
                    ) ,

            },
            {
                path: '/rooms',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                                <Rooms/>
                    </ProtectedRoute>
                    ) ,
            },
            {
                path: '/rooms/new',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                             <RoomForm key="roomCreate" />
                    </ProtectedRoute>
                    ) ,
            },
            {
                path: '/rooms/:id',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                            <RoomForm key="roomUpdate" />
                    </ProtectedRoute>
                    ) ,
            },
            {
                path: '/users',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                           <Users/>
                    </ProtectedRoute>
                    ) ,
            },

            {
                path: '/users/new',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                           <UserForm key="userCreate" />
                    </ProtectedRoute>
                    ) ,
            },
            {
                path: '/users/:id',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                          <UserForm key="userUpdate" />
                    </ProtectedRoute>
                    ) ,
            },
            {
                path: '/reservations',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                          <Reservations/>
                    </ProtectedRoute>
                    ) ,
            },
            {
                path: '/reservations/new',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                        <ReservationsForm key="reservationCreate" />
                    </ProtectedRoute>
                    ) ,
                
            },
            {
                path: '/reservations/:id',
               
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                        element: <ReservationsForm key="reservationUpdate" />
                    </ProtectedRoute>
                    ) ,
            },
            {
                path: '/projects',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                          <Projects/>
                    </ProtectedRoute>
                    ) ,
            },
            {
                path: '/projects/new',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                        <ProjectsForm key="projectCreate" />
                    </ProtectedRoute>
                    ) ,
                
            },
            {
                path: '/projects/:id',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                        element: <ProjectsForm key="projectUpdate" />
                    </ProtectedRoute>
                    ) ,
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <LoginSignUp/>
            },
            {
                path: '/signup',
                element: <Signup/>
            }
           
        ]
    },
    {
        path: '/user',
        element: <UserLayout/>,
        children: [
         
           
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    },
    {
        path: '/google/login',
        element: <Navigate to="/google/login" />
    },
    {
        path: '/google/redirect',
        element: <Navigate to="/google/redirect" />
    },
])

export default router;
