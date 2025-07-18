import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
    children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
    const isAuthenticated: boolean = sessionStorage.getItem("auth") === "true" ? true : false;

    return isAuthenticated ? children : <Navigate to="/login" replace/>;
}