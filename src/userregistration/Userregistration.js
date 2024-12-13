import React, { useEffect, useState } from "react";
import { Container, Col, Form, Row, Button, Table, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
// import './App.css';



function UserRegistration() {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [isactive, setIsActive] = useState(false);

    const [userdetail, setUserDetail] = useState([]);
    const [status, setStatus] = useState();
    const [disabled, setDisabled] = useState(true);

    //email 
    // const [mail, setMail] = useState("");
    const [otp, setOtp] = useState();
    const [enterotp, setEnterOtp] = useState();

    //email modal
    const [handlemailmodal, setHandlemailmodal] = useState(false);
    const [resendmsg, setResendmsg] = useState("")

    // get userdetails
    useEffect(() => {
        getUser();
    })

    useEffect(() => {
        if (fname && gender && email && username && password && cpassword) {
            setDisabled(false); // Enable the button
        } else {
            setDisabled(true); // Disable the button
        }
    }, [fname, lname, gender, email, contact, username, password, cpassword, isactive]);


    const getUser = async () => {
        try {
            var res = await axios.get("https://backend-live-n3o5qgqev-utsavs-projects-838eb43f.vercel.app/userdetail");
            setUserDetail(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // handle username 
    const handleUsername = async () => {
        // debugger
        try {
            var res = await axios.get("https://backend-live-n3o5qgqev-utsavs-projects-838eb43f.vercel.app/userdetail/" + username);
            debugger
            if (res.data.length === 0) {

            } else {
                alert("Username already exist");
                setUsername("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // isactive
    function handleIsActive(e) {
        // debugger
        setIsActive(e.target.checked ? 1 : 0);
    }

    // submit

    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    const handlesubmit = async (e) => {

        setResendmsg("");

        if (!fname || !gender || !email || !username || !password || !cpassword) {
            console.log("please fill data")
            e.preventDefault();
        } else if (!regex.test(email)) {
            alert("Mail Must in this format example@gmail.com");
            e.preventDefault();
        } else if (password !== cpassword) {
            alert("Password and confirm password do not match");
            e.preventDefault();

        } else {
            var userObj = {
                fname: fname,
                lname: lname,
                gender: gender,
                email: email,
                contact: contact,
                username: username,
                password: password,
                isactive: isactive
            }

            // If sending multiple records:
            var usersArray = [userObj];

            try {
                // debugger
                let dataToSend = Array.isArray(userObj) ? usersArray : [userObj]; // Wrap single user in an array if needed
                var res = await axios.post("https://backend-live-n3o5qgqev-utsavs-projects-838eb43f.vercel.app/userdetail", dataToSend);
                // debugger
                console.log(res.data);
                if (res.data.message == "data saved successfully") {
                    setFname("");
                    setLname("");
                    setGender("");
                    setEmail("");
                    setContact("");
                    setUsername("");
                    setPassword("");
                    setCpassword("");
                    setIsActive(false);
                }
                // getUser();
            } catch (error) {
                console.log(error);
            }
        }
    }

    // handle Mail

    const sendmail = async (e) => {

        if (!fname || !gender || !email || !username || !password || !cpassword) {
            console.log("please fill data")
            e.preventDefault();
        } else if (!regex.test(email)) {
            alert("Mail Must in this format example@gmail.com");
            e.preventDefault();
        } else if (password !== cpassword) {
            alert("Password and confirm password do not match");
            e.preventDefault();
        } else {
            e.preventDefault();
            setHandlemailmodal(true);

            let Num = Math.floor(100000 + Math.random() * 900000);
            setOtp(Num);
            console.log(Num);

            var usermail = {
                mail: email,
                otp: Num
            }
            try {
                var res = await axios.post("https://backend-live-n3o5qgqev-utsavs-projects-838eb43f.vercel.app/Mail/", usermail);
                // setMail("");

                // if (type === "reset") {
                //     setResendmsg(`Otp Resend Successfully on ${email} .`)
                // }

            } catch (error) {
                console.log(error)
            }

        }


    }

    const mailmodal = () => {
        if (parseInt(otp) === parseInt(enterotp)) {
            handlesubmit();
            setHandlemailmodal(false);
            setFname("");
            setLname("");
            setGender("");
            setEmail("");
            setContact("");
            setUsername("");
            setPassword("");
            setCpassword("");
            setIsActive(false);
        } else {
            alert("Please enter Correct Otp !");
            setHandlemailmodal(true);
        }
    }
    // handle mail modal

    const handleCloseEmail = () => {
        setHandlemailmodal(false);
    }


    // handlestatus update

    const handlestatus = async (userId, status) => {
        try {
            var res = await axios.put("https://backend-live-n3o5qgqev-utsavs-projects-838eb43f.vercel.app/userdetail/" + userId + "/" + status);
            // debugger
            getUser();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <React.Fragment>
            <Container fluid>
                <Container>
                    <Form style={{ width: "60%" }} onSubmit={(e) => sendmail(e)}>
                        <Form.Group className="mb-3">
                            <Row className="mt-3 align-items-center">
                                <Col sm={3}>First Name <span>*</span>:</Col>
                                <Col>
                                    <Form.Control type='text' required value={fname} placeholder="Enter Your Name" onChange={(e) => setFname(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row className="mt-3 align-items-center">
                                <Col sm={3}>Last Name :</Col>
                                <Col>
                                    <Form.Control type='text' value={lname} placeholder="Enter Your Last Name" onChange={(e) => setLname(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row className="mt-3 align-items-center">
                                <Col sm={3}>Select Gender <span>*</span>:</Col>
                                <Col>
                                    <Form.Check
                                        inline
                                        required
                                        label="Male"
                                        name="gender"
                                        type="radio"
                                        checked={gender === "Male"}
                                        onChange={(e) => setGender("Male")}
                                    />
                                    <Form.Check
                                        inline
                                        required
                                        label="Female"
                                        name="gender"
                                        type="radio"
                                        checked={gender === "Female"}
                                        onChange={(e) => setGender("Female")}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row className="mt-3 align-items-center">
                                <Col sm={3}>E-mail <span>*</span>:</Col>
                                <Col>
                                    <Form.Control type='email' required value={email} placeholder="Enter Your E-mail" onChange={(e) => setEmail(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row className="mt-3 align-items-center">
                                <Col sm={3}>Contact :</Col>
                                <Col>
                                    <Form.Control type='number' value={contact} placeholder="Enter Your Contact" onChange={(e) => setContact(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row className="mt-3 align-items-center">
                                <Col sm={3}>Username <span>*</span>:</Col>
                                <Col>
                                    <Form.Control type='text' required placeholder="Enter Your Username" value={username} onChange={(e) => setUsername(e.target.value)} onBlur={() => handleUsername()} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row className="mt-3 align-items-center">
                                <Col sm={3}>Password <span>*</span>:</Col>
                                <Col>
                                    <Form.Control type='password' required placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row className="mt-3 align-items-center">
                                <Col sm={3}>Confirm Password <span>*</span>:</Col>
                                <Col>
                                    <Form.Control type='password' required placeholder="Enter Confirm Password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row className="mt-3 align-items-center">
                                <Col sm={3}>isActive :</Col>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        checked={isactive}
                                        onChange={handleIsActive}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Button type="submit" disabled={disabled}>Submit</Button>
                    </Form>
                </Container>
            </Container>
            <Container className="mt-4">
                <Table striped bordered hover variant='light' className='mt-3' style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>E-mail</th>
                            <th>Contact</th>
                            <th>Username</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            userdetail ? 

                            userdetail.map(item => (
                                <tr key={item.user_id}>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.email}</td>
                                    <td>{item.contact}</td>
                                    <td>{item.username}</td>
                                    <td><span className={item.isactive === "1" ? "green" : "red"}></span></td>
                                    <td><Button variant={item.isactive === "1" ? "danger" : "success"} onClick={() => handlestatus(item.user_id, item.isactive)}>{item.isactive === "1" ? "Disable" : "Enable"}</Button></td>
                                </tr>
                            ))

                            :
                            ''

                        }
                        {/* {userdetail.map(item => (
                            <tr key={item.user_id}>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.gender}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                                <td>{item.username}</td>
                                <td><span className={item.isactive === "1" ? "green" : "red"}></span></td>
                                <td><Button variant={item.isactive === "1" ? "danger" : "success"} onClick={() => handlestatus(item.user_id, item.isactive)}>{item.isactive === "1" ? "Disable" : "Enable"}</Button></td>
                            </tr>
                        ))} */}
                    </tbody>
                </Table>
            </Container>

            <Modal show={handlemailmodal} onHide={handleCloseEmail} backdrop="static" keyboard={false}>
                <Modal.Header className="d-flex align-items-center" closeButton>
                    <Modal.Title><h3>Enter OTP</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Row className="d-flex align-items-center">
                                <Col>
                                    <Form.Label>
                                        <p>
                                            {
                                                resendmsg == "" ? `Otp send Successfully on ${email} .` : resendmsg
                                            }
                                        </p>
                                    </Form.Label>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row className="d-flex align-items-center">
                                <Col>
                                    <Form.Label>Enter Otp :</Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Control type="text" placeholder="Enter Otp" onChange={(e) => setEnterOtp(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleCloseEmail}>
                        Change mail
                    </Button>
                    {/* <Button variant="secondary" onClick={(e) => sendmail(e, "resend")}>
                        Re send Mail
                    </Button> */}
                    <Button variant="primary" type="button" onClick={mailmodal}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    )
}
export default UserRegistration;