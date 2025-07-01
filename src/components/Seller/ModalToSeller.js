import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalToSeller = (props) => {


    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Trở thành người bán hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-body row'>
                        <div className='form-group col-6'>
                            <label className={''}>Tên cửa hàng(<span className='red'>*</span>)</label>
                            <input className="form-control" type="text" name='storeName'
                                onChange={props.onchangeDataToSeller} />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Mã số thuế(<span className='red'>*</span>)</label>
                            <input className="form-control" type="text" name='taxCode'
                                onChange={props.onchangeDataToSeller} />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Địa chỉ(<span className='red'>*</span>)</label>
                            <input className="form-control" type="text" name='addressStore'
                                onChange={props.onchangeDataToSeller} />
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={props.confirmToSeller}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalToSeller;