import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../utilities/hook/useAuth";

export const AuthGuard = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth?.user?.token) {
        return <Navigate to={"/login"} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};