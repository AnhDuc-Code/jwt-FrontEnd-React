import { useEffect, useState } from "react";
import "./Cart.scss";
import { getCartService, deleteInCart, buyItem } from "../../ServiceAxios/cartService.js";
import ModalDelete from './ModalDelete';
import { toast } from 'react-toastify';
import { NavLink } from "react-router-dom";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);// Tổng tiền trc khi mua
    const [numberProducts, setNumberProducts] = useState(0);// Tổng products đang tích trc khi mua
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    // const [numBuy, setNumBuy] = useState(1);
    const [checkedItems, setCheckedItems] = useState({});
    useEffect(() => {
        getCartProducts();
    }, []);

    useEffect(() => {
        if (cartItems.length > 0) {
            const checked = {};
            cartItems.forEach(item => {
                checked[item.idCart] = false;
            });
            setCheckedItems(checked);
            console.log("check cb", cartItems);//check cb {undefined: false}
        }
    }, [cartItems]);

    // Tính những sản phẩm đã được chọn (checkbox)
    useEffect(() => {
        let totalCount = 0;
        let totalMoney = 0;
        cartItems.forEach(item => {
            if (checkedItems[item.idCart]) {
                totalCount += Number(item.numBuy);
                totalMoney += Number(item.Product.price) * Number(item.numBuy);
            }
        });
        setNumberProducts(totalCount);
        setTotalPrice(totalMoney);
    }, [cartItems, checkedItems]);

    const getCartProducts = async () => {
        try {
            let response = await getCartService();
            console.log("check response from getUsers in User.js", response);
            if (response) {
                if (+response.EC === 0) {
                    console.log("Check DataCart: ", response.DT);
                    setCartItems(response.DT);
                }
            }
        } catch (error) {

        }
    }

    const showDelete = async (item) => {
        console.log("check item: ", item);
        await setDataDelete(item);
        setShowModalDelete(true);
    }

    const confirmDelete = async () => {
        let response = await deleteInCart(dataDelete);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            getCartProducts();
        } else {
            toast.error(response.EM);
        }
        setShowModalDelete(false);
    }

    const handleClose = () => {
        setShowModalDelete(false);
        setDataDelete({});
    }

    const handleCheckboxChange = (idProduct) => {
        setCheckedItems(prev => ({
            ...prev,
            [idProduct]: !prev[idProduct],
        }));
    };


    const handleBuyItem = async () => {
        let selectedItems = [];
        selectedItems = cartItems.filter(item => checkedItems[item.idCart]);

        if (selectedItems.length === 0) {
            toast.warning("Bạn chưa chọn sản phẩm nào để mua!");
            return;
        }
        for (const item of selectedItems) {
            const dataToSend = {
                idCart: item.idCart,
                idProduct: item.Product.idProduct,
                title: item.Product.title,
                price: item.Product.price,
                numBuy: item.numBuy,
                totalPrice: item.numBuy * item.Product.price
            };
            try {
                // 👇 Gửi API đặt hàng từng sản phẩm
                if (dataToSend.idProduct) {
                    let response = await buyItem(dataToSend);
                    if (+response.EC === 0) {
                        toast.success(response.EM);
                        getCartProducts();
                    } else if (+response.EC === 3) {
                        toast.warning(response.EM);//số lượng sp kho không đủ
                    }
                    else {
                        toast.error(response.EM);
                    }
                }
                else {
                    toast.warning(`🚨 Sản phẩm không tồn tại. (FE) Vui lòng xóa sản phẩm!`);

                }
            } catch (error) {
                toast.error(`🚨❌ Lỗi hệ thống FE khi xử lý sản phẩm: ${item.Product.title}`);
            }
        }
    }
    return (
        <>
            <div className="cart container">
                <div className="cart-title">
                    <h2><i className="bi bi-cart4"></i><p className="cart-tt-text">Giỏ Hàng</p></h2>
                    <NavLink type="button" className="tobill" to="/orderHistory"><p className="tobill-text"><i className="tobill-icon bi-receipt-cutoff">   </i>Lịch sử mua hàng</p></NavLink>
                </div>
                <table className="cart_tb table" style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
                    <colgroup>
                        <col style={{ width: '3%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '14%' }} />
                        <col style={{ width: '13%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '10%' }} />
                    </colgroup>
                    <thead>
                        <tr className="cart-header">
                            <td></td>
                            <td>Ảnh Sản Phẩm</td>
                            <td>Tên Sản Phẩm</td>
                            <td></td>
                            <td>Đơn Giá</td>
                            <td>Số Lượng</td>
                            <td>Số Tiền</td>
                            <td>Thao Tác</td>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.idCart} className="cart-item">
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={checkedItems[item.idCart] || false}
                                        onChange={() => handleCheckboxChange(item.idCart)}
                                    />
                                </td>
                                <td>
                                    <img
                                        src={item.Product.image ? (`http://localhost:9000${item.Product.image}`) : "/Default_Image.png"}
                                        alt="ảnh sản phẩm"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </td>
                                <td className="item-info">
                                    <p style={{ fontWeight: 'bold', paddingTop: "1rem" }}>{(item.Product.title !== null) ? item.Product.title : "Sản phẩm đã bị xóa"}</p>
                                    <p style={{ fontSize: '14px', color: '#555' }}>
                                        Phân Loại: {item.Product.category}
                                    </p>
                                </td>
                                <td></td>
                                <td className="item-price">{Number(item.Product.price).toLocaleString()}₫</td>
                                <td className="item-quantity">
                                    <input type="text" value={item.numBuy} readOnly />
                                </td>
                                <td className="item-total" style={{ fontWeight: 'bold' }}>
                                    {(item.Product.price * item.numBuy).toLocaleString()}₫
                                </td>
                                <td>
                                    <button className="delete-btn text-danger" onClick={() => showDelete(item)}>
                                        Xoá
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr className="cart-footer">
                            <td colSpan={4}></td>
                            <td colSpan={2}>
                                <span>
                                    Tổng cộng ({numberProducts} sản phẩm): <strong>{totalPrice} ₫</strong>
                                </span>
                            </td>
                            <td>
                                <button className="checkout-btn btn btn-primary" onClick={handleBuyItem}>
                                    Mua Hàng
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <ModalDelete show={showModalDelete} handleClose={handleClose} confirmDelete={confirmDelete} />
        </>
    )
}

export default Cart;