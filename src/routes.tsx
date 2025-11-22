
import { createHashRouter, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Artists from './pages/Artists';
import ArtistProfile from './pages/ArtistProfile';
import BookingConfirmation from './pages/BookingConfirmation';
import Account from './pages/Account';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import BookingPage from './pages/BookingPage';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/artists', element: <Artists /> },
      { path: '/artists/:id', element: <ArtistProfile /> },
      { path: '/login', element: <Login /> },
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          { path: '/book/:artistId', element: <BookingPage /> },
          { path: '/booking-confirmation', element: <BookingConfirmation /> },
          { path: '/account', element: <Account /> },
        ],
      },
    ],
  },
]);
