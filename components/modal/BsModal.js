
import { Modal } from "react-bootstrap";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';



const BsModal = ({ children, btnName, modalTitle, btnVariant = "primary" }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant={`${btnVariant}`} onClick={handleShow}>
                {btnName}
            </Button>

            <Modal show={show} onHide={handleClose} className="" size="lg">
                <form action="" className="material-modal">
                    <Modal.Header className="" closeButton>
                        <Modal.Title className="text-primary">{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="material-form  ">{children}</Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" value="Submit" variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default BsModal