import React from 'react'
import { Navbar, Container, Row, Col  } from 'react-bootstrap'
import {
    Link
  } from "react-router-dom";



const Header = () => {
    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container fluid={false}>
            <Row>
            <Col md={12}>
            <Navbar.Brand>
                <Link to="/">GitHub Manager</Link>
                </Navbar.Brand>
            </Col>
            </Row>
            </Container>
        </Navbar>
        </>
    )
}

export default Header
