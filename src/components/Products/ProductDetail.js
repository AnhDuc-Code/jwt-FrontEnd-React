import { useEffect } from "react";
import "./ProductDetail.scss";
import { useLocation } from "react-router-dom";
const ProductDetail = (props) => {
    const location = useLocation();
    console.log(location);
    const productDetail1 = () => {

    }

    useEffect(() => {
        console.log("check Props: ", props);
        productDetail1();
    }, []
    )


    return (
        <>
            <div className="product-detail  container">
                <div className="product-detail_left">
                    <img src="/milk.png" alt="milk" className="product-detail_image" />
                </div>

                <div className="product-detail_right">
                    <p className="brand">So Good</p>
                    <h2 className="title">{location.state.title}</h2>

                    <div className="rating">
                        <span className="stars">⭐ location.state.rate</span>
                        <span className="reviews">location.state.numberRate Ratings & location.state.numberReview Reviews</span>
                    </div>

                    <div className="price">
                        <strong>{location.state.price} - Hãng {location.state.brand}</strong>
                    </div>
                    <div className="actions">
                        <button className="btn btn-add">Thêm vào giỏ hàng</button>
                    </div>

                    <div className="pack-sizes">
                        <b className="text-selector">Phân loại</b>
                        <div className="pack-option selected">
                            <div>
                                <strong>{location.state.price}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <p className="text-description">Mô tả Sản Phẩm</p>
                <p className="description">{location.state.description}</p>
            </div>

        </>
    )
}
export default ProductDetail;