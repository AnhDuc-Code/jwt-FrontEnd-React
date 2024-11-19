import { Link } from "react-router-dom";
import "./Signup.scss"
import { useState } from "react";
import { toast } from 'react-toastify';
const Signup = () => {
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [reEnterPassword, setReEnterPassword] = useState();
    const validDeFauld = {
        emailValid: true,
        usernameValid: true,
        phoneValid: true,
        passwordValid: true
    }
    const [isValidObject, setIsValidObject] = useState(validDeFauld);


    const isValid = () => {
        setIsValidObject(validDeFauld)
        if (!email) {
            setIsValidObject({
                ...validDeFauld,
                emailValid: false
            })
            toast.error("Bạn cần nhập Email");
            return false;
        }
        let regx = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/g
        if (!regx.test(email)) {
            setIsValidObject({
                ...validDeFauld,
                emailValid: false
            })
            toast.error("Bạn cần nhập định dạnh email");
            return false;
        }
        if (!username) {
            setIsValidObject({
                ...validDeFauld,
                usernameValid: false
            })
            toast.error("Bạn cần nhập Tên tài khoản");
            return false;
        }
        if (!phone) {
            setIsValidObject({
                ...validDeFauld,
                phoneValid: false
            })
            toast.error("Bạn cần nhập số điện thoại");
            return false;
        }
        if (!password) {
            setIsValidObject({
                ...validDeFauld,
                passwordValid: false
            })
            toast.error("Bạn cần nhập mật khẩu");
            return false;
        }
        if (password !== reEnterPassword) {
            setIsValidObject({
                ...validDeFauld,
                passwordValid: false
            })
            toast.error("Mật khẩu không giống nhau");
            return false;
        }

        // eslint-disable-next-line
        return true;
    }
    const handleSignup = async () => {
        if (!isValid()) {
            return;
        }

        const userInfo = { email, username, phone, password, reEnterPassword };
        console.log("checkUserInfo", userInfo);
        alert("me")
    }

    return (
        <div className="container">
            <div className="Signup-container">
                <div className="left-content">
                    <h4>Dự án Phân quyền JWT</h4>
                    <p>
                        Dự án được thiết kế<br />
                        FrontEnd với React 18.2 + Bootstrap5<br />
                        BackEnd với Nodejs Javascript<br />
                    </p>
                </div>
                <div className="right-content text-center" >
                    <h1 style={{ color: "#7777FF" }}>ĐĂNG KÝ</h1>
                    <input type="text" className={isValidObject.emailValid ? "form-control mb-3" : "form-control mb-3 is-invalid"} placeholder="Email hoặc Số điện thoại" onChange={(event) => { setEmail(event.target.value) }} />
                    <input type="text" className={isValidObject.usernameValid ? "form-control mb-3" : "form-control mb-3 is-invalid"} placeholder="Tên tài khoản" onChange={(event) => { setUsername(event.target.value) }} />
                    <input type="number" className={isValidObject.phoneValid ? "form-control mb-3" : "form-control mb-3 is-invalid"} placeholder="Số điện thoại" onChange={(event) => { setPhone(event.target.value) }} />
                    <input type="password" className={isValidObject.passwordValid ? "form-control mb-3" : "form-control mb-3 is-invalid"} placeholder="Mật khẩu" onChange={(event) => { setPassword(event.target.value) }} />
                    <input type="password" className={isValidObject.passwordValid ? "form-control mb-3" : "form-control mb-3 is-invalid"} placeholder="Nhập lại mật khẩu" onChange={(event) => { setReEnterPassword(event.target.value) }} />
                    <button className="btn btn-primary " onClick={() => { handleSignup() }}>Đăng Ký</button>
                    <hr />
                    <Link to={"/login"}>Quay lại đăng nhập</Link><br />
                </div>

            </div>
        </div>
    )
}
export default Signup;