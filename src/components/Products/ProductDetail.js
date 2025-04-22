import { useEffect } from "react";
import "./ProductDetail.scss";
// import { NavLink } from "react-router-dom";
const ProductDetail = (props) => {

    const productDetail1 = () => {

    }

    useEffect(() => {
        productDetail1();
    }, []
    )


    return (
        <>
            <h2 className="product-category container">Milk (số lương sữa search)</h2>
            <div className="product-detail  container">
                <div className="product-detail_left">
                    <img src="/milk.png" alt="milk" className="product-detail_image" />
                </div>

                <div className="product-detail_right">
                    <p className="brand">So Good</p>
                    <h2 className="title">props.title So Good Plant-Based Soy Beverage - Original, 2x1 L Multipack</h2>

                    <div className="rating">
                        <span className="stars">⭐ props.rate</span>
                        <span className="reviews">props.numberRate Ratings & props.numberReview Reviews</span>
                    </div>

                    <div className="price">
                        <strong>props.price</strong>
                        <span className="unit"> (props.price / props.quantity L)</span>
                    </div>
                    <p className="tax-info">(inclusive of all taxes)</p>

                    <div className="actions">
                        <button className="btn btn-add">Thêm vào giỏ hàng</button>
                    </div>

                    <div className="pack-sizes">
                        <h4>Phân loại</h4>
                        <div className="pack-option selected">
                            <div>
                                <strong>props.quantity L</strong>
                            </div>
                            <div className="price-right">
                                ₹290 (₹145 / L) ✔
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ProductDetail;