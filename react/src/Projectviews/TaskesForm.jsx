import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";


export default function TaskesForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [task, seTaskes] = useState({
      id: null,
      name: '',
      description: '',
      manager_id: '',
      status: '',
      due_date: '',
    
  })
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()
  useEffect(() => {
  
    getUsers();
    getProjects();
    console.log("users data:",users);
    console.log("Projects data:",projects);

}, [])
  if (id) {
      useEffect(() => {
     
          setLoading(true)
          axiosClient.get(`/tasks/${id}`)
              .then(({data}) => {
                  setLoading(false)
                  seTaskes(data)
              })
              .catch(() => {
                  setLoading(false)
              })
      }, [])
  }
  const getProjects = () => {
    setLoading(true)
    axiosClient.get('/projects')
        .then(({ data }) => {
          setLoading(false)
          setProjects(data.data);

        })
        .catch(() => {
            setLoading(false)
        })
}
  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
        .then(({ data }) => {
          setLoading(false)
         
            setUsers(data.data);

        })
        .catch(() => {
            setLoading(false)
        })
}
  const onSubmit = ev => {
      
      ev.preventDefault()
      if (task.id) {
          axiosClient.put(`/tasks/${task.id}`, task)
              .then(() => {
                  setNotification('task was successfully updated')
                  navigate('/tasks')
              })
              .catch(err => {
                  const response = err.response;
                  if (response && response.status === 422) {
                      setErrors(response.data.errors)
                  }
              })
      } else {
          console.log('Updating task with data:', task);
          axiosClient.post('/tasks', task)
              .then(() => {
                  setNotification('task was successfully created')
                  navigate('/tasks')
              })
              .catch(err => {
                  const response = err.response;
                  if (response && response.status === 422) {
                      setErrors(response.data.errors)
                  }
              })
      }
  }

  return (
      <>
          {task.id && <h1>Update Task: {task.name}</h1>}
          {!task.id && <h1>New Task</h1>}
          <div className="card animated fadeInDown">
              {loading && (
                  <div className="text-center">
                      Loading...
                  </div>
              )}
              {errors &&
                  <div className="alert">
                      {Object.keys(errors).map(key => (
                          <p key={key}>{errors[key][0]}</p>
                      ))}
                  </div>
              }
              {!loading && (
                  <form onSubmit={onSubmit}>
                        <select  className="select-room" value={task.project_id}
                                onChange={ev => seTaskes({...task, project_id: ev.target.value})}>
                            <option value="" className="select-room">Sélectionnez un Projet</option>
                            {projects.map(project => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                        <input value={task.name} onChange={ev => seTaskes({...task, name: ev.target.value})} placeholder="Name"/>
                     
                        <input value={task.description} onChange={ev => seTaskes({...task, description: ev.target.value})} placeholder="description"/>
                       
                        <select className="select-room" value={task.group} onChange={ev => seTaskes({...task, status: ev.target.value})}>
                            <option value="" className="select-room">Status</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Cancelled">Cancelled</option>
                        
                        </select>
                        <select  className="select-room" value={task.assigned_to}
                                onChange={ev => seTaskes({...task, assigned_to: ev.target.value})}>
                            <option value="" className="select-room">Sélectionnez le Membre</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name} - {user.group}
                                </option>
                            ))}
                        </select> 
                      <input type="datetime-local" value={task.due_date}
                               onChange={ev => seTaskes({...task, due_date: ev.target.value})}
                               placeholder="due_date"/>
                      
                 
                      
                      <button className="btn">Save</button>
                  </form>
              )}
          </div>
      </>
  )
}

