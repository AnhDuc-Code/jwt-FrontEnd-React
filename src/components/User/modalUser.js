import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { readRoles } from '../../ServiceAxios/userService';

const ModalUser = (props) => {
    const [dataRoles, setDataRoles] = useState([]);
    useEffect(() => {
        getRoles();
        console.log("check dataUpdateUser", props.dataUpdateUser);
    }, [props.showModalCreate]
    )
    const getRoles = async () => {
        try {
            let res = await readRoles();
            if (res.EC === 0) {
                let data = res.DT;
                await setDataRoles(data);
                await props.handleOnchangeDataUser({
                    role: res.DT[0].idRole,
                    gender: "-none-"
                });


            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Modal className='modalUser' size="md" centered onHide={props.handleClose} show={props.showModalCreate} >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modalUser-title">
                        {props.action === "CREATE" ? "CREATE NEW USER" : "UPDATE USER"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-body row'>
                        <div className='form-group col-6'>
                            <label className={''}>Username(<span className='red'>*</span>)</label>
                            <input className={'form-control'} type='text' onChange={(event) => { props.handleOnchangeDataUser({ "username": event.target.value }) }} />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Email(<span className='red'>*</span>)</label>
                            <input className={'form-control'} type='email' onChange={(event) => { props.handleOnchangeDataUser({ "email": event.target.value }) }} />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Phone</label>
                            <input className={'form-control'} type='text' onChange={(event) => { props.handleOnchangeDataUser({ "phone": event.target.value }) }} />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Gender</label>
                            <select className='form-select' id='idForm' onChange={(event) => { props.handleOnchangeDataUser({ "gender": event.target.value }) }}>
                                <option value={'None'} defaultValue>-none-</option>
                                <option value={'Female'} >Female</option>
                                <option value={'Male'}>Male</option>
                            </select>
                        </div>
                        <div className='form-group col-12'>
                            <label className={''}>Address</label>
                            <input className={'form-control'} type='text' onChange={(event) => { props.handleOnchangeDataUser({ "address": event.target.value }) }} />
                        </div>
                        <div className='form-group col-6'>
                            {
                                (props.action === "CREATE") &&
                                <>
                                    <label className={''}>Password(<span className='red'>*</span>)</label>
                                    <input className={'form-control'} type='text' onChange={(event) => { props.handleOnchangeDataUser({ "password": event.target.value }) }} />
                                </>
                            }
                        </div>
                        <div className='form-group col-6'>
                            {
                                (props.action === "CREATE") &&
                                <>
                                    <label className={''}>Xác nhận mật khẩu(<span className='red'>*</span>)</label>
                                    <input className={'form-control'} type='text' onChange={(event) => { props.handleOnchangeDataUser({ "confirmPassword": event.target.value }) }} />
                                </>
                            }
                        </div>
                        <div className='form-group col-12'>
                            <label className={''}>Chức vụ(<span className='red'>*</span>)</label>
                            <select className='form-select' id='idForm' onChange={(event) => { props.handleOnchangeDataUser({ "role": event.target.value }) }}>
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
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-secondary' onClick={props.handleClose}>Đóng</Button>
                    <Button className='btn btn-success' onClick={props.action === "CREATE" ? props.handleCreateFullUser : props.handleEditUser}>
                        {props.action === "CREATE" ? "Create" : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUser;