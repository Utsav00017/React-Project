import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button, Modal, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom"

function Business() {

    const [business, setBusiness] = useState([]);
    const [show, setShow] = useState(false);
    const [businessname, setBusinessName] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        GetBusiness();
    }, [businessname]);

    const GetBusiness = async () => {
        try {
            var res = await axios.get("http://localhost:1000/business");
            setBusiness(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    function handleBusiness(e) {
        setShow(false);
        if (businessname == "") {
            console.log("Name cannot be empty")
        } else {
            console.log(businessname);
            AddBusiness();
        }
        setBusinessName("");
    }

    const AddBusiness = async () => {
        debugger
        try {
            var res = await axios.post("http://localhost:1000/Addbusiness/" + businessname);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <Container fluid>
                <Container>
                    <Row >
                        <Col className="mx-auto mb-4 mt-4 header" md="auto"><h1 className="fw-lighter">Manage Your Business</h1></Col>
                    </Row>
                    <Row className="mt-3 d-flex align-items-center border">
                        <Col sm={8} className="d-flex list">
                            <h2 className="mx-auto fw-normal ">List Of Business</h2>
                        </Col>
                        <Col sm={4}>
                            <Button onClick={handleShow}>Add Business</Button>
                        </Col>
                    </Row>


                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Row className="d-flex align-items-center">
                                        <Col sm={4}>
                                            <Form.Label>Business Name</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control type="text" placeholder="Enter Business Name" value={businessname} onChange={(e) => setBusinessName(e.target.value)} />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="button" onClick={(e) => handleBusiness(e)}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {
                        business.map((item) =>
                            <Row className="mt-2">
                                <Col sm={12}>
                                    <ListGroup>
                                        <ListGroup.Item action variant="info" as={Link} to={`/BusinessPage/${item.business_id}`}>
                                        {item.business_name}
                                        </ListGroup.Item>
                                    </ListGroup>
                                   </Col>
                            </Row>
                        )}
                </Container>
            </Container>
        </React.Fragment>
    )
}
export default Business;