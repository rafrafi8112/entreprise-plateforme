import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Taskes() {
    const [tasks, setTaskes] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()
    //Pafination
    
    useEffect(() => {
        getProjects();
        console.log('im hereee');
    }, [])

    const onDeleteClick = task => {
        if (!window.confirm("Are you sure you want to delete this project?")) {
            return
        }
        axiosClient.delete(`/tasks/${task.id}`)
       
            .then(() => {
                setNotification('tasks was successfully deleted')
                const updatedTasks = tasks.filter(t => t.id !== task.id);
                setTaskes(updatedTasks);
            })
    }

    const getProjects = () => {
        setLoading(true)
        axiosClient.get('/tasks')
            .then(({ data }) => {
                setLoading(false)
                setTaskes(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }
    
    return (
        <div>
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                <h1>Taskes 


                </h1>
                <Link className="btn-add" to="/tasks/new">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                    <tr>
                        
                        <th>Name</th>
                        <th>Description</th>
                        <th>Project</th>
                        <th>Employer</th>
                        <th>Status</th>
                        <th>start_date</th>
                       
                        <th>Actions</th>
                    </tr>
                    </thead>
                    {loading &&
                        <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>
                        {tasks.map(u => (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.description}</td>
                                <td>{u.project ? u.project.name : 'No Project'}</td>
                                <td>{u.assignedTo ? u.assignedTo.name : 'Unassigned'}</td>
                                <td>{u.status}</td>
                                <td>{u.due_date}</td>
                              
                                <td>
                                    <Link className="btn-edit" to={'/tasks/' + u.id}>Edit</Link>
                                    &nbsp;
                                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    }
                </table>
                
            </div>
        </div>
    )
    
}

