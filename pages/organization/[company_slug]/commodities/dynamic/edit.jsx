import React, {useEffect, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import AddModal from "@/components/modal/AddModal";
import Select from "@/components/common/form/SelectInput";
import TextInput from "@/components/common/form/TextInput";

const EditModal = ({ show, onHide, data, onSave }) => {
    const [editItem, setEditItem] = useState({...data});

    useEffect(() => {
        if(data){
            setEditItem(data);
        }
    }, [data])

    const handleSave = () => {
        onSave(editItem);
        onHide();
    };

    return (
     <>
         <Modal show={show} onHide={onHide}>
             <Modal.Header closeButton>
                 <Modal.Title>Edit Product</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <Form>

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
     </>
    );
};

export default EditModal;