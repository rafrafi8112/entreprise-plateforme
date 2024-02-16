import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

export default function ProjectMembersForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [projectmember, setProjectmembers] = useState({
      id: null,
      project_id: '',
      user_id: '',
      role: '',
      start_date: '',
      end_date: '',
      
  })
  const [users, setUsers] = useState([]);
  const [projects, seProjects] = useState([]);
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()
  useEffect(() => {
  
    getUsers();
    getProjects();
    console.log("users data:",users);

}, [])
  if (id) {
      useEffect(() => {
     
          setLoading(true)
          axiosClient.get(`/project-members/${id}`)
              .then(({data}) => {
                  setLoading(false)
                  setProjectmembers(data)
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
          seProjects(data.data)

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
          setUsers(data.data)

        })
        .catch(() => {
            setLoading(false)
        })
}
  const onSubmit = ev => {
      
      ev.preventDefault()
      if (projectmember.id) {
          axiosClient.put(`/project-members/${projectmember.id}`, projectmember)
              .then(() => {
                  setNotification('Project was successfully updated')
                  navigate('/project-members')
              })
              .catch(err => {
                  const response = err.response;
                  if (response && response.status === 422) {
                      setErrors(response.data.errors)
                  }
              })
      } else {
          console.log('Updating project-members with data:', projectmember);
          axiosClient.post('/project-members', projectmember)
              .then(() => {
                  setNotification('project-members was successfully created')
                  navigate('/project-members')
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
          {projectmember.id && <h1>Update project: {projectmember.name}</h1>}
          {!projectmember.id && <h1>New project</h1>}
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
                     <select  className="select-room" value={projectmember.project_id}
                                onChange={ev => setProjectmembers({...projectmember, project_id: ev.target.value})}>
                            <option value="" className="select-room">Sélectionnez le Projects</option>
                            {projects.map(project => (
                                <option key={project.id} value={project.id}>
                                    {project.name} 
                                </option>
                            ))}
                     </select>
                    <select  className="select-room" value={projectmember.user_id}
                                onChange={ev => setProjectmembers({...projectmember, user_id: ev.target.value})}>
                            <option value="" className="select-room">Sélectionnez le Membre</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.id} - {user.name}- {user.group}
                                </option>
                            ))}
                    </select>
                      
                     
                        <select className="select-room" value={projectmember.role} onChange={ev => setProjectmembers({...projectmember, role: ev.target.value})}>
                        <option value="" className="select-room">Sélectionnez le role</option>
                          <option value="Developer Frontend">Developer Frontend</option>
                          <option value="Developer Backend">Developer Backend</option>
                          <option value="Testeur">Testeur</option>
                          <option value="Audit">Audit</option>
                        
                      </select>
                      <input type="datetime-local" value={projectmember.start_date}
                               onChange={ev => setProjectmembers({...projectmember, start_date: ev.target.value})}
                               placeholder="start_date"/>
                        <input type="datetime-local" value={projectmember.end_date}
                               onChange={ev => setProjectmembers({...projectmember, end_date: ev.target.value})}
                               placeholder="end_date"/>
                 
                      
                      <button className="btn">Save</button>
                  </form>
              )}
          </div>
      </>
  )
}

