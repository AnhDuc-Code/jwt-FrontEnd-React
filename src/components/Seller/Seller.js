import { useEffect, useState } from "react";
import { getProductsService, createProduct, editProduct, deleteProductWithId } from "../../ServiceAxios/productService";
import { toSellerService, logoutService } from "../../ServiceAxios/userService";
import ModalProductActions from "./ModalProductActions";
import ModalDelete from "./ModalDelete";
import ModalToSeller from "./ModalToSeller";
import { toast } from 'react-toastify';
import "./Seller.scss"

const Seller = () => {
    const [store, setStore] = useState("");
    const [storeAddress, setStoredAddress] = useState("");
    const [listProducts, setListProducts] = useState([]);
    const [showModalActions, setShowModalActions] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [action, setAction] = useState("CREATE");
    const defaultData = {
        image: "", title: "", description: "", price: "", category: "", brand: "", quantity: ""
    }
    const [imagePreview, setImagePreview] = useState(null);
    const [dataCreate, setDataCreate] = useState(defaultData);
    const [dataUpdate, setDataUpdate] = useState(defaultData);
    const [dataDelete, setDataDelete] = useState(defaultData);
    const [showModalSeller, setShowModalSeller] = useState(false);
    const [buttonToSeller, setButtonToSeller] = useState(true);

    const defaultDataSeller = {
        storeName: "", taxCode: "", addressStore: ""
    };
    const [dataToSeller, setDataToSeller] = useState(defaultDataSeller);
    const onchangeDataToSeller = (e) => {
        setDataToSeller((pre) => ({
            ...pre,
            [e.target.name]: e.target.value
        })
        )
    }

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            let responce = await getProductsService();
            if (responce && responce.EC === 0) {
                console.log("check res productUser", responce);
                setListProducts(responce.DT);
                setButtonToSeller(false);
                setStore(responce?.DT[0]?.Store?.storeName);
                setStoredAddress(responce?.DT[0]?.Store?.addressStore);
                console.log(responce.DT);
            }
        } catch (error) {

        }
    }

    const onchangeDataProduct = async (input) => {
        if (action === "CREATE") {
            await setDataCreate({ ...dataCreate, ...input })
            console.log("check change Input: ", input);
        } else {
            await setDataUpdate({ ...dataUpdate, ...input })
        }
    }

    const setImage = (event) => {
        const file = event.target.files[0];
        setImagePreview(URL.createObjectURL(file));
        if (action === "CREATE") {
            setDataCreate((pre) => ({ ...pre, image: file }))
        } else {
            setDataUpdate((pre) => ({ ...pre, image: file }))
        }
    }

    const confirmRequest = (data) => {
        if (!data?.image) {
            toast.warning("Bạn cần Hình ảnh sản phẩm");
            return true;
        }
        if (!data?.title) {
            toast.warning("Bạn cần nhập Tên sản phẩm");
            return true;
        }
        if (!data?.price || data.price <= 5000) {
            toast.warning("Bạn cần nhập Giá tiền ít nhất 5000đ");
            return true;
        }
        if (!data?.quantity || data.quantity <= 5) {
            toast.warning("Bạn cần nhập Số lượng ít nhất 5");
            return true;
        }
    }

    const handleCreateProduct = async () => {
        let checkConfirm = confirmRequest(dataCreate);
        if (checkConfirm) {
            return;
        }
        console.log("gửi Create", dataCreate.image);
        const formCreate = new FormData();
        formCreate.append("image", dataCreate.image); // ✅ File object
        formCreate.append("title", dataCreate.title);
        formCreate.append("description", dataCreate.description);
        formCreate.append("price", dataCreate.price);
        formCreate.append("category", dataCreate.category);
        formCreate.append("brand", dataCreate.brand);
        formCreate.append("quantity", dataCreate.quantity);
        let response = await createProduct(formCreate);
        if (response && response.EC === 0) {
            console.log(response);
            toast.success(response.EM);
            handleClose();
            getProducts();
        }
        else {
            toast.error(response.EM);
        }
    }

    const handleEditProduct = async () => {
        let checkConfirm = confirmRequest(dataUpdate);
        if (checkConfirm) {
            return;
        }
        console.log("gửi Update", dataUpdate.image);
        const formUpdate = new FormData();
        formUpdate.append("idProduct", dataUpdate.idProduct); // ✅ File object
        formUpdate.append("image", dataUpdate.image); // ✅ File object
        formUpdate.append("title", dataUpdate.title);
        formUpdate.append("description", dataUpdate.description);
        formUpdate.append("price", dataUpdate.price);
        formUpdate.append("category", dataUpdate.category);
        formUpdate.append("brand", dataUpdate.brand);
        formUpdate.append("quantity", dataUpdate.quantity);
        let response = await editProduct(formUpdate);
        if (response && response.EC === 0) {
            console.log(response);
            toast.success(response.EM);
            handleClose();
            getProducts();
        }
        else {
            toast.error(response.EM);
        }
    }


    const deleteProduct = async (item) => {
        setDataDelete(item);
        setShowModalDelete(true);
        console.log("check dDelete", dataDelete);
    }

    const confirmDeleteProduct = async () => {
        let response = await deleteProductWithId(dataDelete.item);
        if (response && +response.EC === 0) {
            toast.success(response.EM);
            getProducts();
        } else {
            toast.error(response.EM);
        }
        setShowModalDelete(false);
    }

    const toSeller = async () => {
        setShowModalSeller(true);
    }
    const confirmToSeller = async () => {
        let response = await toSellerService(dataToSeller);
        if (response && +response.EC === 0) {
            toast.success(response.EM);
            await logoutService();
            window.location.href = ("/login");
            toast.success("Vui lòng đăng nhập lại tài khoản!");
        } else {
            toast.error(response.EM);
        }
        setShowModalSeller(false);
    }
    const handleClose = () => {
        setShowModalActions(false);
        setShowModalDelete(false);
        setDataDelete({});
        setDataCreate(defaultData);
        setDataUpdate(defaultData);
        setImagePreview(null);
        setAction("");
        setShowModalSeller(false);
    }
    return (
        <>
            <div className="Seller-container container">
                <div className="store-info">
                    <h2 className="store-name">{store}</h2> <p className="store-address">Địa chỉ: {storeAddress}</p>
                </div>
                <button className="badd btn btn-primary mb-3 bi-plus-circle" onClick={() => { setShowModalActions(true); setAction("CREATE") }}>  Thêm sản phẩm bán
                </button>
                {buttonToSeller &&
                    <button className="bToSeller btn btn-success mb-3" onClick={() => { toSeller() }}>Đăng ký làm người bán</button>}
                <table className="table table-bordered table-hover" style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse', textAlign: "center" }}>
                    <colgroup>
                        <col style={{ width: '140px' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '9%' }} />
                        <col style={{ width: '9%' }} />
                        <col style={{ width: '9%' }} />
                        <col style={{ width: '9%' }} />
                        <col style={{ width: '14%' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>Tên SP</th>
                            <th>Mô tả</th>
                            <th>Phân loại</th>
                            <th>Hãng</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listProducts && listProducts.length > 0 ?
                                <>
                                    {listProducts.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td><img src={`http://localhost:9000${item.image}`} style={{
                                                    width: '125px',
                                                    height: '125px',
                                                    objectFit: 'cover',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '8px'
                                                }} /></td>
                                                <td><div className="title-text">{item.title}</div></td>
                                                <td><div className="description-text">{item.description}</div></td>
                                                <td>{item.category}</td>
                                                <td>{item.brand}</td>
                                                <td>{Number(item.quantity).toLocaleString()}</td>
                                                <td>{Number(item.price).toLocaleString()}</td>
                                                <td>
                                                    <button className="bfix btn btn-warning bi-pencil-square me-2" onClick={() => {
                                                        setShowModalActions(true);
                                                        setAction("UPDATE");
                                                        setDataUpdate(item);
                                                        setImagePreview(`http://localhost:9000${item.image}`);
                                                    }}>  Sửa</button>
                                                    <button className="bdel btn btn-danger bi-trash" onClick={() => deleteProduct({ item })}>  Xóa</button>
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
                    {/* <span>
                        <Form.Select onChange={(event) => changePage(Number(event.target.value))}>
                            {
                                totalPage && Array.from({ length: totalPage }, (index, value) => value + 1).map((value, index) => (

                                    <option key={index} value={value} >{value}</option>
                                ))

                            }
                        </Form.Select>
                    </span> */}
                </span>
            </div >
            <ModalDelete show={showModalDelete} handleClose={handleClose} confirmDeleteProduct={confirmDeleteProduct} />
            <ModalToSeller show={showModalSeller} handleClose={handleClose} confirmToSeller={confirmToSeller} onchangeDataToSeller={onchangeDataToSeller} />
            <ModalProductActions
                action={action} show={showModalActions} handleClose={handleClose}
                handleCreateProduct={handleCreateProduct} onchangeDataProduct={onchangeDataProduct} setImage={setImage} imagePreview={imagePreview} dataUpdate={dataUpdate}
                handleEditProduct={handleEditProduct}
            />
        </>
    )
}
export default Seller;