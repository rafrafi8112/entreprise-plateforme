import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import Board from "./components/Board";
import Loading from "../views/Loading"
export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = projects.slice(firstIndex, lastIndex);
    const npage = Math.ceil(projects.length / recordsPerPage);
    const pageNumbers = [...Array(npage + 1).keys()].slice(1);

    useEffect(() => {
        getProjects();
    }, []);

    const onDeleteClick = (project) => {
        if (!window.confirm("Are you sure you want to delete this project?")) {
            return;
        }
        axiosClient.delete(`/projects/${project.id}`)
            .then(() => {
                setNotification('Project was successfully deleted');
                setProjects(prevProjects => prevProjects.filter(p => p.id !== project.id)); // Update state locally
            });
    };

    const getProjects = () => {
        setLoading(true);
        axiosClient.get('/projects')
            .then(({ data }) => {
                console.log('eeeeeeeeeeeeeee',data.data)
                setLoading(false);
                setProjects(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
             <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1></h1>
                <Link to="/projects/new">Add new</Link>
            </div>
             
           
            {loading ? (
                <Loading message="Loading Projects..." />
            ) : (
                <Board />
            )}
          
        </div>
    );
}
