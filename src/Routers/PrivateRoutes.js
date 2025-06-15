import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { reqCheckJWT } from "../ServiceAxios/userService";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
const PrivateRoutes = (props) => {
    const navigate = useNavigate();
    const [isAuthen, setIsAuthen] = useState(false);
    useEffect(() => {
        // let keySession = sessionStorage.getItem('key');
        // let dataKey = JSON.parse(keySession);
        // if (dataKey) {
        //     setIsAuthen(true);
        // } else {
        //     navigate("/login")
        // }
        checkJWT();
    }, [])
    const checkJWT = async () => {
        let response = await reqCheckJWT();
        if (response && +response.EC === -1) {
            toast.error(response.EM);
            await navigate("/login");
        } else {
            setIsAuthen(true);
        }
    }
    if (isAuthen) {
        return <Outlet />
    }

    return (
        <>
        </>
    )
}
export default PrivateRoutes;