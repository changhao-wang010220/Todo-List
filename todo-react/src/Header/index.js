import {Navbar, Container, Form, Button, Modal, Nav} from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser } from '@fortawesome/free-solid-svg-icons'
// import { useState } from 'react';
// import LoginModel from '../LoginModel';
// import SignUpModel from '../SignUpModel';

function Header(props) {

    // //login model funcs
    // const [showLogin, setShowLogin] = useState(false);
    // const handleLoginClose = () => setShowLogin(false);
    // const handleLoginShow = () => setShowLogin(true);

    // //Sign up model funcs
    // const [showSignUp, setShowSignUp] = useState(false);
    // const handleSignUpClose = () => setShowSignUp(false);
    // const handleSignUpShow = () => setShowSignUp(true);

    // const {isLogin, user} = props;

    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="mb-4">
            <Container fluid>
                <Navbar.Brand className="text-white user-select-none">To do List</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarContent"/>
                {/* <Navbar.Collapse id="navbarContent" className="justify-content-end">
                    <Nav className="justify-content-end">
                        <Nav.Link onClick={handleLoginShow}>
                            <FontAwesomeIcon icon={faUser} className='px-2'/>
                                {isLogin ? `Hi ${user.name}` : "Log in"}
                        </Nav.Link>
                        <Form className={isLogin ? "d-flex px-2" : "d-flex px-2 d-none"}>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className="me-2"
                            />
                        </Form>
                    </Nav>
                </Navbar.Collapse> */}
                {/* Login model */}
                {/* <LoginModel showLogin={showLogin} handleLoginClose={handleLoginClose} handleSignUpShow={handleSignUpShow}/> */}
                {/* Signup model */}
                {/* <SignUpModel showSignUp={showSignUp} handleSignUpClose={handleSignUpClose}/> */}
            </Container>
        </Navbar>
    )
}

export default Header;