import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalToSeller = (props) => {


    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Trở thành người bán hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>Xác nhận nâng cấp tài khoản thành người bán hàng</Modal.Body>
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