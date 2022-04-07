import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Apps from './pages/Apps';
import Teams from './pages/Teams';
import AddTeam from './pages/AddTeam';
import AddApp from './pages/AddApp';
import ViewApp from './pages/ViewApp';
import ViewTeam from './pages/ViewTeam';
import EditTeam from './pages/EditTeam';
import EditApp from './pages/EditApp';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/app',
      element: <DashboardLayout />,
      children: [
        { path: 'dashboard', element: <DashboardApp /> },
        {
          path: 'teams',
          children: [
            { index: true, element: <Teams /> },
            { path: 'view', element: <ViewTeam /> },
            { path: 'edit', element: <EditTeam /> },
            { path: 'add', element: <AddTeam /> }
          ]
        },
        {
          path: 'apps',
          children: [
            { index: true, element: <Apps /> },
            { path: 'view', element: <ViewApp /> },
            { path: 'edit', element: <EditApp /> },
            { path: 'add', element: <AddApp /> }
          ]
        },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/app/dashboard" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
