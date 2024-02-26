import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function UserTaskes() {
    const [tasks, setTaskes] = useState([]);
    const [loading, setLoading] = useState(false);
  
    //Pafination
    
    useEffect(() => {
        getProjects();
        console.log('im hereee');
    }, [])

   
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
    const STATUSES = ['Pending', 'In Progress', 'Completed', 'On Hold', 'Cancelled'];

// ...

// Add a function to handle status change
const onStatusChange = (task, newStatus) => {
    const taskId = task.id; // Replace with the actual task ID
    console.log('le id de taskest:',taskId)
    
    axiosClient.patch(`/tasksUser/${taskId}/status`, { status: newStatus })
      .then(response => {
        console.log('Task status updated:', response.data);
        const updatedTask = response.data;
        
        setTaskes(tasks.map(task => {
        if (task.id === updatedTask.id) {
            return updatedTask;
            
        }
        return task;
        
    }));
       
        // Handle the response, update local state, etc.
      })
      .catch(error => {
        console.error('Failed to update task status:', error.response);
        // Handle the error
      });
};
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
                                <td>
                                    <select value={u.status} onChange={(e) => onStatusChange(u, e.target.value)}>
                                        {STATUSES.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>{u.due_date}</td>
                              
                            </tr>
                        ))}
                        </tbody>
                    }
                </table>
                
            </div>
        </div>
    )
    
}

