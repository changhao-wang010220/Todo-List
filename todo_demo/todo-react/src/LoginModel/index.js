import {Button, Modal, Form, Row, Col, InputGroup} from 'react-bootstrap';
import { useState } from 'react';

function LoginModel(props) {
    const {showLogin, handleLoginClose, handleSignUpShow} = props;

    const [validated, setValidated] = useState(false);

    const handleLogin = e => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            handleLoginClose();
        }
        setValidated(true);
    }

    return (
        <Modal show={showLogin} onHide={() => {
            setValidated(false);
            handleLoginClose();
        }} className='align-item-center'>
            <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="userName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            autoFocus
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter username.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-grid mt-2">
                        <Button variant="dark" type='submit'>
                            Log in
                        </Button>
                    </div>
                </Form>
                
                <Row>
                    <Col className="icon-link justify-content-end">
                        <Button  variant="link" onClick={() =>{
                            handleLoginClose()
                            handleSignUpShow()
                        }}>
                            sign up
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default LoginModel;