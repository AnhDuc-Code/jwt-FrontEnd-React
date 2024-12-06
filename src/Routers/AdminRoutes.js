import {
    createBrowserRouter,
} from "react-router-dom";
import Admin from '../components/Admin/Admin';
import User from '../components/User/User';
import HomePage from '../components/Home/HomePage'
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import App from '../App';
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "admin",
                element: <PrivateRoutes>
                    <Admin />
                </PrivateRoutes>
            },
            {
                path: "user",
                element: <PrivateRoutes><User /></PrivateRoutes>
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "*",
                element: "404 not found!!!"
            }
        ], future: {
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
        },
    }

]);
export default router;