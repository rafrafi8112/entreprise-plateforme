import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import Loading from './Loading'; 
export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentUsers = users.slice(firstIndex, lastIndex);
    const npage = Math.ceil(users.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    useEffect(() => {
        getUsers();
    }, []);

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

    const prePage = () => setCurrentPage(current => Math.max(current - 1, 1));
    const nextPage = () => setCurrentPage(current => Math.min(current + 1, npage));
    const changeCPage = (id) => setCurrentPage(id);

    const cardStyle = {
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        width: '300px',
        background: 'white',
        marginBottom: '20px' // Ensure spacing between cards
    };

    const tableStyle = {
        width: '100%',
        marginBottom: '20px',
        borderCollapse: 'collapse'
    };

    const thTdStyle = {
        padding: '8px',
        border: '1px solid #ddd',
        textAlign: 'left'
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ color: 'navy', fontSize: '36px', textAlign: 'center', margin: '20px 0', fontFamily: 'Arial, sans-serif' }}>Users</h1>
                <div>
                    <button className="btn-add" style={{ background: '#007bff' }}onClick={() => setViewMode('cards')}>Cards View</button>
                    <button className="btn-add" style={{ background: '#007bff' }}onClick={() => setViewMode('table')}>Table View</button>
                    <Link className="btn-add" to="/users/new">Add new</Link>
                </div>
            </div>
            {loading ?  <Loading message="Loading Users..." /> : viewMode === 'cards' ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
                    {currentUsers.map(user => (
                        <div key={user.id} style={cardStyle}>
                            <div style={{ marginBottom: '10px', fontSize: '20px', fontWeight: 'bold' }}>{user.name}</div>
                            <div style={{ marginBottom: '5px' }}><strong>Email:</strong> {user.email}</div>
                            <div style={{ marginBottom: '5px' }}><strong>Group:</strong> {user.group}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Link to={`/users/${user.id}`} style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '5px',
                                    textAlign: 'center'
                                }}>Edit</Link>
                                <button onClick={() => onDeleteClick(user)} style={{
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
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thTdStyle}>Name</th>
                            <th style={thTdStyle}>Email</th>
                            <th style={thTdStyle}>Group</th>
                            <th style={thTdStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user.id}>
                                <td style={thTdStyle}>{user.name}</td>
                                <td style={thTdStyle}>{user.email}</td>
                                <td style={thTdStyle}>{user.group}</td>
                                <td style={thTdStyle}>
                                    <Link to={`/users/${user.id}`} style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '5px',
                                    textAlign: 'center'
                                }}>Edit</Link>
                                    <button onClick={() => onDeleteClick(user)} style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
