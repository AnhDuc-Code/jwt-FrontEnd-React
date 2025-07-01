import { useEffect, useState } from "react";
import { getOrdersService, deleteOrderService } from "../../ServiceAxios/orderService";
import "./Order.scss"
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete';
import ModalUser from './modalUser'

const Order = () => {
    const [listOrders, setListOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);

    const [action, setAction] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [dataItem, setDataItem] = useState({});
    // const [role,setRole]=useState("");
    const handleClose = () => {
        setShowModal(false);
        setDataItem({});
    }

    useEffect(() => {
        getOrders();
    }, [currentPage])

    let response;
    const getOrders = async () => {
        try {
            response = await getOrdersService(currentPage);
            console.log("check response getOrders: ", response);
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

    //Update
    // const handleEditState = async () => {
    //     try {
    //         let checkConfirm = confirmRequest(dataUpdateUser);
    //         if (checkConfirm) {
    //             return;
    //         }
    //         let response = await editUserWithId(dataUpdateUser);
    //         console.log("check responce", response);
    //         if (response && response.EC === 0) {
    //             toast.success(response.EM);
    //             handleClose();
    //             getUsers();
    //         } else {
    //             toast.error(response.EM);
    //         }
    //     } catch (error) {
    //         console.log('lỗi React Edit Function', error)
    //     }
    // }

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
                        <col style={{ width: '140px' }} />
                        <col style={{ width: "23%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "15%" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th >Cửa hàng</th>
                            <th >Ảnh sản phẩm</th>
                            <th >Tên sản phẩm</th>
                            <th >Lượng mua</th>
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
                                                <td >{item.Store.storeName}</td>
                                                <td ><img className="product-img" alt="product" src={`http://localhost:9000${item.Product.image}`} style={{
                                                    width: '125px',
                                                    height: '125px',
                                                    objectFit: 'cover',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '8px'
                                                }} /></td>
                                                <td className="product-name" >{item.Product.title}</td>
                                                <td >{item.numBuy}</td>
                                                <td >{item.Product.price}</td>
                                                <td >{item.totalPrice}</td>
                                                <td >{item.state}</td>
                                                <td >
                                                    {/* <button className="bfix btn btn-warning bi-pencil-square me-2" onClick={() => {
                                                        // setShowModalCreate(true);
                                                        // setAction("UPDATE");
                                                        // setDataUpdateUser(item);
                                                    }}>  Sửa</button> */}
                                                    <button className="bdel btn btn-danger bi-trash" onClick={() => deleteOrder({ item })}>  Xóa</button>
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
            {/* <ModalUser action={action} show={showModalCreate} handleClose={handleClose}
                handleCreateFullUser={handleCreateFullUser} handleOnchangeDataUser={handleOnchangeDataUser}
                handleEditUser={handleEditUser} dataUpdateUser={dataUpdateUser} showModalCreate={showModalCreate} 
            /> */}
        </>
    )
}
export default Order;