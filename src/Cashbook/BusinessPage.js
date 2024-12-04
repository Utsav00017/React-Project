import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Modal, ListGroup, Table, Form } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

// import exportPDF from "jspdf";

import { useParams } from "react-router";
import "../App.css";

function BusinessPage() {

  const { id } = useParams();
  const [business, setBusiness] = useState({});

  // Category
  const [showcategory, setShowcategoty] = useState(false);

  const handleCloseCategory = () => setShowcategoty(false);
  const handleShowCategory = () => setShowcategoty(true);

  // ADD Category
  const [businesscategory, setBusinesscategory] = useState("");
  const [categoryType, setCategoryType] = useState("");

  // CashIn
  const [showCashIn, setShowCashIn] = useState(false);

  function handleCloseCashIn() {
    setShowCashIn(false);
    setDate("");
    setAmount("");
    setRemark("");
    setCategories([]);
    setSelectedCategory("Select");
  }

  const [category_type, setCategory_Type] = useState("")
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Select");
  const [categories, setCategories] = useState([]);

  // CashOut
  const [showCashOut, setShowCashOut] = useState(false);
  const handleCloseCashOut = () => setShowCashOut(false);

  // History
  const [history, setHistory] = useState([]);
  const [totalIn, setTotalIn] = useState("");
  const [totalOut, setTotalOut] = useState("");

  //Update History
  const [transactionid, setTransactionid] = useState("");
  const [currentmode, setCurrentmode] = useState("Submit");

  //filter by cash in out
  const [inouthistory, setInOutHistory] = useState("select");

  //filter by business category
  const [businesscat, setBusinesscat] = useState("Select");

  //filter by date
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");



  useEffect(() => {
    fetchBusiness();
    // History();
  }, [id]);

  useEffect(() => {
    filterTransaction();
  }, [inouthistory, businesscat, startdate, enddate])

  const fetchBusiness = async () => {
    debugger
    try {
      var res = await axios.get(`http://localhost:1000/GetSingleBusiness/${id}`);
      setBusiness(res.data[0]);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  function handleBusinessCategory(e) {
    setShowcategoty(false);
    if (businesscategory == "" || categoryType == "") {
      alert("Enter Valid Value");
      e.preventDefault();
    } else {
      console.log(businesscategory);
      AddBusinessCategory();
    }
    setBusinesscategory("");
    setCategoryType("");
  }

  const AddBusinessCategory = async () => {
    debugger
    var categorydata = {
      business_id: id,
      business_category: businesscategory,
      category_type: categoryType
    }
    try {
      var res = await axios.post("http://localhost:1000/Addbusinesscategory/", categorydata);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(id);

  // Cash in 
  // const handleShowCashIn = () => setShowCashIn(true);

  const handleShowCashIn = async () => {
    setShowCashIn(true);
    CashIn();
  }

  const CashIn = async () => {
    try {
      var res = await axios.get("http://localhost:1000/getCategories/" + id);
      // console.log(res.data);
      const filteredData = res.data.filter(item => item.category_type === "Cash In");
      setCategory_Type(filteredData[0].category_type);
      setCategories(filteredData);

    } catch (error) {
      console.log(error)
    }
  }

  const handleCashIn = async (e) => {
    debugger
    setShowCashIn(false);
    var TransactionData = {
      category_id: selectedCategory,
      date: date,
      amount: amount,
      remark: remark,
      category_type: category_type
    };

    if (date == "" || amount == "" || remark == "" || selectedCategory == "Select") {
      e.preventDefault();
      alert("Please Fill Detailss !!")
    } else if (currentmode === "Submit") {
      try {
        var res = await axios.post("http://localhost:1000/ManageTransaction", TransactionData)
        // await Calculation();
        // await History();
        setDate("");
        setAmount("");
        setRemark("");
        setCategories([]);
        setSelectedCategory("Select");
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        var res = await axios.put("http://localhost:1000/UpdateTransaction/" + transactionid, TransactionData)
        // await Calculation();
        // await History();
        setDate("");
        setAmount("");
        setRemark("");
        setCategories([]);
        setSelectedCategory("Select");
        setTransactionid("");
        setCurrentmode("Submit");
      } catch (error) {
        console.log(error)
      }
    }
  }



  // Cash Out 

  // const handleShowCashOut = () => setShowCashOut(true);

  const handleShowCashOut = async () => {
    setShowCashOut(true);
    CashOut();
  }

  const CashOut = async () => {
    debugger
    try {
      var res = await axios.get("http://localhost:1000/getCategories/" + id);
      // console.log(res.data);
      const filteredData = res.data.filter(item => item.category_type === "Cash Out");
      setCategory_Type(filteredData[0].category_type);
      setCategories(filteredData);

    } catch (error) {
      console.log(error)
    }
  }

  const handleCashOut = async (e) => {
    debugger
    setShowCashOut(false);
    var TransactionData = {
      category_id: selectedCategory,
      date: date,
      amount: `-${amount}`,
      remark: remark,
      category_type: category_type
    }

    if (date == "" || amount == "" || remark == "" || selectedCategory == "Select") {
      e.preventDefault();
      alert("Please Fill Detailss !!")
    } else if (currentmode === "Submit") {
      try {
        var res = await axios.post("http://localhost:1000/ManageTransaction", TransactionData);
        // await Calculation();
        // await History();
        setDate("");
        setAmount("");
        setRemark("");
        setCategories([]);
        setSelectedCategory("Select");
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        var res = await axios.put("http://localhost:1000/UpdateTransaction/" + transactionid, TransactionData)
        // await Calculation();
        // await History();
        setDate("");
        setAmount("");
        setRemark("");
        setCategories([]);
        setSelectedCategory("Select");
        setTransactionid("");
        setCurrentmode("Submit");
      } catch (error) {
        console.log(error)
      }
    }
  }


  // calculation based on cashin/cashout

  // const Calculation = async () => {
  //   debugger
  //   // alert(TransactionData.category_id);
  //   // var Balance = TransactionData.amount;
  //   // var Type = TransactionData.category_type;
  //   let total;
  //   if (category_type === "Cash In") {
  //     total = parseInt(business.balance) + parseInt(amount);
  //     var Total = {
  //       total: total
  //     }
  //   } else {
  //     total = parseInt(business.balance) - parseInt(amount);
  //     var Total = {
  //       total: total
  //     }
  //   }
  //   try {
  //     var res = await axios.put("http://localhost:1000/handlebalance/" + id, Total);
  //     // when you pass a req.body.xyz if value is 1 then also create a object for one value
  //     fetchBusiness();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const totalBalance = history.reduce((acc, alltransaction) => acc + parseInt(alltransaction.transaction_amount), 0);
  const totalIncome = history
    .filter(alltransaction => parseInt(alltransaction.transaction_amount) > 0)
    .reduce((acc, alltransaction) => acc + parseInt(alltransaction.transaction_amount), 0);
  const totalExpenses = history
    .filter(alltransaction => parseInt(alltransaction.transaction_amount) < 0)
    .reduce((acc, alltransaction) => acc + parseInt(alltransaction.transaction_amount), 0) * (-1);

  // Get Transaction History

  // const History = async () => {
  //   try {
  //     var res = await axios.get("http://localhost:1000/Transactionhistory/" + id);

  //     // Total In
  //     // var totalInamt = 0;
  //     // var CashIn = res.data.filter((item)=>item.category_type === "Cash In");
  //     // var totalin = CashIn.forEach(element => {
  //     //   debugger
  //     //   totalInamt += parseInt(element.transaction_amount)
  //     // });

  //     //Total Out
  //     // var totalOutamt = 0;
  //     // var CashOut = res.data.filter((item)=>item.category_type === "Cash Out");

  //     // CashOut.forEach(item=>{
  //     //   item.transaction_amount = item.transaction_amount.replace('-','');
  //     //   totalOutamt += parseInt(item.transaction_amount);
  //     // })

  //     // setTotalIn(totalInamt);
  //     // setTotalOut(-totalOutamt);
  //     setHistory(res.data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // // Edit History

  const handleEdit = async (item) => {
    debugger
    var T_id = item.transaction_id;
    try {
      var res = await axios.get("http://localhost:1000/GetsingleTransaction/" + T_id);
      console.log(res.data);
      setTransactionid(item.transaction_id);
      setDate(res.data[0].date);
      setAmount(res.data[0].transaction_amount.replace('-', ''));
      setRemark(res.data[0].transaction_remark);
      setSelectedCategory(res.data[0].category_id);
    } catch (error) {
      console.log(error);
    }
    setCurrentmode("Edit");

    if (item.category_type === "Cash In") {
      handleShowCashIn();
    } else {
      handleShowCashOut();
    }

  }

  // Filter By Cash In / Out

  const filterTransaction = async () => {
    debugger
    var data = {
      id: id,
      type: inouthistory,
      businesscat: businesscat,
      startdate: startdate,
      enddate: enddate
    }

    try {
      var res = await axios.post("http://localhost:1000/filterTransaction/", data);
      console.log(res.data);
      setHistory(res.data[0]);
    } catch (error) {
      console.log(error)
    }
  }

  function handlehistoryByInOut(e) {
    setInOutHistory(e.target.value);
    setBusinesscat("Select");
    if (e.target.value === "Cash In") {
      CashIn();
    } else {
      CashOut();
    }

  }

  // //filter by businesscategory
  function handlebusinesscat(e) {
    setBusinesscat(e.target.value);
  }

  // Filter By Date
  function handleStartDate(e) {
    setStartdate(e.target.value);
  }

  function handleEndDate(e) {
    if (e.target.value < startdate) {
      alert("End Date Is Not Higer Then Start Date")
    } else {
      setEnddate(e.target.value);
    }
  }


  // const Filterdate = async()=>{
  //   debugger
  //   var Date = {
  //     startdate:startdate,
  //     enddate:enddate
  //   }
  //   try{
  //     var res = await axios.get("http://localhost:1000/filterTransactionDate/",Date);
  //     console.log(res.data);
  //     // setHistory(res.data);
  //   }catch(error){
  //     console.log(error)
  //   }
  // }

  function exportPDF(){
    debugger
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Awesome Report";
    const headers = [["Transaction Id", "Transaction Date", "Business Category", "Transaction Remark", "Category Type", "Transaction Amount"]];

    const data = history.map(elt => [elt.transaction_id, elt.transaction_date,elt.business_category,elt.transaction_remark,elt.category_type,elt.transaction_amount]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }

  const[mail,setMail]= useState("");

  function handleemail(e){
    debugger
    setMail(e.target.value);
  }
  const SendMail = async()=>{
    debugger
    var usermail = {
      mail:mail
    }
    try{
      var res = await axios.post("http://localhost:1000/Mail/",usermail);
      setMail("");
      
    }catch(error){
      console.log(error)
    }
  }
  return (

    <React.Fragment>
      <Container fluid>
        <Container>
          <Row >
            <Col className="mx-auto mb-4 mt-4 header" md="auto" ><h1 className="fw-lighter">Business Dashboard</h1></Col>
          </Row>

          <Row className="mt-3 d-flex align-items-center border">
            <Col sm={6} className="d-flex">
              <h2 className="mx-auto fw-fw-light">Business :</h2>
            </Col>
            <Col sm={3}>
              <h3 className="fw-lighter">{business.business_name}</h3>
            </Col>
          </Row>
          <Row className="mt-3 d-flex align-items-center border">
            <Col sm={8} className="d-flex">
              <h2 className="mx-auto fw-lighter">List Of {business.business_name} Category</h2>
            </Col>
            <Col sm={4}>
              <Button variant="primary" onClick={handleShowCategory}>Add Category</Button>
            </Col>
          </Row>
          <Row>
            <Table bordered striped cellPadding={5} cellSpacing={5} className="mt-4">
              <tr>
                <th>Net Balance</th>
                <th>Total In</th>
                <th>Total Out</th>
              </tr>
              <tr>
                <td>{parseInt(totalBalance).toLocaleString('en-US')}</td>
                <td>{parseInt(totalIncome).toLocaleString('en-US')}</td>
                <td>{parseInt(totalExpenses).toLocaleString('en-US')}</td>
              </tr>
            </Table>
          </Row>


          <Row >
            <Col sm={3} className="mx-auto" >

              <Button variant="primary" onClick={handleShowCashIn}>Cash In</Button>
            </Col>
            <Col sm={3} className="mx-auto">

              <Button variant="primary" onClick={handleShowCashOut}>Cash Out</Button>
            </Col>
          </Row>
          <Row className="mt-4 mb-4">
            <Col >
              <Form.Label><h5>Start Date :</h5></Form.Label>
              <Form.Control type="date" placeholder="Enter Date" value={startdate} onChange={(e) => handleStartDate(e)} />
            </Col>
            <Col>
              <Form.Label><h5>End Date :</h5></Form.Label>
              <Form.Control type="date" placeholder="Enter Date" value={enddate} onChange={(e) => handleEndDate(e)} />
            </Col>
            <Col>
              <Form.Label><h5>Category Type :</h5></Form.Label>
              <Form.Select onChange={(e) => handlehistoryByInOut(e)} value={inouthistory}>
                <option value="Select">Select Category</option>
                <option value="Cash In">Cash In</option>
                <option value="Cash Out">Cash Out</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label><h5>Business :</h5></Form.Label>
              <Form.Select onChange={(e) => handlebusinesscat(e)} value={businesscat}>
                <option value="Select">Select Category</option>
                {categories.map((item) =>
                  <option value={item.category_id}>{item.business_category}</option>

                )}
              </Form.Select>
            </Col>
           
          </Row>
          <Row>
          <Col sm={6}>
            <Form.Label><h5>Send Mail</h5></Form.Label><br></br>
            <Form.Control type="email" onChange={(e)=>handleemail(e)} value={mail}/>

              <Button onClick={SendMail}>Generate Report</Button>
              <Button onClick={SendMail}>Generate</Button>

            </Col>
                  <Col sm={6}>
            <Form.Label><h5>Export Pdf</h5></Form.Label><br></br>
              <Button onClick={exportPDF}>Generate Report</Button>
                  </Col>
          </Row>
          <Table striped bordered hover variant='light' className='mt-3' style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Transaction Id</th>
                <th>Transaction Date</th>
                <th>Business Category</th>
                <th>Transaction Remark</th>
                <th>Category Type</th>
                <th>Transaction Amount</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {
                history.length === 0 ?
                  <tr>
                    <td colSpan={7} className="text-center"><h3>Record Not Found !!</h3></td>
                  </tr>
                  :
                  history.map((item) =>
                    <tr>
                      <td>{item.transaction_id}</td>
                      <td>{item.transaction_date}</td>
                      <td>{item.business_category}</td>
                      <td>{item.transaction_remark}</td>
                      <td>{item.category_type}</td>
                      <td>{item.category_type === "Cash In"
                        ? parseInt(item.transaction_amount).toLocaleString('en-US') :
                        `${parseInt(item.transaction_amount).toLocaleString('en-Us')}`}
                      </td>
                      <td><Button onClick={() => handleEdit(item)}>Edit</Button></td>
                    </tr>
                  )
              }
            </tbody>
          </Table>

          {/* Add Category  */}
          <Modal show={showcategory} onHide={handleCloseCategory}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Row className="mb-3">
                    <Col sm={4}>
                      <Form.Label>Type :</Form.Label>

                    </Col>
                    <Col className="d-flex justify-content-around">
                      <Form.Check
                        type="radio"
                        label="Cash In"
                        name="Type"
                        value={categoryType}
                        checked={categoryType === "Cash In"}
                        onChange={(e) => setCategoryType("Cash In")}
                      />
                      <Form.Check
                        type="radio"
                        label="Cash Out"
                        name="Type"
                        value={categoryType}
                        checked={categoryType === "Cash Out"}
                        onChange={(e) => setCategoryType("Cash Out")}
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Row className="d-flex align-items-center">
                    <Col sm={4}>
                      <Form.Label>Business Category</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control type="text" placeholder="Enter Business Category" value={businesscategory} onChange={(e) => setBusinesscategory(e.target.value)} />
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCategory}>
                Close
              </Button>
              <Button variant="primary" type="button" onClick={(e) => handleBusinessCategory(e)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Cash In */}

          <Modal show={showCashIn} onHide={handleCloseCashIn} backdrop="static" keyboard={false}>
            <Modal.Header>
              <Modal.Title><h3>{category_type}</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Row className="d-flex align-items-center">
                    <Col sm={4}>
                      <Form.Label>Date :</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control type="date" placeholder="Enter Date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Row className="d-flex align-items-center">
                    <Col sm={4}>
                      <Form.Label>Amount :</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Row className="d-flex align-items-center">
                    <Col sm={4}>
                      <Form.Label>Remark :</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control type="text" placeholder="Enter Remark" value={remark} onChange={(e) => setRemark(e.target.value)} />
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
              <Form.Group className="mb-3">
                <Row>
                  <Col sm={4}>
                    <Form.Label>Category :</Form.Label>
                  </Col>
                  <Col>
                    <Form.Select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                      <option value="Select">Select Category</option>
                      {categories.map((item) =>
                        <option value={item.category_id}>{item.business_category}</option>

                      )}
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCashIn}>
                Close
              </Button>
              <Button variant="primary" type="button" onClick={(e) => handleCashIn(e)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* CashOut  */}

          <Modal show={showCashOut} onHide={handleCloseCashOut}>
            <Modal.Header>
              <Modal.Title><h3>{category_type}</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Row className="d-flex align-items-center">
                    <Col sm={4}>
                      <Form.Label>Date :</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control type="date" placeholder="Enter Date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Row className="d-flex align-items-center">
                    <Col sm={4}>
                      <Form.Label>Amount :</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Row className="d-flex align-items-center">
                    <Col sm={4}>
                      <Form.Label>Remark :</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control type="text" placeholder="Enter Remark" value={remark} onChange={(e) => setRemark(e.target.value)} />
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
              <Form.Group className="mb-3">
                <Row>
                  <Col sm={4}>
                    <Form.Label>Category :</Form.Label>
                  </Col>
                  <Col>
                    <Form.Select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                      <option value="Select">Select Category</option>
                      {categories.map((item) =>
                        <option value={item.category_id}>{item.business_category}</option>

                      )}
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCashOut}>
                Close
              </Button>
              <Button variant="primary" type="button" onClick={(e) => handleCashOut(e)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>


        </Container>
      </Container>
    </React.Fragment>
  )
}
export default BusinessPage;