import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalGuestInfo = (props) => {
    const [stateModal, setStateModal] = useState("");
    useEffect(() => {
        startModal();
    }, [props.show]
    )

    const startModal = async () => {
        setStateModal(props.state);
    }
    useEffect(() => {

    }, []
    )

    return (
        <>
            <Modal className='modalUser' size="lg" centered onHide={props.handleClose} show={props.show} >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modalUser-title">
                        Cập nhật trạng thái đơn hàng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-body row'>
                        <div className='form-group col-6'>
                            <label className={''}>Tên khách</label>
                            <input className={'form-control'} type='text' value={props?.dataUpdate?.User?.username} readOnly />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Số điện thoại</label>
                            <input className={'form-control'} type='text' value={props?.dataUpdate?.User?.phone} readOnly />
                        </div>
                        <div className='form-group col-12 mb-3'>
                            <label className={''}>Địa chỉ</label>
                            <text className={'form-control'} type='text' readOnly disabled>{props?.dataUpdate?.User?.address}</text>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Ảnh sản phẩm</label><br />
                            {props.imagePreview !== null && <img src={`http://localhost:9000${props?.dataUpdate?.Product?.image}`} alt='ảnh preview lỗi' style={{
                                width: '300px',
                                height: '300px',
                                objectFit: 'cover',
                                border: '1px solid #ccc',
                                borderRadius: '8px'
                            }} />}
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Tên Sản Phẩm</label>
                            <input className={'form-control'} type='text' value={props?.dataUpdate?.Product?.title} readOnly />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Giá tiền</label>
                            <input className={'form-control'} type='text' value={props?.dataUpdate?.Product?.price} readOnly />
                        </div>

                        <div className='form-group col-6'>
                            <label className={''}>Phân loại</label>
                            <input className={'form-control'} type='text' value={props?.dataUpdate?.Product?.category} readOnly />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Hãng</label>
                            <input className={'form-control'} type='text' value={props?.dataUpdate?.Product?.brand} readOnly />
                        </div>
                        <div className='form-group col-6 mb-3'>
                            <label className={''}>Số lượng trong kho</label>
                            <input className={'form-control'} type='text' value={props?.dataUpdate?.Product?.quantity} readOnly />
                        </div>
                        <hr />

                        <div className='form-group col-6'>
                            <label className={''}>Số lượng mua</label>
                            <input className={'form-control'} type='text' value={props?.dataUpdate?.numBuy} readOnly />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Tổng tiền</label>
                            <text className={'form-control'} type='text' readOnly>{Number(props?.dataUpdate?.totalPrice).toLocaleString()}đ</text>
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Trạng thái</label>
                            <select className='form-select' id='idForm' value={props.state} onChange={(event) => { props.handleOnchangeState(event.target.value) }}>
                                <option value={stateModal} >{stateModal}</option>
                                <option value={'Đang đóng gói'} >Đang đóng gói</option>
                                <option value={'Đang vận chuyển'}>Đang vận chuyển</option>
                                <option value={'Đã giao hàng'}>Đã giao hàng</option>
                            </select>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-secondary' onClick={props.handleClose}>Đóng</Button>
                    <Button className='btn btn-success' onClick={props.handleEditState}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalGuestInfo;