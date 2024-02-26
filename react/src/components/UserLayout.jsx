import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";

import {FaHome, FaTasks, FaUsers} from "react-icons/fa";
import { MdRoomPreferences } from "react-icons/md";
import {BsCalendarDateFill} from "react-icons/bs";

export default function UserLayout() {
    const {user, token, setUser, setToken, notification} = useStateContext();

    if (!token) {
        return <Navigate to="/login"/>
    }

    const onLogout = ev => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }


    return (
        <div id="defaultLayout">
            <aside>
                <h2 id="heside"style={{ color:'white'}}>TAC-TIC</h2>
                <Link to="/tasksUser" ><FaHome style={{ width: '20px', height: '20px' }}/> Dashboard</Link>
                <Link to="/tasksUser" ><FaTasks style={{ width: '20px', height: '20px' }}/> TasksUser</Link>
                
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>

                    <div>
                        <div>
                        {user.name} &nbsp; &nbsp;
                        <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
                        </div>
                        <div>
               
                    </div>
                    </div>
                    
                </header>
                <main>
                    <Outlet/>
                </main>
                {notification &&
                    <div className="notification">
                        {notification}
                    </div>
                }
            </div>
        </div>
    )
}