import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalGuestInfo = (props) => {
    useEffect(() => {
    }, []
    )

    useEffect(() => {

    }, []
    )

    return (
        <>
            <Modal className='modalUser' size="md" centered onHide={props.handleClose} show={props.show} >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modalUser-title">
                        Cập nhật trạng thái đơn hàng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-body row'>
                        <div className='form-group col-6'>
                            <label className={''}>Tên khách(<span className='red'>*</span>)</label>
                            <input className={'form-control'} type='text' readOnly disabled />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Email(<span className='red'>*</span>)</label>
                            <input className={'form-control'} type='email' readOnly disabled />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Số điện thoại</label>
                            <input className={'form-control'} type='text' readOnly disabled />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>State</label>
                            <select className='form-select' id='idForm' onChange={(event) => { props.handleOnchangeState(event.target.value) }}>
                                <option value={'Nữ'} >Nữ</option>
                                <option value={'Nam'}>Nam</option>
                            </select>
                        </div>
                        <div className='form-group col-12'>
                            <label className={''}>Địa chỉ</label>
                            <input className={'form-control'} type='text' />
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