import * as React from "react";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { IAppState } from "./store/Store";

import { Button, Container, Row, Col, Navbar, Nav, NavLink, Offcanvas, NavDropdown, Form, FormControl } from 'react-bootstrap'

import logo from './logo.svg'

interface IProps {
  isAuthenticated: boolean | null;
  uuid: string | null;
  signOut: () => void
}

function Navig({ isAuthenticated, uuid, signOut }: IProps) {

  let navigate = useNavigate();

  const otkaciMe = () => {
    signOut();
    navigate('/landing');
  }

  {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> 
           <Navbar.Toggle aria-controls="offcanvasNavbar" /> 
         <Nav className="justify-content-end flex-grow-1 pe-3"> */}

         /// defaultActiveKey="/questions"
  return (
    <Navbar bg="light" expand={false}>

      <Container fluid >
        {isAuthenticated ? (
          <Nav  className="flex-column">
            <Nav.Link href="#/supporter/promo">Supporter</Nav.Link>
            <Nav.Link href="#/questions">Questions</Nav.Link>
            <Nav.Link href="#/answers/pera">Answers</Nav.Link>
            <Nav.Link href="#/users/2">Users</Nav.Link>
            <Nav.Link onClick={() => otkaciMe()} className="justify-content-end">
              Sign out
            </Nav.Link>
            <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link eventKey="disabled" disabled>
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
            </Nav.Link> */}
          </Nav>
        )
          : (
            <Nav defaultActiveKey="#/about" className="flex-column">
              <Nav.Link href="#/landing">Landing</Nav.Link>
              <Nav.Link href="#/about">About</Nav.Link>
              <Nav.Link href="#/register">Register</Nav.Link>
              <Nav.Link href="#/sign-in">Sign In</Nav.Link>
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
              {/* <Nav.Link eventKey="imaged">
                <Navbar.Brand href="#">
                  <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />{' '} Questions
                </Navbar.Brand>
              </Nav.Link> */}
            </Nav>
          )}
      </Container>

    </Navbar>
  );
}

const mapStateToProps = (store: IAppState) => ({
  isAuthenticated: store.topState.top.isAuthenticated,
  uuid: store.topState.top.uuid
});

export default connect(
  mapStateToProps
)(Navig);