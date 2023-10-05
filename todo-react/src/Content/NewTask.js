import { useState } from 'react';
import { Form, Col, Row, Stack, Button } from 'react-bootstrap';

function NewTask(props) {

    const {handleCreateTask, closeTask} = props;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const createTask = e => {
        e.preventDefault();
        let newTask = {
            name: name,
            description: description,
            isComplete: false,
            isImportant: false,
        }
        if(handleCreateTask(newTask)) {
            setName("");
            setDescription("");
            closeTask();
        }
            
    }

    return (
        <Form onSubmit={createTask}>
            <Form.Group as={Row} className="mb-3" controlId="newTaskName">
                <Form.Label column sm="2">
                    Task Name
                </Form.Label>
                <Col sm="10">
                    <Form.Control required value={name} onChange={e => setName(e.currentTarget.value)}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                    Description
                </Form.Label>
                <Col sm="10">
                    <Form.Control required as="textarea" rows={5} value={description} onChange={e => setDescription(e.currentTarget.value)}/>
                </Col>
            </Form.Group>
            <Stack className="col-md-5 mx-auto">
                <Button variant='dark' type='submit'>
                    Save
                </Button>
            </Stack>
        </Form>
    )
}

export default NewTask;