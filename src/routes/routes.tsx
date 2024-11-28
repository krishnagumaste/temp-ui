import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import App from '../App';
import NewPage from '../pages/newPage/NewPage';
import Login from '../pages/login/Login';
// import ProtectedRoute from './ProtectedRoute';
import 'hero-shad/dist.style.css';
import Layout from '../layout/Layout';
import PdfSearch from '../pages/pdfSearch/PdfSearch';
import PdfUpload from '../pages/pdfUpload/PdfUpload';
import PDFViewer from '../pages/pdfViewer/PdfViewer';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <ProtectedRoute>
      <Layout>
        <Outlet />
      </Layout>
      // </ProtectedRoute>
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
      {
        path: '/pdfSearch',
        element: <PdfSearch />,
      },
      {
        path: '/pdfUpload',
        element: <PdfUpload />,
      },
      {
        path: '/pdfViewer',
        element: <PDFViewer />,
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
