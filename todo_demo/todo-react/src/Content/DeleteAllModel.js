import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteAllModel(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="deleteAllTitle">
                    Warning!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete all tasks?
            </Modal.Body>
            <Modal.Footer>
                <Stack direction='horizontal' gap={2}>
                    <Button variant='danger' onClick={() => {
                        if(props.handleDeleteAll()) {
                            props.closeTask();
                            props.onHide();
                        }
                    }}>
                        Delete
                    </Button>
                    <Button variant='secondary' onClick={props.onHide}>Cancel</Button>
                </Stack>
            </Modal.Footer>
        </Modal>
  );
}
export default DeleteAllModel;