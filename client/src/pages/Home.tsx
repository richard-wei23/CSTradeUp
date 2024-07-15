import React from "react";
import { Container } from "react-bootstrap";

const Home = (): React.JSX.Element => {
    return <>
        <Container fluid>
            <img
                alt=""
                src="../../public/logo.svg"
                width="200"
                height="200"
                className="d-inline-block align-top" />
            <h2>Home</h2>
            <p>Welcome to the Home page!</p>
        </Container>
    </>;
}

export default Home;