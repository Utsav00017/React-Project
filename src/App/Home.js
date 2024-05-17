import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import App from "../App";


function Home() {

    const navigate = useNavigate("");

    function handlepage() {
        navigate("/App");
    }

    return (
        <React.Fragment>
            <h1>Welcome To Home Page</h1>
            <div className="d-flex justify-content-center">
                <Button className="mx-auto" onClick={handlepage}>GET Student Details</Button>
            </div>
        </React.Fragment>
    )
}
export default Home;