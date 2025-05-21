import { useEffect, useState } from "react";
import { getProductsService, createProduct, deleteProductWithId } from "../../ServiceAxios/productService";
import ModalProductActions from "./ModalProductActions";
import ModalDelete from "./ModalDelete";
import { toast } from 'react-toastify';
const Seller = () => {
    const [listProducts, setListProducts] = useState([]);
    const [showModalActions, setShowModalActions] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [action, setAction] = useState("CREATE");
    const defaultData = {
        image: "", title: "", description: "", price: "", category: "", brand: ""
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
        if (response && response.EC === 0) {
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
                    <button className="btn btn-primary my-3" onClick={() => { setShowModalActions(true); setAction("CREATE") }}>
                        Thêm sản phẩm bán
                    </button>
                </div>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr className="d-flex">
                            <th style={{ flex: 2 }}>Ảnh</th>
                            <th style={{ flex: 3 }}>Tên SP</th>
                            <th style={{ flex: 3 }}>Mô tả</th>
                            <th style={{ flex: 2 }}>Phân loại</th>
                            <th style={{ flex: 2 }}>Hãng</th>
                            <th style={{ flex: 2 }}>Giá</th>
                            <th style={{ flex: 2 }}>thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listProducts && listProducts.length > 0 ?
                                <>
                                    {listProducts.map((item, index) => {
                                        return (
                                            <tr className="d-flex" key={index}>
                                                <td style={{ flex: 2 }}><img src={`http://localhost:9000${item.image}`} /></td>
                                                <td style={{ flex: 3 }}>{item.title}</td>
                                                <td style={{ flex: 3 }}>{item.description}</td>
                                                <td style={{ flex: 2 }}>{item.category}</td>
                                                <td style={{ flex: 2 }}>{item.brand}</td>
                                                <td style={{ flex: 2 }}>{item.price}</td>
                                                <td style={{ flex: 2 }}>
                                                    <button className="btn btn-warning me-2" onClick={() => {
                                                        setShowModalActions(true);
                                                        setAction("UPDATE");
                                                        setDataUpdate(item);
                                                    }}>Sửa</button>
                                                    <button className="btn btn-danger" onClick={() => deleteProduct({ item })}>Xóa</button>
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
                handleCreateProduct={handleCreateProduct} onchangeDataProduct={onchangeDataProduct} setImage={setImage} imagePreview={imagePreview}
            //     handleEditUser={handleEditUser} dataUpdateUser={dataUpdateUser} showModalCreate={showModalCreate}
            />
        </>
    )
}
export default Seller;