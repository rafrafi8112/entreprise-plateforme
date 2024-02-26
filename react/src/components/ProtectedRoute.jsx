import { Navigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider'; // Adjust the import path as needed

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useStateContext();
    const userRole = localStorage.getItem('userRole'); // Corrected to 'userRole'

    if (!user || !allowedRoles.includes(userRole)) {
        // User is not logged in or does not have the required role
        // Redirecting to login for simplicity, adjust as needed
        return <Navigate to="/login" replace />; // Ensure this redirects to the intended path
    }

    return children;
};

export default ProtectedRoute;
