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
        username: "", email: "", phone: "", gender: "", password: "", role: ""
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
            let response = await editUserWithId(dataUpdateUser);
            console.log("check responce", response);
            if (response && response.EC === 0) {
                toast.success(response.EM);
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


    const emptyFunc = () => {
    }

    return (
        <>
            <div className="User-container container">
                <div>
                    <button className="btn btn-primary my-3" onClick={() => { setShowModalCreate(true); setAction("CREATE") }}>
                        Add New User
                    </button>
                </div>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr className="d-flex">
                            <th style={{ flex: 2 }}>Username</th>
                            <th style={{ flex: 3 }}>Email</th>
                            <th style={{ flex: 3 }}>Address</th>
                            <th style={{ flex: 2 }}>Phone</th>
                            <th style={{ flex: 2 }}>Role</th>
                            <th style={{ flex: 2 }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listUsers && listUsers.length > 0 ?
                                <>
                                    {listUsers.map((item, index) => {
                                        return (
                                            <tr className="d-flex" key={index}>
                                                <td style={{ flex: 2 }}>{item.username}</td>
                                                <td style={{ flex: 3 }}>{item.email}</td>
                                                <td style={{ flex: 3 }}>{item.address}</td>
                                                <td style={{ flex: 2 }}>{item.phone}</td>
                                                <td style={{ flex: 2 }}>{item.Role ? item.Role.roleName : "null"}</td>
                                                <td style={{ flex: 2 }}>
                                                    <button className="btn btn-warning me-2" onClick={() => {
                                                        setShowModalCreate(true);
                                                        setAction("UPDATE");
                                                        setDataUpdateUser(item);
                                                    }}>Edit</button>
                                                    <button className="btn btn-danger" onClick={() => deleteUser({ item })}>Delete</button>
                                                </td>
                                            </tr>
                                        )

                                    })}
                                </>
                                :
                                <>
                                    <tr>
                                        <td>
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