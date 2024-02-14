import { Navigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider'; // Adjust the import path as needed

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useStateContext();

    if (!user || !allowedRoles.includes(user.role)) {
        // User is not logged in or does not have the required role
        // Redirecting to login for simplicity, adjust as needed
        return <Navigate to="/user" replace />;
    }

    return children;
};
export default ProtectedRoute;