import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getTasks();
    }, []);

    const onDeleteClick = (task) => {
        if (!window.confirm("Are you sure you want to delete this task?")) {
            return;
        }
        axiosClient.delete(`/tasks/${task.id}`)
            .then(() => {
                setNotification('Task was successfully deleted');
                setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id)); // Update state locally
            });
    };

    const getTasks = () => {
        setLoading(true);
        axiosClient.get('/tasks')
            .then(({ data }) => {
                setLoading(false);
                setTasks(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Tasks</h1>
                <Link to="/tasks/new">Add new</Link>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                    {tasks.map(task => (
                        <div key={task.id} style={{ padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,.2)', borderRadius: '5px', width: '300px', background: 'white', margin: '10px' }}>
                            <h3>{task.name}</h3>
                            <p>Description: {task.description}</p>
                            <p>Project: {task.project ? task.project.name : 'No Project'}</p>
                            <p>Assigned To: {task.assignedTo ? task.assignedTo.name : 'Unassigned'}</p>
                            <p>Status: {task.status}</p>
                            <p>Due Date: {task.due_date}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <Link to={`/tasks/${task.id}`}style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '5px',
                                    textAlign: 'center'
                                }}>Edit</Link>
                                <button onClick={() => onDeleteClick(task)}style={{
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
        </div>
    );
}
