import "./Product.scss"
import imgtest from "./testSrc/1.png";
const product = (props) => {
    return (
        <>
            <a className="product d-flex" href="#link">
                <img className="product-img" alt="product" src={imgtest}></img>
                <span className="product-detail">
                    <label className="product-title">Milk</label>
                    <p className="product-price"> $price</p>
                </span>
            </a >
        </>
    )
}
export default product;