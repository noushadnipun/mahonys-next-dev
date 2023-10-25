import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProductAddModal = ({ show, onHide, onAdd }) => {
    const [newProduct, setNewProduct] = useState({ name: '', price: '' });

    const handleAddProduct = () => {
        onAdd(newProduct);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAddProduct}>
                    Add Product
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductAddModal;
