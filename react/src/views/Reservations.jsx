import {useEffect, useState} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";

export default function Reservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()
    //Pafination
    const [currentPage,setCurrentPage]= useState(1)
    const  recordsPerPage=5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = reservations.slice(firstIndex,lastIndex);
    const npage = Math.ceil(reservations.length / recordsPerPage)
    const numbers= [...Array(npage + 1).keys()].slice(1)
    useEffect(() => {
        getReservations();
    }, [])

    const onDeleteClick = reservation => {
        if (!window.confirm("Are you sure you want to delete this room?")) {
            return
        }
        axiosClient.delete(`/reservations/${reservation.id}`)
            .then(() => {
                setNotification('reservation was successfully deleted')
                getReservations()
            })
    }

    const getReservations = () => {
        setLoading(true)
        axiosClient.get('/reservations')
            .then(({ data }) => {
                console.log("reservations",data)
                setLoading(false)
                setReservations(data.data)
            })
            .catch(() => {
                setLoading(false)
            })

    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                <h1>Reservations</h1>
                <Link className="btn-add" to="/reservations/new">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>start_time</th>

                        <th>end_time</th>
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
                                <td>{u.start_time}</td>
                                <td>{u.end_time}</td>

                                <td>
                                    <Link className="btn-edit" to={'/reservations/' + u.id}>Edit</Link>
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
