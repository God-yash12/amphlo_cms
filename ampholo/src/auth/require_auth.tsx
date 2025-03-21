import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context"

export const RequireAuth = () => {
    const { accessToken } = useAuth();

    return accessToken
        ? <Outlet />
        : <Navigate to={"/login"} replace />
}