import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./ModalCart.scss";

const ModalAddtoCart = (props) => {
    // const [totalPrice, setTotalPrice] = useState();
    // const [numberProducts, setNumberProducts] = useState();
    useEffect(() => {
        // console.log("aloha Modal add to Cart"); render nhiều (= với số sản phẩm truy xuất)
    }, []
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
                                <label>Giá tiền: {Number(props.price).toLocaleString()}đ</label>
                                <br />
                                <span>
                                    <button className="setNumBuy1" onClick={() => { props.handleSetNumNuy("DOWN") }}>-</button>
                                    <label type='number' id='numBuy' className="setNumBuy" defaultValue={1} >{props.numBuy}</label>
                                    <button className="setNumBuy2" onClick={() => { props.handleSetNumNuy("UP") }}>+</button>
                                </span>
                            </span>
                        </div>
                        <hr />
                        <b className={'col-12'}>Tổng tiền: {Number(props.numBuy * props.price).toLocaleString()}đ</b>
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