import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./ModalCart.scss";
const ModalAddtoCart = (props) => {
    // const [totalPrice, setTotalPrice] = useState();
    // const [numberProducts, setNumberProducts] = useState();
    useEffect(() => {
        console.log("aloha Modal add to Cart");
    }, [props.showModal]
    )


    return (
        <>
            <Modal className='modalUser' size="md" centered onHide={props.handleClose} show={props.show} >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modalAddtoCart-title">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-body'>
                        <div className="cart_preview d-flex">
                            <span className="img_bd">
                                {props.imagePreview && (
                                    <img
                                        src={`http://localhost:9000${props.imagePreview}`}
                                        alt="ảnh preview lỗi"
                                        style={{
                                            width: "200px",
                                            height: "200px",
                                            objectFit: "cover",
                                            border: "1px solid #ccc",
                                            borderRadius: "8px"
                                        }}
                                    />
                                )}
                            </span>
                            <span className="text_bd">
                                <label>Phân loại: {props.category}</label><br />
                                <label for="numBuy">Số lượng: </label>
                                <input type='number' id='numBuy' min={1} max={10} defaultValue={1} onChange={(event) => { props.setNumBuy(event.target.value) }} /><br />
                                <label>Giá tiền: {props.price}</label>
                            </span>
                        </div>
                        <hr />
                        <label className={'col-12'}>Tổng tiền: {Number(props.numBuy * props.price).toLocaleString()}</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-secondary' onClick={props.handleClose}>Đóng</Button>
                    <Button className='btn btn-success' onClick={props.addTCart}>
                        Thêm vào giỏ hàng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalAddtoCart;