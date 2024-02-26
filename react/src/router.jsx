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
import ProjectMembers from "./Projectviews/ProjectMembers.jsx";
import ProjectMembersForm from "./Projectviews/ProjectMembersForm.jsx";
import Taskes from "./Projectviews/Taskes.jsx";
import TaskesForm from "./Projectviews/TaskesForm.jsx";
import UserTaskes from "./Projectviews/UserTaskes.jsx";
import UserTaskesForm from "./Projectviews/UserTaskesForm.jsx";


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
            {
                path: '/project-members',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                          <ProjectMembers/>
                    </ProtectedRoute>
                    ) ,
            },
            {
                path: '/project-members/new',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                        <ProjectMembersForm key="ProjectMemberCreate" />
                    </ProtectedRoute>
                    ) ,
                
            },
            {
                path: '/project-members/:id',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                        element: <ProjectMembersForm key="ProjectMemberUpdate" />
                    </ProtectedRoute>
                    ) ,
            },
            {
                path: '/tasks',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                          <Taskes/>
                    </ProtectedRoute>
                    ) ,
            },
            {
                path: '/tasks/new',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                        <TaskesForm key="TaskCreate" />
                    </ProtectedRoute>
                    ) ,
                
            },
            {
                path: '/tasks/:id',
                element:(
                    <ProtectedRoute allowedRoles={['admin']}>
                        element: <TaskesForm key="TaskUpdate" />
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
                path: '/signup',
                element: <Signup/>
            }
           
        ]
    },
    {
        path: '/',
        element: <UserLayout/>,
        children: [
            {
                path: '/tasksUser',
                element: <UserTaskes/>
            },
            {
                path: '/tasksUser/:id',
                element: <UserTaskesForm key="TaskUpdate"/>
            },
            
        ]
    },
 
    {
        path: '/login',
        element: <LoginSignUp/>
    },
   

    {
        path: "*",
        element: <NotFound/>
    },
])

export default router;
