import { Card, Col, Container, Row, Stack, Button, Accordion, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUmbrellaBeach, faTrashCan, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import ContextAwareToggle from "./ContextAwareToggle";
import { useState } from "react";
import Task from "./Task";
import NewTask from "./NewTask";
import DeleteAllModel from "./DeleteAllModel";

function Content(props) {

    let date = new Date();
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "dec"];
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const {
        tasks, 
        handleSave, 
        handleDeleteAll, 
        handleDelete, 
        handleCreateTask
    } = props;

    const [openCreateTask, setOpenCreateTask] = useState(false);
    const [showDeleteAllModel, setShowDeleteAllModel] = useState(false);

    const closeTask = () => {
        setOpenCreateTask(false);
    }

    return(
        <Container>
            <Row className="mb-2">
                <Col>
                    <Stack direction="horizontal" gap={2}>
                        <FontAwesomeIcon icon={faUmbrellaBeach} className='px-2'/>
                        <h4 className="mb-0">My day</h4>
                    </Stack>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>{`${week[date.getDay()]}, ${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</p>
                </Col>
            </Row>
            <Row className="mb-3">
                <Card>
                    <Card.Body>
                        <Row>
                            <Stack direction="horizontal">
                                <Button 
                                    variant="outline-dark"
                                    className="p-2"
                                    onClick={() => setOpenCreateTask(!openCreateTask)}
                                    aria-controls="create-task"
                                    aria-expanded={openCreateTask}
                                >
                                    <FontAwesomeIcon icon={faCirclePlus} className='pe-2'/>
                                    Create a task
                                </Button>
                            
                                <Button
                                    variant="outline-danger"
                                    className="p-2 ms-auto"
                                    onClick={() => {
                                        setShowDeleteAllModel(true)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} className='pe-2'/>
                                    Delete All Tasks!
                                </Button>
                                <DeleteAllModel 
                                    show={showDeleteAllModel}
                                    onHide={() => setShowDeleteAllModel(false)}
                                    handleDeleteAll={handleDeleteAll}
                                    closeTask={closeTask}
                                />
                            </Stack>
                        </Row>
                        <Row>
                            <Collapse in={openCreateTask}>
                                <div id="create-task" className="mt-3">
                                    <NewTask 
                                        handleCreateTask={handleCreateTask}
                                        closeTask={closeTask}
                                    />
                                </div>
                            </Collapse>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
            <Row className="mb-5">
                <Accordion defaultActiveKey="0" className='px-0'>
                    <Card>
                        {/* eventkey=0 means initial state is open */}
                        <ContextAwareToggle eventKey="0">
                            Need to be Done!
                        </ContextAwareToggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {tasks.filter(task => !task.isComplete)
                                .map(task => {
                                    return (
                                        <Task 
                                            key={task._id} 
                                            task={task} 
                                            handleSave={handleSave}
                                            handleDelete={handleDelete}
                                        />
                                    )
                                })}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Row>
            <Row>
                <Accordion defaultActiveKey="0" className='px-0'>
                    <Card>
                        {/* eventkey=1 means initial state is close */}
                        <ContextAwareToggle eventKey="1">
                            Finished!
                        </ContextAwareToggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                {tasks.filter(task => task.isComplete)
                                .map(task => {
                                    return (
                                        <Task 
                                            key={task._id} 
                                            task={task} 
                                            handleSave={handleSave}
                                            handleDelete={handleDelete}
                                        />
                                    )
                                })}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Row>
        </Container>
    )
}

export default Content;