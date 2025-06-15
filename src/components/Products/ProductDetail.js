import { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { useLocation } from "react-router-dom";
import { addToCart } from "../../ServiceAxios/cartService";
import { toast } from 'react-toastify';

const ProductDetail = (props) => {
    const location = useLocation();
    // console.log(location);

    useEffect(() => {
        console.log("check Props: ");
    }, []
    )

    const [numBuy, setNumBuy] = useState(1);

    const handleSetNumNuy = async (value) => {
        if (value && value === "UP" && numBuy < 10) {
            setNumBuy(numBuy + 1);
            return;
        }
        if (value && value === "DOWN" && numBuy > 1) {
            setNumBuy(numBuy - 1);
            return;
        }
    }

    const addTCart = async () => {
        try {
            let response = await addToCart({ idProduct: location.state.idProduct, numBuy: numBuy });
            if (response && response.EC === 0) {
                console.log(response);
                toast.success(response.EM);
            }
            else {
                toast.error(response.EM);
            }
        } catch (error) {
            toast.error("Lỗi FE khi thêm vào giỏ hàng");
        }
    }

    return (
        <>
            <div className="product-detail  container">
                <div className="product-detail_left">
                    <img src={`http://localhost:9000${location.state.image}`} style={{
                        width: '400px',
                        height: '400px',
                        objectFit: 'cover',
                        border: '1px solid #ccc',
                        borderRadius: '8px'
                    }} alt="milk" className="product-detail_image" />
                </div>

                <div className="product-detail_right">
                    <h2 className="title">{location.state.title}</h2>
                    <p className="brand">{location.state.quantity} Sản phẩm có sẵn.</p>

                    <div className="rating">
                        <span className="stars">⭐ location.state.rate</span>
                        <span className="reviews">location.state.numberRate Đánh giá & location.state.numberReview Bình luận</span>
                    </div>

                    <div className="price">
                        <strong>Giá: {Number(location.state.price).toLocaleString()}đ</strong>
                    </div>
                    <div className="brand">
                        <strong>Hãng {location.state.brand}</strong>
                    </div>
                    <div className="numbuy">
                        <b className="text-selector">Số lượng: </b>
                        <button className="setNumBuy1" onClick={() => { handleSetNumNuy("DOWN") }}>-</button>
                        <label type='number' id='numBuy' className="setNumBuy" defaultValue={1}>{numBuy}</label>
                        <button className="setNumBuy2" onClick={() => { handleSetNumNuy("UP") }}>+</button>
                    </div>

                    <div className="pack-sizes">
                        <b className="text-selector">Phân loại</b>
                        <div className="pack-option selected">
                            <div>
                                <strong>{Number(location.state.price).toLocaleString()}đ</strong>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <b>Tổng tiền: {Number(numBuy * location.state.price).toLocaleString()}đ</b>
                    <br />
                    <div className="actions">
                        <button className="btn btn-add" onClick={() => { addTCart(); }}>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
            <div className="description-context container">
                <p className="text-description">Mô tả Sản Phẩm</p>
                <p className="description">{location.state.description}</p>
            </div>
        </>
    )
}
export default ProductDetail;