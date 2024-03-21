import  { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

import axiosClient from "../../axios-client.js";

export default function Board() {
    
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [backlog, setBacklog] = useState([]);
    const [inReview, setInReview] = useState([]);
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
        axiosClient.get('/tasksUser')
            .then(({ data }) => {
                const filteredTasks = data.data.filter(task => 
                    task.assigned_to.toString() === userId);
                
                setCompleted(filteredTasks.filter((task) => task.status === 'Completed'));
                setIncomplete(filteredTasks.filter((task) => task.status === 'ToDo'));
                setBacklog(filteredTasks.filter((task) => task.status === 'Backlog'));
                setInReview(filteredTasks.filter((task) => task.status === 'InReview'));
            })
            .catch(() => {
      
            });
    };

 
    useEffect(() => {
        getProjects();
    }, []);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        deletePreviousState(source.droppableId, draggableId);

        const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview, ...backlog]);

        setNewState(destination.droppableId, task);

    };

    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setIncomplete(removeItemById(taskId, incomplete));
                break;
            case "2":
                setCompleted(removeItemById(taskId, completed));
                break;
            case "3":
                setInReview(removeItemById(taskId, inReview));
                break;
            case "4":
                setBacklog(removeItemById(taskId, backlog));
                break;
        }

    }

    const  updateProjectStatus = (tasks,status) => {

        axiosClient.put(`/tasks/${tasks.id}`, {...tasks,status})
        .then(() => {
            getProjects()

            //setNotif
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              console.log('eeeeeeeeeeeeeeeeeeee') 
               //setNotifError
            }
        })

    }
    function setNewState(destinationDroppableId, task) {
        let updatedTask;
        switch (destinationDroppableId) {
            case "1":   // TO DO
                updatedTask = { ...task, status: "ToDo" };
                updateProjectStatus(task,"ToDo")
                setIncomplete([updatedTask, ...incomplete]);
                break;
            case "2":  // DONE
                updatedTask = { ...task, status: "Completed" };
                updateProjectStatus(task,"Completed")
                setCompleted([updatedTask, ...completed]);
                break;
            case "3":  // IN REVIEW
                updatedTask = { ...task, status: "InReview" };
                updateProjectStatus(task,"InReview")
                setInReview([updatedTask, ...inReview]);
                break;
            case "4":  // BACKLOG
                updatedTask = { ...task, status: "Backlog" };
                updateProjectStatus(task,"Backlog")
                setBacklog([updatedTask, ...backlog]);
                break;
        }

    }

    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h2 style={{ textAlign: "center" }}>Taskes </h2>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    margin: "0 auto"
                }}
            >
                <Column title={"TO DO"} tasks={incomplete} id={"1"} />
                <Column title={"DONE"} tasks={completed} id={"2"} />
                <Column title={"IN REVIEW"} tasks={inReview} id={"3"} />
                <Column title={"BACKLOG"} tasks={backlog} id={"4"} />
            </div>
           
        </DragDropContext>
    );
}