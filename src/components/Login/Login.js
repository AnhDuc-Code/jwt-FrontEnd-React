import { useNavigate } from "react-router-dom";
import "./Login.scss"
import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    let navigate = useNavigate();
    const handleGetSignupPage = () => {
        navigate("/signup")
    }
    useEffect(() => {
        // axios.get("http://localhost:9000/").then((data) => {
        //     console.log("lấy được thông tin nhân viên", data);
        // })
    }, [])
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
                    <input type="text" className="form-control mb-3" placeholder="Email address" onChange={(event) => { setEmail(event.target.value) }} />
                    <input type="password" className="form-control mb-3" placeholder="Mật khẩu" onChange={(event) => { setPassword(event.target.value) }} />
                    <button className="btn btn-primary ">Đăng Nhập</button>
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