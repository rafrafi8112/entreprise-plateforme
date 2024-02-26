import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { FaHome, FaUsers, FaProjectDiagram, FaUserShield, FaTasks } from "react-icons/fa";
import { MdRoomPreferences } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import React from "react";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = () => {
        axiosClient.post('/logout').then(() => {
            setUser({});
            setToken(null);
        });
    };

    // Styles
    const linkStyle = {
        textDecoration: 'none',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        borderRadius: '30px',
        margin: '10px 0',
    };

    const linkHoverStyle = {
        ...linkStyle,
        backgroundColor: '#ffffff22', // semi-transparent white
    };

    // State for the hover effect
    const [hoverIndex, setHoverIndex] = React.useState(-1);

    const menuItems = [
        { to: "/dashboard", icon: <FaHome />, text: "Dashboard" },
        { to: "/rooms", icon: <MdRoomPreferences />, text: "Rooms" },
        { to: "/users", icon: <FaUsers />, text: "Users" },
        { to: "/reservations", icon: <BsCalendarDateFill />, text: "Reservations" },
        { to: "/projects", icon: <FaProjectDiagram />, text: "Projects" },
        { to: "/project-members", icon: <FaUserShield />, text: "Project Members" },
        { to: "/tasks", icon: <FaTasks />, text: "Tasks" },
    ];

    return (
        <div id="defaultLayout" style={{ display: 'flex' }}>
            <aside style={{
                
                minHeight: '100vh',
                width: '250px',
                padding: '20px'
            }}>
                <h2 id="heside" style={{ color: 'white', marginBottom: '30px' }}>TAC-TIC</h2>
                {menuItems.map((item, index) => (
                    <Link
                        to={item.to}
                        style={hoverIndex === index ? linkHoverStyle : linkStyle}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(-1)}
                        key={item.text}
                    >
                        {item.icon}
                        <span style={{ marginLeft: '20px' }}>{item.text}</span>
                    </Link>
                ))}
                <button onClick={onLogout} style={{
                    background: 'none',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    cursor: 'pointer',
                    marginTop: '20px'
                }}>
                    Logout
                </button>
            </aside>
            <div className="content" style={{ flex: 1 }}>
                <header style={{ /* Your header styles here */ }}>
                    {/* Header content */}
                </header>
                <main style={{ /* Your main content styles here */ }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
