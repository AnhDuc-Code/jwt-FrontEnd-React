import { useEffect, useState } from "react";
import "./Cart.scss"
const Cart = () => {
    const cartItems = useState({
        image: "",
        title: "",
        price: 12
    });

    const item = {
        image: 'image',
        title: 'title',
        category: 'category',
    }
    const emptyFunc = () => {

    }
    useEffect(() => {
        emptyFunc();
    }, [])
    return (
        <>
            <div className="cart">
                <h2>🛒 Giỏ Hàng</h2>

                <div className="cart-header">
                    <input type="checkbox" />
                    <span>Sản Phẩm</span>
                    <span>Đơn Giá</span>
                    <span>Số Lượng</span>
                    <span>Số Tiền</span>
                    <span>Thao Tác</span>
                </div>

                {/* {cartItems.map((item, index) => ( */}
                <div key={1} className="cart-item">
                    <input type="checkbox" />
                    <img src={item.image} alt={item.title} />
                    <div className="item-info">
                        <p>{item.title}</p>
                        <p>Phân Loại: {item.category}</p>
                    </div>
                    {/* <div className="item-price">{item.price.toLocaleString()}₫</div> */}
                    <div className="item-quantity">
                        <button>-</button>
                        <input type="text" value={item.quantity} readOnly />
                        <button>+</button>
                    </div>
                    {/* <div className="item-total">{(item.price * item.quantity).toLocaleString()}₫</div> */}
                    <button className="delete-btn">Xoá</button>
                </div>
                {/* // )) */}
                {/* } */}

                <div className="cart-footer">
                    <input type="checkbox" />
                    <span>Chọn Tất Cả</span>
                    <button>Xoá sp đã chọn</button>
                    <span>Tổng cộng (? sản phẩm): <strong>? ₫</strong></span>
                    <button className="checkout-btn">Mua Hàng</button>
                </div>
            </div>
        </>
    )
}

export default Cart;