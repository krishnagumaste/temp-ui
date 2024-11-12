import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import App from '../App';
import NewPage from '../pages/newPage/NewPage';
import Login from '../pages/login/Login';
import ProtectedRoute from './ProtectedRoute';
import 'hero-shad/dist.style.css';
import Layout from '../layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout>
          <Outlet />
        </Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/newPage',
        element: <NewPage />,
      },
    ],
    errorElement: <div>404 Page not found.</div>,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export const RoutesWrapper = () => {
  return <RouterProvider router={router} />;
};
