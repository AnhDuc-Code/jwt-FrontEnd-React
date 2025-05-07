import { useEffect, useState } from "react";


const Seller = () => {
    const a = useState("");

    const [listProducts, setListProducts] = useState([]);
    const getProducts = () => {
        try {

        } catch (error) {

        }
    }
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <div className="Seller-container container">
                <div>
                    {/* <button className="btn btn-primary my-3" onClick={() => { setShowModalCreate(true); setAction("CREATE") }}>
                        Thêm sản phẩm bán
                    </button> */}
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // listProducts && listProducts.length > 0 ?
                            //     <>
                            //         {listProducts.map((item, index) => {
                            //             return (
                            //                 <tr className="d-flex" key={index}>
                            //                     <td style={{ flex: 2 }}>{item.image}</td>
                            //                     <td style={{ flex: 3 }}>{item.title}</td>
                            //                     <td style={{ flex: 3 }}>{item.description}</td>
                            //                     <td style={{ flex: 2 }}>{item.category}</td>
                            //                     <td style={{ flex: 2 }}>{item.brand}</td>
                            //                     <td style={{ flex: 2 }}>{item.price}</td>
                            //                     <td style={{ flex: 2 }}>
                            //                         {/* <button className="btn btn-warning me-2" onClick={() => {
                            //                             setShowModalCreate(true);
                            //                             setAction("UPDATE");
                            //                             setDataUpdateUser(item);
                            //                         }}>Sửa</button> */}
                            //                         {/* <button className="btn btn-danger" onClick={() => deleteUser({ item })}>Xóa</button> */}
                            //                     </td>
                            //                 </tr>
                            //             )

                            //         })}
                            //     </>
                            //     :
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
            {/* <ModalDelete show={showModal} handleClose={handleClose} confirmDeleteUser={confirmDeleteUser} />
            <ModalUser action={action} show={showModalCreate} handleClose={handleClose}
                handleCreateFullUser={handleCreateFullUser} handleOnchangeDataUser={handleOnchangeDataUser}
                handleEditUser={handleEditUser} dataUpdateUser={dataUpdateUser} showModalCreate={showModalCreate}
            /> */}
        </>
    )
}
export default Seller;