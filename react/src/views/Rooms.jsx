import {useEffect, useState} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()
    //Pafination
    const [currentPage,setCurrentPage]= useState(1)
    const  recordsPerPage=10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = rooms.slice(firstIndex,lastIndex);
    const npage = Math.ceil(rooms.length / recordsPerPage)
    const numbers= [...Array(npage + 1).keys()].slice(1)
    useEffect(() => {
        getRooms();
    }, [])

    const onDeleteClick = room => {
        if (!window.confirm("Are you sure you want to delete this room?")) {
            return
        }
        axiosClient.delete(`/rooms/${room.id}`)
            .then(() => {
                setNotification('Room was successfully deleted')
                getRooms()
            })
    }

    const getRooms = () => {
        setLoading(true)
        axiosClient.get('/rooms')
            .then(({ data }) => {
                setLoading(false)
                setRooms(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                <h1>Rooms</h1>
                <Link className="btn-add" to="/rooms/new">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>capacity</th>
                        <th>Availabe</th>
                        <th>description</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    {loading &&
                        <tbody>
                        <tr>
                            <td colSpan="5" class="text-center">
                                Loading...
                            </td>
                        </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>

                        {records.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.capacity}</td>
                                <td>
                                    {u.available ? (
                                        <span style={{color: 'green', fontWeight: 'bold'}}>Available</span>
                                    ) : (
                                        <span style={{color: 'red', fontWeight: 'bold'}}>Unavailable</span>
                                    )}
                                </td>

                                <td>{u.description}</td>
                                <td>
                                    <Link className="btn-edit" to={'/rooms/' + u.id}>Edit</Link>
                                    &nbsp;
                                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    }
                </table>
                <nav>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <a href='#' className='page-link' onClick={prePage}>Prev</a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href='#' className='page-link' onClick={()=>changeCPage(n)}>
                                        {n}
                                    </a>

                                </li>
                            ))
                        }
                        <li className='page-item'>
                            <a href='#' className='page-link' onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
    function prePage (){
        if (currentPage !== 1){
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage(id){
        setCurrentPage(id)
    }
    function nextPage(){
        if(currentPage !== npage){
            setCurrentPage(currentPage +1)
        }
    }
}
