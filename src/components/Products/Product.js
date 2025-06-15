import "./Product.scss"
import { useNavigate } from "react-router-dom";
import ModalAddtoCart from "../Cart/ModalCart";
import { addToCart } from "../../ServiceAxios/cartService";
import { toast } from 'react-toastify';
import { useState } from "react";

const Product = (props) => {
    const navigate = useNavigate();
    const toProductDetail = () => {
        navigate('/productDetail', {
            state:
            {
                idProduct: props.idProduct,
                image: props.image,
                title: props.title,
                price: props.price,
                description: props.description,
                brand: props.brand,
                category: props.category,
                quantity: props.quantity
            }
        });
    }
    const [showModal, setShowModal] = useState(false);
    const [numBuy, setNumBuy] = useState(1);

    const showModalCart = () => {
        setShowModal(true);
    }

    const addTCart = async () => {
        try {
            let response = await addToCart({ idProduct: props.idProduct, numBuy: numBuy });
            if (response && response.EC === 0) {
                console.log(response);
                toast.success(response.EM);
                handleClose();
            }
            else {
                toast.error(response.EM);
            }
        } catch (error) {
            toast.error("Lỗi FE khi thêm vào giỏ hàng");
        }
    }

    const handleClose = () => {
        setShowModal(false);
        setNumBuy(1);
        // setShowModalCreate(false);
        // setDataCreateUser(defaultData);
        // setDataUpdateUser(defaultData);
    }
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
    return (
        <>
            <div className="product">

                <div onClick={() => { toProductDetail(); }}>
                    <img className="product-img" alt="product" src={`http://localhost:9000${props.image}`} style={{
                        width: '190px',
                        height: '190px',
                        objectFit: 'cover',
                        border: '1px solid #ccc',
                        borderRadius: '8px'
                    }} />
                    <div className="product-detail-home">
                        <p className="product-title-home">{props.title}</p>
                        <p className="product-price-home">{Number(props.price).toLocaleString()}đ</p>
                    </div>
                </div>
                <button className="addToCart-home btn" onClick={() => showModalCart()}>Thêm vào giỏ hàng</button>
            </div>
            <ModalAddtoCart show={showModal} handleClose={handleClose} addTCart={addTCart}
                imagePreview={props.image} title={props.title} category={props.category} setNumBuy={setNumBuy} price={props.price} numBuy={numBuy} handleSetNumNuy={handleSetNumNuy} />
        </>
    )
}
export default Product;