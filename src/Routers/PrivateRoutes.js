import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoutes = (props) => {
    const navigate = useNavigate();
    const [isAuthen, setIsAuthen] = useState(false);
    useEffect(() => {
        let keySession = sessionStorage.getItem('key');
        let dataKey = JSON.parse(keySession);
        if (dataKey) {
            setIsAuthen(true);
        } else {
            navigate("/login")
        }
    }, [])

    if (isAuthen) {
        return props.children
    }

    return (
        <>
        </>
    )
}
export default PrivateRoutes;