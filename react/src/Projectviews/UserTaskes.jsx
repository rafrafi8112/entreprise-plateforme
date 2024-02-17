import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function UserTaskes() {
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
        axiosClient.delete(`/tasksUser/${task.id}`)
       
            .then(() => {
                setNotification('tasks was successfully deleted')
                const updatedTasks = tasks.filter(t => t.id !== task.id);
                setTaskes(updatedTasks);
            })
    }
    const getUserIdFromLocalStorage = () => {
        const userId = localStorage.getItem('userId');
    if (userId) {
        return userId;
    } else {
        console.error('No user ID found in local storage');
        // Handle the case where there is no user ID, e.g., by setting a default value or showing an error message.
        return ''; // or some default value
    }
      }

    const getProjects = () => {
        const userId = getUserIdFromLocalStorage();
        setLoading(true)
        axiosClient.get('/tasksUser')
        .then(response => {
            // If the tasks are directly within response.data
            const filteredTasks = response.data.data.filter(task => 
                task.assigned_to.toString() === userId);
                setTaskes(filteredTasks);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
            setLoading(false);
        });
    }
    
    return (
        <div>
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                <h1>Taskes 


                </h1>
                <Link className="btn-add" to="/tasksUser/new">Add new</Link>
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
                                    <Link className="btn-edit" to={'/tasksUser/' + u.id}>Edit</Link>
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

