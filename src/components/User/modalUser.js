import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { readRoles } from '../../ServiceAxios/userService';

const ModalUser = (props) => {
    const [dataRoles, setDataRoles] = useState([]);
    useEffect(() => {
        getRoles();
    }, []
    )
    const getRoles = async () => {
        try {
            let res = await readRoles();
            if (res.data.EC === 0) {
                let data = res.data.DT;
                await setDataRoles(data);
                await props.handleOnchangeCreate({
                    role: res.data.DT[0].roleName,
                    gender: "-none-"
                });


            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Modal className='modalUser' size="md" centered onHide={props.handleClose} show={props.show} >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modalUser-title">
                        {/* {props.titleModal} */}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-body row'>
                        <div className='form-group col-6'>
                            <label className={''}>Username(<span className='red'>*</span>)</label>
                            <input className={'form-control'} type='text' onChange={(event) => { props.handleOnchangeCreate({ "usename": event.target.value }) }} />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Email(<span className='red'>*</span>)</label>
                            <input className={'form-control'} type='email' onChange={(event) => { props.handleOnchangeCreate({ "email": event.target.value }) }} />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Phone</label>
                            <input className={'form-control'} type='text' onChange={(event) => { props.handleOnchangeCreate({ "phone": event.target.value }) }} />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Gender</label>
                            <select className='form-select' id='idForm' onChange={(event) => { props.handleOnchangeCreate({ "gender": event.target.value }) }}>
                                <option value={'None'} defaultValue>-none-</option>
                                <option value={'Female'} >Female</option>
                                <option value={'Male'}>Male</option>
                            </select>
                        </div>
                        <div className='form-group col-12'>
                            <label className={''}>Address</label>
                            <input className={'form-control'} type='text' onChange={(event) => { props.handleOnchangeCreate({ "address": event.target.value }) }} />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Password(<span className='red'>*</span>)</label>
                            <input className={'form-control'} type='text' onChange={(event) => { props.handleOnchangeCreate({ "password": event.target.value }) }} />
                        </div>
                        <div className='form-group col-6'>
                            <label className={''}>Confirm Password(<span className='red'>*</span>)</label>
                            <input className={'form-control'} type='text' onChange={(event) => { props.handleOnchangeCreate({ "confirmPassword": event.target.value }) }} />
                        </div>
                        <div className='form-group col-12'>
                            <label className={''}>Role(<span className='red'>*</span>)</label>
                            <select className='form-select' id='idForm' onChange={(event) => { props.handleOnchangeCreate({ "role": event.target.value }) }}>
                                {dataRoles.length > 0 &&
                                    dataRoles.map((value, index) => {
                                        return (
                                            <option key={index}>
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
                    <Button className='btn btn-secondary' onClick={props.handleClose}>Close</Button>
                    <Button className='btn btn-success' onClick={props.handleCreateFullUser}>submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUser;