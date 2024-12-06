import { useNavigate } from "react-router-dom";
import "./Login.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { loginUser } from "../../ServiceAxios/userService"
const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const validDefault = {
        emailValid: true,
        passwordValid: true
    }
    const [isValidLogin, setIsValidLogin] = useState(validDefault);

    let navigate = useNavigate();
    const handleGetSignupPage = () => {
        navigate("/signup")
    }
    useEffect(() => {
        // axios.get("http://localhost:9000/api/").then((data) => {
        //     console.log("lấy được thông tin nhân viên", data);
        // })
        const checkSessionKey = sessionStorage.getItem("key");
        if (checkSessionKey) {
            navigate("/");
        }
    }, [])

    const isValid = () => {
        setIsValidLogin({ ...validDefault });
        if (!email) {
            setIsValidLogin({ ...validDefault, emailValid: false })
            toast.error("Bạn cần nhận Email");
            return false;
        }
        // eslint-disable-next-line
        let regx = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/g
        if (!regx.test(email)) {
            setIsValidLogin({
                ...validDefault,
                emailValid: false
            })
            toast.error("Bạn cần nhập định dạnh email");
            return false;
        }
        if (!password) {
            setIsValidLogin({ ...validDefault, passwordValid: false })
            toast.error("Bạn cần nhận password");
            return false;
        }
        return true;
    }

    const handleLogin = async () => {
        console.log("handleLogin")
        if (isValid() === true) {
            let response = await loginUser(email, password);
            let responseData = response.data;
            if (+responseData.EC === 0) {
                toast.success(responseData.EM);
                navigate("/user");
                const keySession = {
                    isAuthenticated: true,
                    token: "fake token"
                }
                sessionStorage.setItem("key", JSON.stringify(keySession));
            } else {
                toast.error(responseData.EM);
            }
        }
    }

    return (
        <div className="container">
            <div className="Login-container">
                <div className="left-content">
                    <h4>Dự án Phân quyền JWT</h4>
                    <p>
                        Dự án được thiết kế<br />
                        FrontEnd với React 18.2 + Bootstrap5<br />
                        BackEnd với Nodejs Javascript<br />
                    </p>
                </div>
                <div className="right-content text-center" >
                    <h1 style={{ color: "#7777FF" }}>ĐĂNG NHẬP</h1>
                    <input type="text" className={isValidLogin.emailValid ? "form-control mb-3" : "form-control mb-3 is-invalid"} placeholder="Email address" onChange={(event) => { setEmail(event.target.value) }} />
                    <input type="password" className={isValidLogin.passwordValid ? "form-control mb-3" : "form-control mb-3 is-invalid"} placeholder="Mật khẩu" onChange={(event) => { setPassword(event.target.value) }} />
                    <button className="btn btn-primary " onClick={() => { handleLogin() }}>Đăng Nhập</button>
                    <hr />
                    <ins>Quên mật khẩu?</ins><br />
                    <button className="btn btn-info mt-3" onClick={() => { handleGetSignupPage() }}>
                        Đăng ký
                    </button>
                </div>

            </div>
        </div>
    )
}
export default Login;