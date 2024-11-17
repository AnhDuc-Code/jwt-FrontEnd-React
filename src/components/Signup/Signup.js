import { Link } from "react-router-dom";
import "./Signup.scss"
const Signup = () => {
    return (
        <div className="container">
            <div className="Signup-container">
                <div className="left-content">
                    <h4>Hello</h4>
                    <p>hello</p>
                </div>
                <div className="right-content text-center" >
                    <h1 style={{ color: "#7777FF" }}>ĐĂNG KÝ</h1>
                    <input type="text" className="form-control mb-3" placeholder="Email hoặc Số điện thoại" />
                    <input type="text" className="form-control mb-3" placeholder="Tên tài khoản" />
                    <input type="number" className="form-control mb-3" placeholder="Số điện thoại" />
                    <input type="password" className="form-control mb-3" placeholder="Mật khẩu" />
                    <input type="password" className="form-control mb-3" placeholder="Nhập lại mật khẩu" />
                    <button className="btn btn-primary ">Đăng Ký</button>
                    <hr />
                    <Link to={"/login"}>Quay lại đăng nhập</Link><br />
                </div>

            </div>
        </div>
    )
}
export default Signup;