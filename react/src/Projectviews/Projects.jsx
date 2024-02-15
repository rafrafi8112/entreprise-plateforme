import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()
    //Pafination
    const [currentPage,setCurrentPage]= useState(1)
    const  recordsPerPage=10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = projects.slice(firstIndex,lastIndex);
    const npage = Math.ceil(projects.length / recordsPerPage)
    const numbers= [...Array(npage + 1).keys()].slice(1)
    useEffect(() => {
        getProjects();
    }, [])

    const onDeleteClick = project => {
        if (!window.confirm("Are you sure you want to delete this project?")) {
            return
        }
        axiosClient.delete(`/projects/${project.id}`)
            .then(() => {
                setNotification('Project was successfully deleted')
                setProjects()
            })
    }

    const getProjects = () => {
        setLoading(true)
        axiosClient.get('/projects')
            .then(({ data }) => {
                setLoading(false)
                setProjects(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                <h1>Projects</h1>
                <Link className="btn-add" to="/projects/new">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                    <tr>
                        
                        <th>Name</th>
                        <th>Description</th>
                        <th>Manager</th>
                        <th>Status</th>
                        <th>start_date</th>
                        <th>end_date</th>
                        <th>Actions</th>
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
                                <td>{u.name}</td>
                                <td>{u.description}</td>
                                <td>{u.manager_id}</td>
                                <td>{u.status}</td>
                                <td>{u.start_date}</td>
                                <td>{u.start_date}</td>
                                <td>
                                    <Link className="btn-edit" to={'/projects/' + u.id}>Edit</Link>
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

