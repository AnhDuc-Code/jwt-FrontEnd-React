import { useEffect, useState } from "react";
import { getBillsService, deleteBillService } from "../../ServiceAxios/cartService";
import ModalDelete from "./ModalDelete";
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import "./Bill.scss";
const Bill = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);
    const [listBills, setListBills] = useState([]);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const defaultData = {
        image: "", title: "", description: "", price: "", category: "", brand: "", quantity: ""
    }
    const [dataDelete, setDataDelete] = useState(defaultData);
    useEffect(() => {
        getBills();
    }, [currentPage]);

    const getBills = async () => {
        try {
            let response = await getBillsService(currentPage);
            if (response && +response.EC === 0) {
                console.log("check res getBill: DT= ", response.DT)
                setListBills(response.DT.data);
                setTotalPage(response.DT.totalPages);
            }
        } catch (error) {

        }
    }

    const changePage = (page) => {
        setCurrentPage(page);
    }

    // const handleCreateProduct = async () => {
    //     console.log("gửi Create", dataCreate.image);
    //     const formCreate = new FormData();
    //     formCreate.append("image", dataCreate.image); // ✅ File object
    //     formCreate.append("title", dataCreate.title);
    //     formCreate.append("description", dataCreate.description);
    //     formCreate.append("price", dataCreate.price);
    //     formCreate.append("category", dataCreate.category);
    //     formCreate.append("brand", dataCreate.brand);
    //     formCreate.append("quantity", dataCreate.quantity);
    //     let response = await createProduct(formCreate);
    //     if (response && response.EC === 0) {
    //         console.log(response);
    //         toast.success(response.EM);
    //         handleClose();
    //         getBills();
    //     }
    //     else {
    //         toast.error(response.EM);
    //     }
    // }


    const deleteBill = async (item) => {
        setDataDelete(item);
        setShowModalDelete(true);
        console.log("check dDelete", dataDelete);
    }

    const confirmDelete = async () => {
        let response = await deleteBillService(dataDelete.item);
        if (response && +response.EC === 0) {
            toast.success(response.EM);
            getBills();
        } else {
            toast.error(response.EM);
        }
        setShowModalDelete(false);
    }

    const handleClose = () => {
        setShowModalDelete(false);
        setDataDelete({});
    }
    return (
        <>
            <div className="Bill-container container">
                <table className="table table-bordered table-hover" style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse', textAlign: "center" }}>
                    <colgroup>
                        <col style={{ width: '140px' }} />
                        <col style={{ width: '31%' }} />
                        <col style={{ width: '9%' }} />
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
                            <th>Phân loại</th>
                            <th>Hãng</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listBills && listBills.length > 0 ?
                                <>
                                    {listBills.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td><img src={item.Product.image ? (`http://localhost:9000${item.Product.image}`) : "/Default_Image.png"} style={{
                                                    width: '125px',
                                                    height: '125px',
                                                    objectFit: 'cover',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '8px'
                                                }} /></td>
                                                <td>{item.title}</td>
                                                <td>{item.Product.category ? item.Product.category : "Sản phẩm đã bị xóa"}</td>
                                                <td>{item.Product.brand ? item.Product.brand : "Sản phẩm đã bị xóa"}</td>
                                                <td>{Number(item.numBuy).toLocaleString()}</td>
                                                <td>{Number(item.price).toLocaleString()}đ</td>
                                                <td>{Number(item.totalPrice).toLocaleString()}đ</td>
                                                <td>
                                                    <button className="bdel btn btn-danger bi-trash" onClick={() => deleteBill({ item })}>  Xóa</button>
                                                </td>
                                            </tr>
                                        )

                                    })}
                                </>
                                :
                                <>
                                    <tr>
                                        <td colSpan={7}>
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
            <ModalDelete show={showModalDelete} handleClose={handleClose} confirmDelete={confirmDelete} />
        </>
    )
}
export default Bill;