import { toast } from 'react-hot-toast';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelectedApplication } from '../context/SelectedApplicationContext';

export const SelectedAppRoutes = () => {
    const [app] = useSelectedApplication()
    var auth = true; // determine if authorized, from context or however you're doing it

    if (!app) {
        toast.error('Você deve selecionar uma aplicação.', { id: 'app-not-selected', })
        auth = false
    }

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/home" />;
}
