import { Navigate, useRoutes} from "react-router-dom";
import Dashboard from "../Dashboard.jsx";
import DefaultLayout from "../components/DefaultLayout";
import GuestLayout from "../components/GuestLayout";
import NotFound from "../views/NotFound";
import Signup from "../views/Signup";
import Users from "../views/Users";
import UserForm from "../views/UserForm";
import Rooms from "../views/Rooms.jsx";
import RoomForm from "../views/RoomForm.jsx";
import LoginSignUp from "../views/LoginSignUp.jsx";
import Reservations from "../views/Reservations.jsx";
import ReservationsForm from "../views/ReservationsForm.jsx";
import LanguageSelector from "../components/LanguageSelector.jsx";

const  Router = () =>  {
    const routes = useRoutes([

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
                    element: <Dashboard/>,
    
                },
                {
                    path: '/rooms',
                    element: <Rooms/>
                },
                {
                    path: '/rooms/new',
                    element: <RoomForm key="roomCreate" />
                },
                {
                    path: '/rooms/:id',
                    element: <RoomForm key="roomUpdate" />
                },
                {
                    path: '/users',
                    element: <Users/>
                },
    
                {
                    path: '/users/new',
                    element: <UserForm key="userCreate" />
                },
                {
                    path: '/users/:id',
                    element: <UserForm key="userUpdate" />
                },
                {
                    path: '/reservations',
                    element: <Reservations/>
                },
                {
                    path: '/reservations/new',
                    element: <ReservationsForm key="reservationCreate" />
                },
                {
                    path: '/reservations/:id',
                    element: <ReservationsForm key="reservationUpdate" />
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
                },
                {
                    path: '/LanguageSelector',
                    element: <LanguageSelector/>
                }
            ]
        },
        {
            path: "*",
            element: <NotFound/>
        },
    ])
    return routes;
}

export default Router