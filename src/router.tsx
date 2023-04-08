import {createBrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Lobby from './pages/Lobby';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/lobby/:lobbyId',
        element: <Lobby />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;
