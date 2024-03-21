import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import Board from "./userTaskestodo/Board";
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
                   <Board /> 
        </div>

    )
    
}

