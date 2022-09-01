import * as React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { IAppState } from "./store/Store";

import logo from './logo.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faHome, faPlus, faSurprise, faUserFriends, faSignOutAlt, faSignInAlt, faAnchor } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleLeft, faAngleDoubleRight, faRegistered, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Collapse, Container, Form, FormControl, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { IUser } from "./user/types";
import { IAuth } from "./Top/types";


interface IProps {
  isAuthenticated: boolean | null;
  uuid: string | null;
  auth?: IAuth,
  open: boolean,
  setOpen: (open: boolean) => void
  register: () => void
  signIn: () => void
  signOut: () => void
}

function Header({ isAuthenticated, uuid, auth, open, setOpen, register, signIn, signOut }: IProps) {

  let navigate = useNavigate();

  const otkaciMe = () => {
    signOut();
    navigate('/landing');
  }

  {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> 
           <Navbar.Toggle aria-controls="offcanvasNavbar" /> 
         <Nav className="justify-content-end flex-grow-1 pe-3"> */}

  /// defaultActiveKey="/questions"
  console.log('isAuthenticated', isAuthenticated);
  return (
    <Navbar as="header" bg="light" expand="lg" className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-y-0 shadow">
      <Container fluid>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          size='sm'
          variant="secondary"
        >
          <FontAwesomeIcon icon={open ? faAngleDoubleLeft : faAngleDoubleRight} color='lightblue' />
        </Button>
        <Navbar.Brand href="#">Support <i>Knowledge</i></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {!isAuthenticated &&
              <Nav.Link href="#/Register">
                Register
              </Nav.Link>
            }
            {!isAuthenticated &&
              <Nav.Link href="#action2" onClick={() => signIn()}>
                Sign In
              </Nav.Link>
            }

            {isAuthenticated &&
              <>
                <Nav.Link href="#" disabled>
                  <FontAwesomeIcon icon={faUser} />
                  {' '}{auth?.who.userName}
                </Nav.Link>

                <Nav.Link href="#" disabled>
                  <FontAwesomeIcon icon={faCog} color='lightblue' />
                </Nav.Link>
                <NavDropdown title="" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  {isAuthenticated &&
                    <NavDropdown.Item href="#action5" onClick={() => otkaciMe()}>
                      Sign out
                    </NavDropdown.Item>
                  }
                </NavDropdown>
              </>
            }

          </Nav>

        </Navbar.Collapse>
        <Button
          id='btnSync'
          aria-controls="example-collapse-text"
          size='sm'
          variant="secondary"
        >
          Sync
        </Button>
      </Container>
    </Navbar>

  );
}

const mapStateToProps = (store: IAppState) => ({
  isAuthenticated: store.topState.top.isAuthenticated,
  uuid: store.topState.top.uuid,
  auth: store.topState.top.auth
});

export default connect(
  mapStateToProps
)(Header);