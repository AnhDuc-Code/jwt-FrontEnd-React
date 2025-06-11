import { useEffect, useState } from "react";
import { getProductsService, createProduct, deleteProductWithId } from "../../ServiceAxios/productService";
import ModalProductActions from "./ModalProductActions";
import ModalDelete from "./ModalDelete";
import { toast } from 'react-toastify';
import "./Seller.scss"

const Seller = () => {
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
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            let responce = await getProductsService();
            if (responce && responce.EC === 0) {
                console.log("check res productUser", responce);
                setListProducts(responce.DT);
            }
        } catch (error) {

        }
    }

    const onchangeDataProduct = async (input) => {
        if (action === "CREATE") {
            await setDataCreate({ ...dataCreate, ...input })
        } else {
            await setDataUpdate({ ...dataUpdate, ...input })
        }
    }

    const setImage = (event) => {
        console.log("check event", event);
        const file = event.target.files[0];
        setImagePreview(URL.createObjectURL(file));
        setDataCreate((pre) => ({ ...pre, image: file }))
    }

    const handleCreateProduct = async () => {
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

    const handleClose = () => {
        setShowModalActions(false);
        setShowModalDelete(false);
        setDataDelete({});
        setDataCreate(defaultData);
        setDataUpdate(defaultData);
        setImagePreview(null);
    }
    return (
        <>
            <div className="Seller-container container">
                <div>
                    <button className="badd btn btn-primary my-3 bi-plus-circle" onClick={() => { setShowModalActions(true); setAction("CREATE") }}>  Thêm sản phẩm bán
                    </button>
                </div>
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
                                                <td>{item.title}</td>
                                                <td className="description-text">{item.description}</td>
                                                <td>{item.category}</td>
                                                <td>{item.brand}</td>
                                                <td>{Number(item.quantity).toLocaleString()}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <button className="bfix btn btn-warning bi-pencil-square me-2" onClick={() => {
                                                        setShowModalActions(true);
                                                        setAction("UPDATE");
                                                        setDataUpdate(item);
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
            <ModalProductActions
                action={action} show={showModalActions} handleClose={handleClose}
                handleCreateProduct={handleCreateProduct} onchangeDataProduct={onchangeDataProduct} setImage={setImage} imagePreview={imagePreview} dataCreate={dataCreate}
            //     handleEditUser={handleEditUser} dataUpdateUser={dataUpdateUser} showModalCreate={showModalCreate}
            />
        </>
    )
}
export default Seller;