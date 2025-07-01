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
import Product from "../components/Products/Product";
import ProductDetail from "../components/Products/ProductDetail";
import Seller from "../components/Seller/Seller";
import Cart from "../components/Cart/Cart";
import Bill from "../components/History/Bill";
import Personal from "../components/Personal/Personal";
import Order from "../components/Order/Order";
import GuestOrder from "../components/Order/GuestOrder";


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
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "productDetail",
                element: <ProductDetail />
            },
            {
                path: "product",
                element: <Product />
            },
            {
                element: <PrivateRoutes />, // Bọc các route cần bảo vệ
                children: [
                    {
                        path: "personal",
                        element: <Personal />
                    },
                    {
                        path: "cart",
                        element: <Cart />
                    },
                    {
                        path: "seller",
                        element: <Seller />
                    },
                    {
                        path: "admin",
                        element: <Admin />
                    },
                    {
                        path: "user",
                        element: <User />
                    },
                    {
                        path: "orderHistory",
                        element: <Bill />
                    },
                    {
                        path: "order",
                        element: <Order />
                    },
                    {
                        path: "guestOrder",
                        element: <GuestOrder />
                    },
                ]
            },
            {
                path: "*",
                element: <>404 not found!!!</>
            }
        ],
        future: {
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