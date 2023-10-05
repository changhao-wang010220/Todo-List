import { Card, Form, Button, Stack, Row, Collapse} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
import { useState } from "react";


function Task(props) {
    const {task, handleSave, handleDelete} = props;

    const [editTask, setEditTask] = useState(false);
    const [openTask, setOpenTask] = useState(false);

    const [name, setName] = useState(task.name);
    const [description, setDescription] = useState(task.description)
    
    return(
        <Card>
            <Card.Body
                onClick={() => {
                    setOpenTask(!openTask);
                    setEditTask(false);
                }}
                aria-controls="example-collapse-text"
                aria-expanded={openTask}
            >
                <Stack direction="horizontal" gap={3}>
                    <Form.Check
                        aria-label="complete-checkbox"
                        checked={task.isComplete}
                        onChange={e => {
                            e.stopPropagation();
                            task.isComplete = !task.isComplete;
                            if(!handleSave(task))
                                alert("failed to save")
                        }}
                        className="p-2 mx-2"
                    />
                    <Form.Control plaintext readOnly key="readOnlyName" value={name} className={editTask ? "d-none" : ""}/>
                    <Form.Control 
                        key="Name"
                        className={editTask ? "" : "d-none"} 
                        required value={name} 
                        onClick={e => e.stopPropagation()}
                        onChange={e => setName(e.currentTarget.value)}
                    />
                    <Button
                        variant="outline-dark"
                        className="px-1 py-0 ms-auto border border-0"
                        onClick={e => {
                            setEditTask(!editTask);
                            setOpenTask(!editTask);
                            e.stopPropagation()
                        }}
                    >
                        <FontAwesomeIcon icon={faPen}/>
                    </Button>
                    <Button 
                        variant="outline-danger" 
                        className="px-1 py-0 border border-0"
                        onClick={e => {
                            e.stopPropagation()
                            if(!handleDelete(task))
                                alert("failed to save")
                        }}
                    >
                        <FontAwesomeIcon icon={faTrashCan}/>
                    </Button>
                    <Button 
                        variant="light" 
                        className="px-1 py-0 border border-0"
                        onClick={e => {
                            e.stopPropagation()
                            task.isImportant = !task.isImportant;
                            if(!handleSave(task))
                                alert("failed to save")
                        }}
                    >
                        <FontAwesomeIcon icon={solidStar} className={task.isImportant ? "" : "d-none"}/>
                        <FontAwesomeIcon icon={regularStar} className={task.isImportant ? "d-none" : ""}/>
                    </Button>
                </Stack>
                
            </Card.Body>
            <Card.Body className="py-0">
                <Collapse in={openTask}>
                    <div id="example-collapse-text" className="mt-3">
                        <Form.Group as={Row} className="m-3" controlId="task-description">
                            <Form.Control as="textarea" rows={4} plaintext readOnly value={description} className={editTask ? "d-none" : ""}/>
                            <Form.Control 
                                as="textarea" 
                                required rows={4} 
                                className={editTask ? "" : "d-none"} 
                                value={description} 
                                onClick={e => e.stopPropagation()}
                                onChange={e => setDescription(e.currentTarget.value)}
                            />
                            <small className="text-muted my-2">{"Created at: " + new Date(task.dateTime).toLocaleString()}</small>
                        </Form.Group>
                        <Stack direction="horizontal" className={editTask ? "m-3" : "d-none"}>
                            <Button
                                className="p-2"
                                variant="dark"
                                onClick={e => {
                                    e.stopPropagation();
                                    task.name = name;
                                    task.description = description;
                                    if(handleSave(task))
                                        setEditTask(false);
                                    else
                                        alert("failed to save")
                                }}
                            >Save</Button>
                            <Button
                                className="p-2 ms-auto"
                                variant="secondary"
                                onClick={e => {
                                    e.stopPropagation();
                                    setName(task.name);
                                    setDescription(task.description);
                                    setEditTask(!editTask);
                                }}
                            >cancel</Button>
                        </Stack>
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
        
    )
}

export default Task;