import React from 'react';

import { Button, Container, Row, Col, Navbar, Nav, NavLink, Offcanvas, NavDropdown, Form, FormControl } from 'react-bootstrap'

import logo from './logo.svg'

function Navig() {
  return (
    <Navbar bg="light" expand={false}>
      <Container fluid >
        {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> */}
        {/* <Navbar.Toggle aria-controls="offcanvasNavbar" /> */}
        {/* <Nav className="justify-content-end flex-grow-1 pe-3"> */}
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="#action2">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
          <Nav.Link eventKey="imaged">
            <Navbar.Brand href="#">
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '} Questions
            </Navbar.Brand>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navig;
