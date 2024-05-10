import React, { useState } from "react";
import { Container, Col, Form, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Web() {

    const [number, setNumber] = useState(0);

    function Decrement() {
        setNumber(number - 1);
    }

    function Increment() {
        setNumber(number + 1);
    }
    
    if(number === 100){
        window.open("https://www.youtube.com/","_blank");
    }
    
    return (
        <React.Fragment>
            <Container fluid>
                <Container className="">
                    <Form.Group className="mb-3" style={{ width: "30%" }} >
                        <div className="d-flex align-items-center flex-column">
                            <Row className="mt-3 ">Increment/Decrement</Row>
                            <Row className="mt-3 ">
                                <Col className="d-flex">
                                    <Button variant="danger" onClick={Decrement} disabled={number === 0}>-</Button>
                                    <Form.Control type='number' value={number} disabled />
                                    <Button variant="success" onClick={Increment} disabled={number === 101}>+</Button>
                                </Col>
                            </Row>
                        </div>
                    </Form.Group>
                </Container>
            </Container>


        </React.Fragment>
    )
}
export default Web;