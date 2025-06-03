import { useEffect, useState } from "react";
import "./Cart.scss";
import { getCartService } from "../../ServiceAxios/cartService.js";
import ModalDelete from './ModalDelete';
import { toast } from 'react-toastify';
import { deleteInCart } from '../../ServiceAxios/cartService.js';
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);// Tổng tiền trc khi mua
    const [numberProducts, setNumberProducts] = useState(0);// Tổng products đang tích trc khi mua
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    // const [numBuy, setNumBuy] = useState(1);
    const [checkedItems, setCheckedItems] = useState({});
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

    // const [dataBuy, setDataBuy] = useState({ defaultDataBuy });

    // const defaultDataBuy = {
    //     idProduct: ""
    // }

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
    useEffect(() => {
        getCartProducts();
    }, [])

    const showDelete = async (item) => {
        console.log("check item: ", item);
        await setDataDelete(item);
        setShowModalDelete(true);
    }

    // const handleSetNumNuy = async (value) => {
    //     if (value && value === "UP" && numBuy < 10) {
    //         setNumBuy(numBuy + 1);
    //         return;
    //     }
    //     if (value && value === "DOWN" && numBuy > 1) {
    //         setNumBuy(numBuy - 1);
    //         return;
    //     }
    // }

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


    const handleBuyItem = async (item) => {
        // setDataBuy();
    }

    return (
        <>
            <div className="cart container">
                <h2>🛒 Giỏ Hàng</h2>
                <table className="cart_tb table">
                    <thead>
                        <tr className="cart-header">
                            <td></td>
                            <td>Sản Phẩm</td>
                            <td>Tên Sản Phẩm</td>
                            <td></td>
                            <td>Đơn Giá</td>
                            <td>Số Lượng</td>
                            <td>Số Tiền</td>
                            <td>Thao Tác</td>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => {
                            return (
                                <tr key={item.idCart} className="cart-item">
                                    <td><input type="checkbox" checked={checkedItems[item.idCart] || false}
                                        onChange={() => handleCheckboxChange(item.idCart)} /></td>
                                    <td>
                                        <img src={`http://localhost:9000${item.Product.image}`} alt={"ảnh sp"} style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px'
                                        }} /></td>
                                    <td className="item-info">
                                        <p>{item.Product.title}</p>
                                        <p>Phân Loại: {item.Product.category}</p>
                                    </td>
                                    <td></td>
                                    <td className="item-price">{Number(item.Product.price).toLocaleString()}₫</td>
                                    <td className="item-quantity">
                                        {/* <button onClick={() => { handleSetNumNuy("DOWN") }}>-</button> */}
                                        <input type="text" value={item.numBuy} readOnly />
                                        {/* <button onClick={() => { handleSetNumNuy("UP") }}>+</button> */}
                                    </td>
                                    <td className="item-total">{(item.Product.price * item.numBuy).toLocaleString()}₫</td>
                                    <td><button className="delete-btn" onClick={() => { showDelete(item) }}>Xoá</button></td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>


                    <tfoot>
                        <tr className="cart-footer">
                            <td> <input type="checkbox" /></td>
                            <td> <span>Chọn Tất Cả</span></td>
                            <td></td>
                            <td> <span>Tổng cộng ({numberProducts} sản phẩm): <strong>{totalPrice} ₫</strong></span> </td>
                            <td> <button className="checkout-btn" onClick={handleBuyItem}>Mua Hàng</button> </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <ModalDelete show={showModalDelete} handleClose={handleClose} confirmDelete={confirmDelete} />
        </>
    )
}

export default Cart;