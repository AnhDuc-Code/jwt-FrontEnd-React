import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { readRoles } from '../../ServiceAxios/userService';

const ModelProductActions = (props) => {
    // const [dataRoles, setDataRoles] = useState([]);



    useEffect(() => {
        // console.log("check dataUpdateUser", props.dataUpdateUser);
    }, [props.showModalCreate]
    )


    return (
        <>
            <Modal className='modalUser' size="md" centered onHide={props.handleClose} show={props.show} >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modalUser-title">
                        {props.action === "CREATE" ? "CREATE NEW USER" : "UPDATE USER"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-body row'>
                        <div className="mb-3">
                            <label for="formFile" class="form-label">Default file input example</label>
                            <input className="form-control" type="file" id="formFile" accept="image/*" onChange={props.setImage} />
                            {props.imagePreview !== null && <img src={props.imagePreview} alt='ảnh preview lỗi' />}
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Tên Sản Phẩm(<span className='red'>*</span>)</label>
                            <input className={'form-control'} type='text' onChange={(event) => { props.onchangeDataProduct({ "title": event.target.value }) }} />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Giá tiền</label>
                            <input className={'form-control'} type='text' onChange={(event) => { props.onchangeDataProduct({ "price": event.target.value }) }} />
                        </div>

                        <div className='form-group col-6'>
                            <label className={''}>Phân loại(select)</label>
                            <input className={'form-control'} type='text' onChange={(event) => { props.onchangeDataProduct({ "category": event.target.value }) }} />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>brand(select)</label>
                            <input className={'form-control'} type='text' onChange={(event) => { props.onchangeDataProduct({ "brand": event.target.value }) }} />
                        </div>
                        <div className='form-group col-12'>
                            <label className={''}>Mô tả</label>
                            <textarea className={'form-control'} placeholder='Mô tả sp' type='text' onChange={(event) => { props.onchangeDataProduct({ "description": event.target.value }) }} />
                        </div>
                        {/* <div className='form-group col-6'>
                            {
                                (props.action === "CREATE") &&
                                <>
                                    <label className={''}>category(<span className='red'>*</span>)</label>
                                    <input className={'form-control'} type='text' onChange={(event) => { props.onchangeDataProduct({ "category": event.target.value }) }} />
                                </>
                            }
                        </div> */}
                        {/* <div className='form-group col-6'>
                            {
                                (props.action === "CREATE") &&
                                <>
                                    <label className={''}>brand(<span className='red'>*</span>)</label>
                                    <input className={'form-control'} type='text' onChange={(event) => { props.onchangeDataProduct({ "brand": event.target.value }) }} />
                                </>
                            }
                        </div> */}
                        {/* <div className='form-group col-12'>
                            <label className={''}>Role(<span className='red'>*</span>)</label>
                            <select className='form-select' id='idForm' onChange={(event) => { props.onchangeDataProduct({ "role": event.target.value }) }}>
                                {dataRoles.length > 0 &&
                                    dataRoles.map((value, index) => {
                                        return (
                                            <option key={index} value={value.idRole}>
                                                {value.roleName}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div> */}

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-secondary' onClick={props.handleClose}>Close</Button>
                    <Button className='btn btn-success' onClick={props.action === "CREATE" ? props.handleCreateProduct : props.handleEditProduct}>
                        {props.action === "CREATE" ? "Thêm sản phẩm" : "Sửa sản phẩm"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModelProductActions;