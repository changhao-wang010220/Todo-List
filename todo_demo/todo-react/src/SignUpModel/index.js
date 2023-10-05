import {Button, Modal, Form} from 'react-bootstrap';
import { useState } from 'react';

function SignUpModel(props) {
    const {showSignUp, handleSignUpClose} = props;

    const [validated, setValidated] = useState(false);

    const handleSignUp = e => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            handleSignUpClose();
        }
        setValidated(true);
    }

    return (
        <Modal show={showSignUp} onHide={() => {
            setValidated(false);
            handleSignUpClose();
        }} className='align-item-center'>
            <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form  noValidate validated={validated} onSubmit={handleSignUp}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            autoFocus
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="userName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
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
                        <Button variant="dark" type="submit">
                            Sign Up
                        </Button>
                    </div>
                </Form>
                
            </Modal.Body>
        </Modal>
    )
}

export default SignUpModel;