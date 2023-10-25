import React, {useEffect, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProductEditModal = ({ show, onHide, product, onSave }) => {
    const [editedProduct, setEditedProduct] = useState({...product});

    useEffect(() => {
        setEditedProduct(product);
    }, [product])

    const handleSave = () => {
        onSave(editedProduct);
        onHide();
    };
    console.log(editedProduct)
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedProduct?.name}
                            onChange={(e) =>
                                setEditedProduct({ ...editedProduct, name: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedProduct?.price}
                            onChange={(e) =>
                                setEditedProduct({ ...editedProduct, price: e.target.value })
                            }
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductEditModal;
