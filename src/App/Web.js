import React, { useEffect, useState } from "react";
import { Container, Col, Form, Row, Button, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import toast from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

function Web() {

    const [studentList, setStudentList] = useState([]);
    const [name, setName] = useState('');
    const [college, setCollege] = useState('');
    const [standerd, setStaderd] = useState('');
    const [gender, setGender] = useState('');
    const [skills, setSkills] = useState([]);
    const [selectedcheck, setSelectedcheck] = useState([]);

    //update
    // const location = useLocation();
    const [currentmode, setCurrentmode] = useState('add');
    const [submitbtn, setSubmitbtn] = useState('Submit');
    // const [submitbtn,setSubmitBtn] = ("Submit");
    const [studentid, setStudentId] = useState('');

    function handleSkills(e) {
        debugger
        if (e.target.checked) {
            setSkills([...skills, e.target.value])
        } else {
            setSkills(skills.filter((item) => item !== e.target.value));
        }
    }

    function handelCheckbox(e) {
        debugger
        if (e.target.checked) {
            debugger
            setSelectedcheck([...selectedcheck, parseInt(e.target.value)])
        } else {
            setSelectedcheck(selectedcheck.filter((item) => item !== parseInt(e.target.value)));
        }
    }

    useEffect(() => {
        fetchAllStudents();
    }, [])

    const fetchAllStudents = async () => {
        debugger
        try {
            const res = await axios.get("https://backend-live-alpha.vercel.app/studentdetails");
            console.log(res);
            setStudentList(res.data)
        } catch (error) {
            console.log(error);
        }
    };


    const handlesubmit = async (e) => {
        debugger

        if(name == "" ||college == "" || standerd == "" || gender == "" || skills == ""){
            e.preventDefault();
            alert("Please Fill Details")
        }else{
            var students_detail = {
                student_name: name,
                college: college,
                standerd: standerd,
                gender: gender,
                skills: skills.join(',')
            }
    
    
            //update put
    
            if (currentmode == "edit") {
                // debugger
                try {
                    var res = await axios.put("https://backend-live-alpha.vercel.app/editstudentdetails/" + studentid, students_detail);
                    // toast.success(res.data.message);
                    setCurrentmode("add");
                    setSubmitbtn("Submit");
                    setStudentId("");
                    setName("");
                    setCollege("");
                    setStaderd("");
                    setGender("");
                    setSkills("");
                    await fetchAllStudents();
                    // setSubmitBtn("Submit");
                } catch (error) {
                    console.log(error.message);
                };
    
            } else {
                try {
                    debugger
                    var res = await axios.post("https://backend-live-alpha.vercel.app/poststudentdetails", students_detail);
                    console.log(res);
                    await fetchAllStudents();
                    setName("");
                    setCollege("");
                    setStaderd("");
                    setGender("");
                    setSkills("");
                    // toast.success(res.data.message);
                    // window.location.reload();
                } catch (error) {
                    console.log(error);
                };
            }
        }

        
    }

    function handleUpdate(sid) {
        // debugger
        setCurrentmode("edit");
        setSubmitbtn("Update");

        const fetchStudent = async () => {
            debugger
            try {
                const res = await axios.get("https://backend-live-alpha.vercel.app/singlestudentdetails/" + sid);
                console.log(res);
                setStudentId(res.data[0].studentid);
                setName(res.data[0].student_name);
                setCollege(res.data[0].college);;
                setStaderd(res.data[0].standerd);
                setGender(res.data[0].gender);
                setSkills(res.data[0].skills.split(','));
            } catch (error) {
                console.log(error)
            }
        }
        fetchStudent();
    }

    // Delete

    const handleDelete = async (sid) => {
        // debugger
        try {
            const res = await axios.delete("https://backend-live-alpha.vercel.app/deletestudentdetails/" + sid);
            // window.location.reload();
            // toast.warning(res.data.message);
            fetchAllStudents();
        } catch (err) {
            console.log(err);
        }
    }

    // Delete Checkbox

    const handleCheckDelete = async () => {

        // var StudentList = selectedcheck.toString();
        const sids = { ids: selectedcheck.toString() }


        try {
            const res = await axios.post("https://backend-live-alpha.vercel.app/studentdelete/", sids);
            debugger
            setSelectedcheck([]);
            fetchAllStudents();
        } catch (error) {
            console.log(error);
        }
    }


    //  View

    const handleView = async (sid) => {

        try {
            const res = await axios.get("https://backend-live-alpha.vercel.app/singlestudentdetails/" + sid);
            alert("Student Name :" + res.data[0].student_name +
                "Student college :" + res.data[0].college +
                "Student standerd :" + res.data[0].standerd +
                "Student gender :" + res.data[0].gender +
                "Student skills :" + res.data[0].skills
            )
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <Container fluid>
                <Container className="">

                    <Form className="form mt-3">
                        <Form.Group className="mb-3">
                    <Row>
                        <Col sm={2}>
                            <Form.Label>Student id</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="number" placeholder="Enter id"  value={studentid} disabled/>
                        </Col>
                    </Row>
                </Form.Group>
                        <Form.Group className="mb-3">
                            <Row>
                                <Col sm={2}>
                                    <Form.Label>Student Name</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="text" placeholder="Enter Name" value={name}  onChange={(e) => setName(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row>
                                <Col sm={2}>
                                    <Form.Label>College Name</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="text" placeholder="Enter College" value={college}  onChange={(e) => setCollege(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row>
                                <Col sm={2}>
                                    <Form.Label>Standard</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Select value={standerd} onChange={(e) => setStaderd(e.target.value)}>
                                        <option value="">Select Standard</option>
                                        <option value="BCA">BCA</option>
                                        <option value="BCOM">BCOM</option>
                                        <option value="BBA">BBA</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row>
                                <Col sm={2}>
                                    <Form.Label>Gender</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Check
                                        inline
                                        label="Male"
                                        name="gender"
                                        type="radio"
                                        checked={gender === "Male"}
                                        onChange={(e) => setGender("Male")}
                                    />
                                    <Form.Check
                                        inline
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
                            <Row>
                                <Col sm={2}>
                                    <Form.Label>Skills</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Check
                                        inline
                                        type="checkbox"
                                        label="Html"
                                        value="Html"
                                        checked={skills.includes("Html")}
                                        onChange={handleSkills}
                                    />
                                    <Form.Check
                                        inline
                                        type="checkbox"
                                        label="Css"
                                        value="Css"
                                        checked={skills.includes("Css")}
                                        onChange={handleSkills}
                                    />
                                    <Form.Check
                                        inline
                                        type="checkbox"
                                        label="Bootstrap"
                                        value="Bootstrap"
                                        checked={skills.includes("Bootstrap")}
                                        onChange={handleSkills}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Row>
                            <Col sm={3}>
                                <Button type="button" onClick={(e) => handlesubmit(e)}>{submitbtn}</Button>
                            </Col>
                            <Col sm={3}>
                                <Button variant="danger" onClick={handleCheckDelete}>Delete</Button>
                            </Col>
                        </Row>
                    </Form><br /><br /><br />

                    <Table striped bordered hover variant='light' className='mt-3' style={{ width: '100%' }}>
                        <thead>

                            <tr>
                                <th>Select</th>
                                <th>Student_id</th>
                                <th>Student_Name</th>
                                <th>College</th>
                                <th>standerd</th>
                                <th>Gender</th>
                                <th>Skills</th>
                                <th>Update / Delete / View</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                studentList.map((item) =>
                                    <tr>
                                        <td><input type="checkbox" value={item.studentid} onChange={handelCheckbox} checked={selectedcheck.includes(item.studentid)} /></td>
                                        <td>{item.studentid}</td>
                                        <td>{item.student_name}</td>
                                        <td>{item.college}</td>
                                        <td>{item.standerd}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.skills}</td>
                                        <td style={{ justifyContent: 'space-evenly', display: 'flex' }}>
                                            <Button variant="success" onClick={() => handleUpdate(item.studentid)}>Edit</Button>
                                            <Button variant="danger" onClick={() => handleDelete(item.studentid)}>Delete</Button>
                                            <Button variant="info" onClick={() => handleView(item.studentid)}>View</Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>                </Container>
            </Container>


        </React.Fragment>
    )
}
export default Web;