import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function ProjectMembers() {
    const [projectmembers, setProjectmembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()
  
    useEffect(() => {
      getUsers();
    }, [])
  
    const onDeleteClick = projectmember => {
      if (!window.confirm("Are you sure you want to delete this projectmembers?")) {
        return
      }
      axiosClient.delete(`/project-members/${projectmember.id}`)
        .then(() => {
          setNotification('prjectmember was successfully deleted')
          getUsers()
        })
    }
  
    const getUsers = () => {
      setLoading(true)
      axiosClient.get('/project-members')
        .then(({ data }) => {
          setLoading(false)
          setProjectmembers(data.data)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  
    return (
      <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Project Members</h1>
          <Link className="btn-add" to="/project-members/new">Add new</Link>
        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Project</th>
              <th>Email</th>
              <th>Role</th>
              <th>Start_date</th>
              <th>End_date</th>
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
              {projectmembers.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.project.name}</td>
                  <td>{u.user.email}</td>
                  <td>{u.role}</td>
                  <td>{u.start_date}</td>
                  <td>{u.end_date}</td>
                  <td>
                    <Link className="btn-edit" to={'/project-members/' + u.id}>Edit</Link>
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

