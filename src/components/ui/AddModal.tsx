import React, { useState } from 'react'
import { Button, Modal, Form, Col } from 'react-bootstrap'

interface AddModalProps {
    type: string;
    data: any;
}

interface Repodata {
    title: string;
    data: any;
}

const AddModal = ({ type, data }: AddModalProps) => {
    const [show, setShow] = useState<boolean>(false);
    const [itemsArray, setItemsArray] = useState<any>([]);
    const [input, setInput] = useState<string>('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    setShow(false);
    const val = { title: input, details: data };
    itemsArray.push(val);
    setItemsArray(val)
    const getLocalData = localStorage.getItem('data');
    const getLocalParsed = JSON.parse(getLocalData  || '[]');
    const finalVal = getLocalParsed ? getLocalParsed.concat(itemsArray) : itemsArray;
    localStorage.setItem('data', JSON.stringify(finalVal));
  }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Add to manager
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add to manager</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form className="">
                    <Form.Row className="align-items-end">
                        <Col xs={12}>
                        <Form.Group className="ml-2">
                        <Form.Label>Tittle (optional)</Form.Label>
                             <Form.Control type="text" value={input} onInput={(e: any) => setInput(e.target.value)} placeholder="Enter title" />
                        </Form.Group>
                        </Col>
                        
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save to manager
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddModal
