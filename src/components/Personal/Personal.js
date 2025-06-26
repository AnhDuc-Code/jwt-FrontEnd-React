import { useEffect, useState } from "react";
import "./Personal.scss";
import { getPersonalInfo, updateInfo, updatePassword } from "../../ServiceAxios/userService";
import { toast } from "react-toastify";
const Personal = () => {
    const [action, setAction] = useState("INFO");
    const [selfInfo, setSelfInfo] = useState({
        idUser: "",
        email: "",
        username: "",
        gender: "",
        address: "",
        phone: "",
        role: ""
    });
    const [changePass, setChangePass] = useState({
        idUser: "",
        oldPass: "",
        newPass1: "",
        newPass2: ""
    })
    useEffect(() => {
        getPersonal();
    }, [])
    const getPersonal = async () => {
        try {
            let response = await getPersonalInfo();
            console.log("check response from getUsers in User.js", response);
            if (response) {
                if (+response.EC === 0) {
                    console.log("check thông tin cá nhân: ", response.DT.DT);
                    setSelfInfo({
                        idUser: response.DT.idUser,
                        email: response.DT.email,
                        username: response.DT.username,
                        gender: response.DT.gender,
                        address: response.DT.address,
                        phone: response.DT.phone,
                        role: response.DT.Role.roleName,
                    })
                    setChangePass((pre) => ({
                        ...pre,
                        idUser: response.DT.idUser
                    }
                    ));
                }
            }
        } catch (error) {

        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSelfInfo((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleChangePass = (event) => {
        const { name, value } = event.target;
        setChangePass((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateInfo = async (event) => {
        event.preventDefault();
        let response = await updateInfo(selfInfo);
        if (response?.EC === 0) {
            toast.success(response.EM);
            getPersonal();
        } else {
            toast.error(response.EM);
        }
    };
    const handleUpdatePassword = async (event) => {
        event.preventDefault();
        let response = await updatePassword(changePass);
        if (response?.EC === 0) {
            toast.success(response.EM);
            getPersonal();
        } else {
            toast.error(response.EM);
        }
    };

    return (
        <div className="personal-container">
            <div className="select-personal">
                <div className={action === "INFO" ? "info-actived" : "info"} type="button" onClick={() => { setAction("INFO") }}>Thông tin cá nhân</div>
                <div className={action === "PASSWORD" ? "password-change-actived" : "password-change"} type="button" onClick={() => { setAction("PASSWORD") }}>Thay đổi mật khẩu</div>
            </div>
            <hr />
            <h2>{action === "INFO" ? "Thông tin cá nhân" : "Thay đổi mật khẩu"}</h2>
            {action === "INFO" ? <form className="personal-form" onSubmit={handleUpdateInfo}>
                <div className="form-row">
                    <label>Email</label>
                    <input type="email" name="email" value={selfInfo.email} readOnly disabled />
                </div>
                <div className="form-row">
                    <label>Tên đăng nhập</label>
                    <input type="text" name="username" value={selfInfo.username} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label>Giới tính</label>
                    <select name="gender" value={selfInfo.gender} onChange={handleChange}>
                        <option value="none">-Tạm không-</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>
                <div className="form-row">
                    <label>Địa chỉ</label>
                    <input type="text" name="address" value={selfInfo.address} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label>Số điện thoại</label>
                    <input type="text" name="phone" value={selfInfo.phone} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label>Chức vụ</label>
                    <input type="text" name="role" value={selfInfo.role} readOnly disabled />
                </div>
                <div className="form-row" style={{ justifyContent: "flex-end" }}>
                    <button type="submit" className="btn-save">Lưu</button>
                </div>
            </form>
                :
                <form className="personal-form" onSubmit={handleUpdatePassword}>
                    <div className="oldPass form-row">
                        <label htmlFor="oldPass">Mật khẩu cũ</label>
                        <input type="text" name="oldPass" id="oldPass" value={changePass.oldPass} onChange={handleChangePass} />
                    </div>
                    <div className="newPass1 form-row">
                        <label>Mật khẩu mới</label>
                        <input type="text" name="newPass1" value={changePass.newPass1} onChange={handleChangePass} />
                    </div>
                    <div className="form-row">
                        <label>Nhập lại mật khẩu mới</label>
                        <input type="text" name="newPass2" value={changePass.newPass2} onChange={handleChangePass} />
                    </div>
                    <div className="form-row" style={{ justifyContent: "flex-end" }}>
                        <button type="submit" className="btn-save">Thay đổi mật khẩu</button>
                    </div>
                </form>}
        </div>
    );
}
export default Personal;