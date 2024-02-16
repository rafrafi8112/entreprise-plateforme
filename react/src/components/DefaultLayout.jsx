import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";

import {FaHome, FaUsers,FaRProject,FaUserShield} from "react-icons/fa";
import { MdRoomPreferences } from "react-icons/md";
import {BsCalendarDateFill} from "react-icons/bs";

export default function DefaultLayout() {
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
                <Link to="/dashboard" ><FaHome style={{ width: '20px', height: '20px' }}/> Dashboard</Link>
                <Link to="/rooms"><MdRoomPreferences style={{ width: '20px', height: '20px' }}/>Rooms</Link>
                <Link to="/users"><FaUsers style={{ width: '20px', height: '20px' }} /> Users</Link>
                <Link to="/reservations"><BsCalendarDateFill style={{ width: '20px', height: '20px' }} /> Reservations</Link>
                <Link to="/projects"><FaRProject   style={{ width: '20px', height: '20px' }} /> Projects</Link>
                <Link to="/project-members"><FaUserShield style={{ width: '20px', height: '20px' }} /> project Members</Link>
              
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
