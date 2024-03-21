import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import Loading from '../views/Loading'; 
export default function ProjectMembers() {
    const [projectMembers, setProjectMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getProjectMembers();
    }, []);

    const onDeleteClick = (projectMember) => {
        if (!window.confirm("Are you sure you want to delete this project member?")) {
            return;
        }
        axiosClient.delete(`/project-members/${projectMember.id}`)
            .then(() => {
                setNotification('Project member was successfully deleted');
                getProjectMembers(); // Reload the project members
            });
    };

    const getProjectMembers = () => {
        setLoading(true);
        axiosClient.get('/project-members')
            .then(({ data }) => {
                setLoading(false);
                setProjectMembers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Project Members</h1>
                <Link to="/project-members/new">Add new</Link>
            </div>
            {loading ? (
                <Loading message="Loading Project Members..." />
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                    {projectMembers.map(member => (
                        <div key={member.id} style={{ padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,.2)', borderRadius: '5px', width: '300px', background: 'white', margin: '10px' }}>
                            <h3>{member.user.name}</h3>
                            <p>Project: {member.project.name}</p>
                            <p>Email: {member.user.email}</p>
                            <p>Role: {member.role}</p>
                            <p>Start Date: {member.start_date}</p>
                            <p>End Date: {member.end_date}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <Link to={`/project-members/${member.id}`}style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '5px',
                                    textAlign: 'center'
                                }}>Edit</Link>
                                <button onClick={() => onDeleteClick(member)}style={{
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
