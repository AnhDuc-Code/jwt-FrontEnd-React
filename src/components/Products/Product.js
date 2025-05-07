import "./Product.scss"
import ProductDetail from "./ProductDetail";
import imgtest from "./testSrc/1.png";
import { NavLink, useNavigate } from "react-router-dom"
const Product = (props) => {
    const navigate = useNavigate();
    const toProductDetail = () => {
        navigate('/productDetail', {
            state:
            {
                title: props.title,
                price: props.price,
                description: props.description,
                brand: props.brand,
                category: props.category
            }
        });
    }

    const addToCart = () => {

    }
    return (
        <>
            <div className="product" onClick={() => { toProductDetail(); }}>
                <img className="product-img" alt="product" src={imgtest}></img>
                <div className="product-detail-home">
                    <p className="product-title-home">{props.title}</p>
                    <p>{props.brand}</p>
                    <p className="product-price-home">{props.price}</p>
                </div>
                <button className="addToCart-home btn" onClick={() => addToCart()}>Thêm vào giỏ hàng</button>
            </div>
        </>
    )
}
export default Product;