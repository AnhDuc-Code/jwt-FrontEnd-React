import { useEffect, useState } from "react";
import { readUsers, readUsersWithPage, editUserWithId, deleteUserWithId, createFullUser } from "../../ServiceAxios/userService";
import "./User.scss"
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete';
import ModalUser from './modalUser'

const User = () => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);

    const [action, setAction] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [dataItem, setDataItem] = useState({});
    const defaultData = {
        username: "", email: "", phone: "", gender: "", password: "", confirmPassword: "", role: ""
    }
    const [dataCreateUser, setDataCreateUser] = useState(defaultData);
    const [dataUpdateUser, setDataUpdateUser] = useState(defaultData);

    const handleClose = () => {
        setShowModal(false);
        setShowModalCreate(false);
        setDataItem({});
        setDataCreateUser(defaultData);
        setDataUpdateUser(defaultData);

    }

    useEffect(() => {
        getUsers();
    }, [currentPage])

    let response;
    const getUsers = async () => {
        try {
            response = await readUsersWithPage(currentPage);
            console.log("check response from getUsers in User.js", response);
            if (response) {
                if (+response.EC === 0) {
                    setListUsers(response.DT.data);
                    setTotalPage(response.DT.totalPages);
                }
            }
        } catch (error) {

        }
    }
    // const setPage = (page) => {
    //     setCurrentPage({ page });
    // }

    const changePage = (page) => {
        setCurrentPage(page);
    }


    //create
    const handleOnchangeDataUser = async (ob) => {
        if (action === "CREATE") {
            await setDataCreateUser({ ...dataCreateUser, ...ob })
        } else {
            await setDataUpdateUser({ ...dataUpdateUser, ...ob })
        }
    }

    // const enableModalUser = async () => {
    //     setShowModalCreate(true);
    // }

    const handleCreateFullUser = async () => {
        let checkConfirm = confirmRequest(dataCreateUser);
        if (checkConfirm) {
            return;
        }
        console.log("thông tin sẽ gửi...", dataCreateUser);
        let response = await createFullUser(dataCreateUser);
        if (response && response.EC === 0) {
            console.log(response);
            toast.success(response.EM);
            handleClose();
            getUsers();
        }
        else {
            toast.error(response.EM);
        }
    }

    //Update
    const handleEditUser = async () => {
        try {
            let checkConfirm = confirmRequest(dataUpdateUser);
            if (checkConfirm) {
                return;
            }
            let response = await editUserWithId(dataUpdateUser);
            console.log("check responce", response);
            if (response && response.EC === 0) {
                toast.success(response.EM);
                handleClose();
                getUsers();
            } else {
                toast.error(response.EM);
            }
        } catch (error) {
            console.log('lỗi React Edit Function', error)
        }
    }
    //Delete
    const confirmDeleteUser = async () => {
        let response = await deleteUserWithId(dataItem.item);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            getUsers();
        } else {
            toast.error(response.EM);
        }
        setShowModal(false);
    }

    const deleteUser = async (item) => {
        setDataItem(item);
        setShowModal(true);
    }


    const confirmRequest = (data) => {
        if (!data?.username) {
            toast.warning("Bạn cần nhập Tên tài khoản");
            return true;
        }
        if (!data?.email) {
            toast.warning("Bạn cần nhập Email");
            return true;
        }
        if (action === "CREATE" && !data?.password) {
            toast.warning("Bạn cần nhập Mật khẩu");
            return true;
        }
        if (action === "CREATE" && data?.password.length < 8) {
            toast.warning("Mật khẩu cần ít nhất 8 ký tự");
            return true;
        }
        if (action === "CREATE" && data?.confirmPassword !== data?.password) {
            toast.warning("Mật khẩu không giống nhau");
            return true;
        }
        if (!data?.role) {
            toast.warning("Bạn cần chọn chức vụ");
            return true;
        }
    }

    return (
        <>
            <div className="User-container container">
                <div>
                    <button className="badd btn btn-primary my-3 bi-plus-circle" onClick={() => { setShowModalCreate(true); setAction("CREATE") }}>  Thêm người dùng
                    </button>
                </div>
                <table className="table table-hover table-bordered" style={{ width: "100%", tableLayout: "fixed", borderCollapse: "collapse" }}>
                    <colgroup>
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "15%" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th >Tài khoản</th>
                            <th >Email</th>
                            <th >Địa chỉ</th>
                            <th >Số điện thoại</th>
                            <th >Chức vụ</th>
                            <th >Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listUsers && listUsers.length > 0 ?
                                <>
                                    {listUsers.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td >{item.username}</td>
                                                <td >{item.email}</td>
                                                <td className="address-text" >{item.address}</td>
                                                <td >{item.phone}</td>
                                                <td >{item.Role ? item.Role.roleName : "null"}</td>
                                                <td >
                                                    <button className="bfix btn btn-warning bi-pencil-square me-2" onClick={() => {
                                                        setShowModalCreate(true);
                                                        setAction("UPDATE");
                                                        setDataUpdateUser(item);
                                                    }}>  Sửa</button>
                                                    <button className="bdel btn btn-danger bi-trash" onClick={() => deleteUser({ item })}>  Xóa</button>
                                                </td>
                                            </tr>
                                        )

                                    })}
                                </>
                                :
                                <>
                                    <tr>
                                        <td colSpan={6}>
                                            Không có bản ghi nào
                                        </td>
                                    </tr>
                                </>
                        }
                    </tbody>

                </table>
                <span className="d-flex" style={{ justifyContent: 'center', alignItems: 'center' }}>
                    Trang hiện tại:
                    <span>
                        <Form.Select onChange={(event) => changePage(Number(event.target.value))}>
                            {
                                totalPage && Array.from({ length: totalPage }, (index, value) => value + 1).map((value, index) => (
                                    <option key={index} value={value} >{value}</option>
                                ))
                            }
                        </Form.Select>
                    </span>
                </span>
            </div >
            <ModalDelete show={showModal} handleClose={handleClose} confirmDeleteUser={confirmDeleteUser} />
            <ModalUser action={action} show={showModalCreate} handleClose={handleClose}
                handleCreateFullUser={handleCreateFullUser} handleOnchangeDataUser={handleOnchangeDataUser}
                handleEditUser={handleEditUser} dataUpdateUser={dataUpdateUser} showModalCreate={showModalCreate}
            />
        </>
    )
}
export default User;