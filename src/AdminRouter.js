import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/AdminLayout/dashboard';
import LogoOnlyLayout from './layouts/AdminLayout/LogoOnlyLayout';
//
import DashboardApp from "./pages/Admin/DashboardApp";
import User from "./pages/Admin/User";
import Room from "./pages/Admin/Room";
import Maps from "./pages/Admin/Maps";
import Blog from "./pages/Admin/Blog";
import Products from "./pages/Admin/Products";
import Login from "./pages/Admin/Login";
import Register from "./pages/Admin/Register";
import NotFound from "./pages/Admin/Page404";

// ----------------------------------------------------------------------

export default function AdminRouter() {
    return useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                {element: <Navigate to="admin/dashboard/app" replace /> },
                { path: 'app', element: <DashboardApp /> },
                { path: 'user', element: <User /> },
                { path: 'room', element: <Room /> },
                { path: 'maps', element: <Maps /> },
                { path: 'products', element: <Products /> },
                { path: 'blog', element: <Blog /> }
            ]
        },
        {
            path: '/',
            element: <LogoOnlyLayout />,
            children: [
                { path: 'login', element: <Login /> },
                { path: 'register', element: <Register /> },
                { path: '404', element: <NotFound /> },
                { path: '/', element: <Navigate to="/admin/dashboard" /> },
                { path: '*', element: <Navigate to="/admin/404" /> }
            ]
        },
        { path: '*', element: <Navigate to="/404" replace /> }
    ]);
}

