import { useNavigate } from "react-router-dom";
import "./Login.scss"
const Login = () => {
    let navigate = useNavigate();
    const handleGetSignupPage = () => {
        navigate("/signup")
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
                    <input type="text" className="form-control mb-3" placeholder="Email hoặc Số điện thoại" />
                    <input type="password" className="form-control mb-3" placeholder="Mật khẩu" />
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