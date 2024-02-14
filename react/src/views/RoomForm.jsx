import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function RoomForm() {
    const navigate = useNavigate();
    let {id} = useParams();
    const [room, setRoom] = useState({
        id: null,
        name: '',
        capacity: '',
        description: '',
        available: true
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/rooms/${id}`)
                .then(({data}) => {
                    setLoading(false)
                    setRoom(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = ev => {
        console.log(room);
        ev.preventDefault()
        if (room.id) {

            axiosClient.put(`/rooms/${room.id}`, room)

                .then(() => {
                    setNotification('Room was successfully updated')
                    navigate('/rooms')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            console.log('Updating room with data:', room);

            axiosClient.post('/rooms', room)
                .then(() => {
                    setNotification('Room was successfully created')
                    navigate('/rooms')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    return (
        <>
            {room.id && <h1>Update User: {room.name}</h1>}
            {!room.id && <h1>New Room</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    <form onSubmit={onSubmit} className="room-form">
                        <div className="form-group">
                            <label htmlFor="roomName">Name:</label>
                            <input value={room.name} onChange={ev => setRoom({...room, name: ev.target.value})}
                                placeholder="Name"/>
                        </div>
                        
                      
                        <div className="form-group">
                     <label htmlFor="roomDescription">Description:</label>
                             <input value={room.description} onChange={ev => setRoom({...room, description: ev.target.value})}
                               placeholder="description"/>

                        </div>
                        <div className="form-group">
                               
                               <div className="number-input">
                        <label htmlFor="roomCapacity">Capacity:         </label>
                                   <button
                                   type="button"
                                   onClick={() => setRoom({ ...room, capacity: Math.max(0, room.capacity - 1) })}
                                   >
                                   –
                                   </button>
                                   <input
                                   type="number"
                                   value={room.capacity}
                                   onChange={ev => setRoom({ ...room, capacity: Math.max(0, parseInt(ev.target.value)) })}
                                   placeholder="0"
                                   min="0" // minimum value
                                   />
                                   <button
                                   type="button"
                                   onClick={() => setRoom({ ...room, capacity: room.capacity + 1 })}
                                   >
                                   +
                                   </button>
                               </div>

                       </div>
                        
                                
                        
                       

                        <button className="btn">Save</button>

                    </form>
                )}
            </div>
        </>
    )
}
