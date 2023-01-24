import { BrowserRouter, Route, Routes } from "react-router-dom";
import Configurations from "../pages/configurations/Configurations";
import SideMenu from "../components/side-menu/SideMenu";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import { PrivateRoutes } from "./PrivateRoutes";
import Notifications from "../pages/notifications/Notifications";
import { SelectedAppRoutes } from "./SelectedAppRoutes";
import History from "../pages/history/History";
import Register from "../pages/register/Register";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/' element={<PrivateRoutes />}>
                    <Route path='/home' element={RouteWithSideMenu(<Home />)} />
                    <Route path='/' element={<SelectedAppRoutes />}>
                        <Route path='/configurations' element={RouteWithSideMenu(<Configurations />)} />
                        <Route path='/notifications' element={RouteWithSideMenu(<Notifications />)} />
                        <Route path='/history' element={RouteWithSideMenu(<History />)} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function RouteWithSideMenu(component: JSX.Element) {
    return (
        <SideMenu>
            {component}
        </SideMenu>
    )
}