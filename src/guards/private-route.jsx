import { Navigate } from "react-router-dom";
import { useAuth } from "../components/contexts/auth-context";

function PrivateRouter({ children }) {
    const { user } = useAuth();

    if(!user) return (<Navigate to='/login' />)
        else return children;
}

export default PrivateRouter;