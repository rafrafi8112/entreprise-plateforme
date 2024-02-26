import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = users.slice(firstIndex, lastIndex);
    const npage = Math.ceil(users.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    useEffect(() => {
        getUsers();
    }, []);

    const onDeleteClick = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/users/${user.id}`)
            .then(() => {
                setNotification('User was successfully deleted');
                getUsers();
            });
    };

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const changeCPage = (id) => {
        setCurrentPage(id);
    };

    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ color: 'navy', fontSize: '36px', textAlign: 'center', margin: '20px 0', fontFamily: 'Arial, sans-serif' }}>Users</h1>
                <Link className="btn-add" to="/users/new">Add new</Link>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
                    {records.map(user => (
                        <div key={user.id} style={{ padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', width: '300px', background: 'white' }}>
                            <div style={{ marginBottom: '10px', fontSize: '20px', fontWeight: 'bold' }}>{user.name}</div>
                            <div style={{ marginBottom: '5px' }}><strong>Email:</strong> {user.email}</div>
                            <div style={{ marginBottom: '5px' }}><strong>Group:</strong> {user.group}</div>
                            <div style={{ marginBottom: '15px' }}><strong>Created At:</strong> {user.created_at}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Link className="btn-edit" to={'/users/' + user.id}style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '5px',
                                    textAlign: 'center'
                                }}>Edit</Link>
                                <button className="btn-delete"  onClick={() => onDeleteClick(user)} style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <button className='page-link' onClick={prePage}>Prev</button>
                    </li>
                    {numbers.map((n, i) => (
                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                            <button className='page-link' onClick={() => changeCPage(n)}>
                                {n}
                            </button>
                        </li>
                    ))}
                    <li className='page-item'>
                        <button className='page-link' onClick={nextPage}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
