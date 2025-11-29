import { Navigate } from "react-router";
import { useAuth } from "../../../context/AuthContext"

const Protect = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return null;
    }

    return user ? children : <Navigate to='/login' />
};

export default Protect;