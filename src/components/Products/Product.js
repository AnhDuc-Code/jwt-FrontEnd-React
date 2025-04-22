import "./Product.scss"
import imgtest from "./testSrc/1.png";
import { NavLink } from "react-router-dom"
const Product = (props) => {
    return (
        <>
            <NavLink className="product d-flex" to="productDetail">
                <img className="product-img" alt="product" src={imgtest}></img>
                <span className="product-detail">
                    <label className="product-title">{props.title}</label><label>- {props.brand}</label>
                    <p className="product-price">{props.price}</p>
                </span>
            </NavLink>
        </>
    )
}
export default Product;