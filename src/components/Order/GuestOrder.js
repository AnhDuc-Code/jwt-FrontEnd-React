import { useEffect, useState } from "react";
import { getOrdersService, deleteOrderService, getGuestOrdersService, updateStateService } from "../../ServiceAxios/orderService";
import "./Order.scss"
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete';
import ModalUser from './modalUser'

const GuestOrder = () => {
    const [listOrders, setListOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);

    const [action, setAction] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [dataItem, setDataItem] = useState({});

    const defaultData = {
        Product: {
            image: "",
            title: "",
            price: "",
            catogory: "",
            brand: ""
        },
        Store: {
            idStore: "",
            storeName: ""
        },
        User: {
            idUser: "",
            username: ""
        },
        idOrder: "",
        idProduct: "",
        idStore: "",
        idUser: "",
        numBuy: "",
        state: ""
    }
    const [dataUpdate, setDataUpdate] = useState(defaultData);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    // const [role,setRole]=useState("");
    const [state, setState] = useState("");
    const handleClose = () => {
        setShowModal(false);
        setDataItem({});
        setShowModalUpdate("");
        setState("");
    }

    useEffect(() => {
        getOrders();
    }, [currentPage])

    let response;
    const getOrders = async () => {
        try {
            response = await getGuestOrdersService(currentPage);
            console.log("check response getGuestOrders: ", response);
            if (response) {
                if (+response.EC === 0) {
                    setListOrders(response.DT.data);
                    setTotalPage(response.DT.totalPages);
                    // if(response.DT?.data[0]?.User?.idRole===1){
                    //     setRole("USER");
                    // }else{
                    //     setRole("SELLER");
                    // }
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

    // Update
    const handleEditState = async () => {
        try {
            // let checkConfirm = confirmRequest(dataUpdateUser);
            // if (checkConfirm) {
            //     return;
            // }

            let response = await updateStateService(dataUpdate);
            console.log("check responce", response);
            if (response && response.EC === 0) {
                toast.success(response.EM);
                handleClose();
                getOrders();
            } else {
                toast.error(response.EM);
            }
        } catch (error) {
            console.log('lỗi React Edit Function', error)
        }
    }

    // Delete
    const confirmDeleteOrder = async () => {
        // console.log("check del Order: ", dataItem);
        let response = await deleteOrderService(dataItem.item);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            getOrders();
        } else {
            toast.error(response.EM);
        }
        setShowModal(false);
    }

    const deleteOrder = async (item) => {
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

    const handleOnchangeState = async (ob) => {
        await setState(ob);
        setDataUpdate((prev) => ({
            ...prev, state: ob
        }))
        // if (action === "CREATE") {
        // await setState({ ...state, ...ob })
        // } else {
        //     await setState({ ...state, ...ob })
        // }
    }

    return (
        <>
            <div className="Order-container container">
                {/*    <div>
                    <button className="badd btn btn-primary my-3 bi-plus-circle" onClick={() => { setAction("User") }}>  Thêm người dùng
                    </button>
                </div>*/}
                <table className="table table-hover table-bordered" style={{ width: "100%", tableLayout: "fixed", borderCollapse: "collapse", textAlign: 'center' }}>
                    <colgroup>
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "13%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: '140px' }} />
                        <col style={{ width: "18%" }} />
                        <col style={{ width: "7%" }} />
                        <col style={{ width: "7%" }} />
                        <col style={{ width: "8%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "8%" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th >Tên khách</th>
                            <th >Địa chỉ</th>
                            <th >Số điện thoại</th>
                            <th >Ảnh sản phẩm</th>
                            <th >Tên sản phẩm</th>
                            <th >Số mua</th>
                            <th >Giá tiền</th>
                            <th >Tổng tiền</th>
                            <th >Trạng thái</th>
                            <th >Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listOrders && listOrders.length > 0 ?
                                <>
                                    {listOrders.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td >{item.User.username}</td>
                                                <td >{item.User.address}</td>
                                                <td >{item.User.phone}</td>
                                                <td ><img className="product-img" alt="product" src={`http://localhost:9000${item.Product.image}`} style={{
                                                    width: '125px',
                                                    height: '125px',
                                                    objectFit: 'cover',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '8px'
                                                }} /></td>
                                                <td className="product-name" >{item.Product.title}</td>
                                                <td >{item.numBuy}</td>
                                                <td >{Number(item.Product.price).toLocaleString()}đ</td>
                                                <td >{Number(item.totalPrice).toLocaleString()}đ</td>
                                                <td >{item.state}</td>
                                                <td >
                                                    <div>

                                                        <button className="bfix btn btn-warning mb-3" style={{ width: "80px" }} onClick={() => {
                                                            setShowModalUpdate(true);
                                                            // setAction("UPDATE");
                                                            setState(item.state);
                                                            setDataUpdate(item);
                                                        }}>  Duyệt</button>
                                                    </div>
                                                    <div><button className="bdel btn btn-danger bi-trash" style={{ width: "80px" }} onClick={() => deleteOrder({ item })}>  Xóa</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )

                                    })}
                                </>
                                :
                                <>
                                    <tr>
                                        <td colSpan={8}>
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
            <ModalDelete show={showModal} handleClose={handleClose} confirmDeleteOrder={confirmDeleteOrder} />
            <ModalUser action={action} show={showModalUpdate} handleClose={handleClose}
                // handleCreateFullUser={handleCreateFullUser} 
                handleOnchangeState={handleOnchangeState}
                dataUpdate={dataUpdate}
                handleEditState={handleEditState}
                state={state}
            // showModalCreate={showModalCreate}
            />
        </>
    )
}
export default GuestOrder;