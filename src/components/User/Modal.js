import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalDelete = (props) => {


    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận Xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>Chắn chắn Xóa bản ghi</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={props.confirmDeleteUser}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalDelete;