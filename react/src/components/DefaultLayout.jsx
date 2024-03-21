import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { FaHome, FaUsers, FaProjectDiagram, FaUserShield, FaTasks ,FaChevronDown, FaChevronRight,FaCarAlt} from "react-icons/fa";
import { MdRoomPreferences } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import{ useState } from 'react';
export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = () => {
        axiosClient.post('/logout').then(() => {
            setUser({});    
            setToken(null); 
        });
    };

    const linkStyle = {
        textDecoration: 'none',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        borderRadius: '30px',
        margin: '10px 0',
    };

    const subItemStyle = {
        ...linkStyle,
        paddingLeft: '30px', // Increase padding for subitems to indicate nesting
    };

    const linkHoverStyle = {
        ...linkStyle,
        backgroundColor: '#ffffff22',
    };

    const [hoverIndex, setHoverIndex] = React.useState(-1);

    const [expandedItems, setExpandedItems] = useState({});

    const handleToggle = (index) => {
        setExpandedItems(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

        
    const menuItems = [
        { 
            to: "/dashboard", 
            icon: <FaHome />, 
            text: "Dashboard",
            subItems: [
                { to: "/users", icon: <FaUsers />, text: "Users" }
            ]
        },
        { 
            to: "/reservations", 
            icon: <BsCalendarDateFill />, 
            text: "Reservations", 
            subItems: [
                { to: "/rooms", icon: <MdRoomPreferences />, text: "Rooms" }
            ] 
        },
        { 
            to: "/projects", 
            icon: <FaProjectDiagram />, 
            text: "Projects", 
            subItems: [
                { to: "/project-members", icon: <FaUserShield />, text: "Project Members" }, 
                { to: "/tasks", icon: <FaTasks />, text: "Tasks" }
            ] 
        },
        { 
            to: "/vehicles", 
            icon: <FaCarAlt />, 
            text: "Vehicles", 
            subItems: [
                { to: "/tasks", icon: <FaTasks />, text: "Tasks" }
            ] 
        },
    ];
    
    const handleMouseEnter = (index, subIndex = null) => {
        setHoverIndex(subIndex !== null ? `${index}-${subIndex}` : index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };
    return (
        <div id="defaultLayout" style={{ display: 'flex' }}>
        <aside style={{ minHeight: '100%', width: '200px', padding: '20px' }}>

            <h2 id="heside" style={{ color: 'white', marginBottom: '30px' }}>TAC-TIC</h2>
            {menuItems.map((item, index) => (
                <div key={item.text}>
                    <Link
                        to={item.to}
                        style={hoverIndex === index ? linkHoverStyle : linkStyle}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(-1)}
                        onClick={() => item.subItems && handleToggle(index)}
                    >
                        {item.icon}
                        <span style={{ marginLeft: '20px' }}>{item.text}</span>
                        {item.subItems && (expandedItems[index] ? <FaChevronDown /> : <FaChevronRight />)}
                    </Link>
                    {item.subItems && expandedItems[index] && item.subItems.map((subItem, subIndex) => (
                <Link
                    to={subItem.to}
                    style={hoverIndex === `${index}-${subIndex}` ? linkHoverStyle : subItemStyle}
                    onMouseEnter={() => handleMouseEnter(index, subIndex)}
                    onMouseLeave={handleMouseLeave}
                    key={subItem.text}
                >
                    {subItem.icon}
                    <span style={{ marginLeft: '20px' }}>{subItem.text}</span>
                </Link>
                    ))}
                </div>
            ))}
            <button onClick={onLogout} className="logout-button">
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
