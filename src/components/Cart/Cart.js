import { useEffect, useState } from "react";
import "./Cart.scss"
import { getCartService } from "../../ServiceAxios/cartService.js"
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [numberProducts, setNumberProducts] = useState(0);
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


    return (
        <>
            <div className="cart container">
                <h2>🛒 Giỏ Hàng</h2>

                <div className="cart-header">
                    <span>Sản Phẩm</span>
                    <span>Tên Sản Phẩm</span>
                    <span></span>
                    <span>Đơn Giá</span>
                    <span>Số Lượng</span>
                    <span>Số Tiền</span>
                    <span>Thao Tác</span>
                </div>

                {cartItems.map((item, index) => (
                    <div key={item.Product.idProduct} className="cart-item">
                        <img src={`http://localhost:9000${item.Product.image}`} alt={"ảnh sp"} style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            border: '1px solid #ccc',
                            borderRadius: '8px'
                        }} />
                        <div className="item-info">
                            <p>{item.Product.title}</p>
                            <p>Phân Loại: {item.Product.category}</p>
                        </div>
                        <span></span>
                        <div className="item-price">{Number(item.Product.price).toLocaleString()}₫</div>
                        <span className="item-quantity">
                            <button>-</button>
                            <input type="text" value={item.numBuy} readOnly />
                            <button>+</button>
                        </span>
                        <div className="item-total">{(item.Product.price * item.numBuy).toLocaleString()}₫</div>
                        <button className="delete-btn">Xoá</button>
                    </div>
                ))
                }

                <div className="cart-footer">
                    <input type="checkbox" />
                    <span>Chọn Tất Cả</span>
                    <button>Xoá sp đã chọn</button>
                    <span>Tổng cộng ({numberProducts} sản phẩm): <strong>{totalPrice} ₫</strong></span>
                    <button className="checkout-btn">Mua Hàng</button>
                </div>
            </div>
        </>
    )
}

export default Cart;