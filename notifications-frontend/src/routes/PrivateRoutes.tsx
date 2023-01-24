import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
    const token = localStorage.getItem("token");
    var auth = true; // determine if authorized, from context or however you're doing it

    if (!token) auth = false

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/login" />;
}
