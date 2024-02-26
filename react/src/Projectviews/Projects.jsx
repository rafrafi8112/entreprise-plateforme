import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = projects.slice(firstIndex, lastIndex);
    const npage = Math.ceil(projects.length / recordsPerPage);
    const pageNumbers = [...Array(npage + 1).keys()].slice(1);

    useEffect(() => {
        getProjects();
    }, []);

    const onDeleteClick = (project) => {
        if (!window.confirm("Are you sure you want to delete this project?")) {
            return;
        }
        axiosClient.delete(`/projects/${project.id}`)
            .then(() => {
                setNotification('Project was successfully deleted');
                setProjects(prevProjects => prevProjects.filter(p => p.id !== project.id)); // Update state locally
            });
    };

    const getProjects = () => {
        setLoading(true);
        axiosClient.get('/projects')
            .then(({ data }) => {
                setLoading(false);
                setProjects(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Projects</h1>
                <Link to="/projects/new">Add new</Link>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                    {currentRecords.map(project => (
                        <div key={project.id} style={{ padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,.2)', borderRadius: '5px', width: '300px', background: 'white', margin: '10px' }}>
                            <h3>{project.name}</h3>
                            <p>Description: {project.description}</p>
                            <p>Manager ID: {project.manager_id}</p>
                            <p>Status: {project.status}</p>
                            <p>Start Date: {project.start_date}</p>
                            <p>End Date: {project.end_date}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <Link to={`/projects/${project.id}`}style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '5px',
                                    textAlign: 'center'
                                }}>Edit</Link>
                                <button onClick={() => onDeleteClick(project)}style={{
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
            <nav style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <ul className='pagination'>
                    <li className='page-item'>
                        <button className='page-link' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                    </li>
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <button className='page-link' onClick={() => handlePageChange(number)}>
                                {number}
                            </button>
                        </li>
                    ))}
                    <li className='page-item'>
                        <button className='page-link' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === npage}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
