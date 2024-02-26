import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getRooms();
    }, []);

    const getRooms = () => {
        axiosClient.get('/rooms')
            .then(({ data }) => {
                setRooms(data.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onDeleteClick = (roomId) => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            axiosClient.delete(`/rooms/${roomId}`)
                .then(() => {
                    setNotification('Room was successfully deleted');
                    getRooms(); // Refresh the list of rooms
                });
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h1 style={{ color: 'navy', fontSize: '36px', textAlign: 'center', margin: '20px 0', fontFamily: 'Arial, sans-serif' }}>
                Rooms
            </h1>
                <Link to="/rooms/new">Add New Room</Link>
            </div>
            {loading ? (
                <p>Loading rooms...</p>
            ) : (
                <div className="rooms-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px' }}>
                {rooms.map(room => (
                    <div className="room-card" key={room.id} style={{
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                        transition: '0.3s',
                        width: '300px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <img src={`../../public/images/${room.id}.jpg`} alt={room.name} style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover'
                        }} />
                        <div className="room-details" style={{
                            padding: '15px',
                            flexGrow: '1',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{room.name}</h3>
                            <p><strong>Capacity:</strong> {room.capacity}</p>
                            <p><strong>Availability:</strong> {room.available ? "Yes" : "No"}</p>
                            <p><strong>Description:</strong> {room.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', gap: '10px' }}>
                                <Link to={`/rooms/${room.id}`} style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '5px',
                                    textAlign: 'center'
                                }}>Edit</Link>
                                <button onClick={() => onDeleteClick(room.id)} style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            )}
        </div>
    );
}
