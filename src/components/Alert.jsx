import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AlertModal = (props) => {
    const { t } = useTranslation();
    const [show, setShow] = useState(props.props);
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('common.please')}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Link to="/login">{t('common.login')}</Link>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AlertModal;
