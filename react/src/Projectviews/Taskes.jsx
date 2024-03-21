import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import Loading from '../views/Loading'; 
import Board from "./taskesTodo/Board";
import Loding from "../views/Loading";
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
              <Loading message="Loading Projects..." />
            ) : (
                <Board />
            )}
        </div>
    );
}
