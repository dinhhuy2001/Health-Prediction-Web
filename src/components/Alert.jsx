import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

const AlertModal = (props) => {
    const [show, setShow] = useState(props.props);
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Please login to use this!</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Link to="/login">Login</Link>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AlertModal;
