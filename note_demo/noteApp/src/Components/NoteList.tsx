import { Button, Col, Row, Stack, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select"
import { Note, Tag } from "../App";
import { useMemo, useState } from "react";

type NoteListProp = {
    avaliableTags: Tag[]
    notes: Note[]
}

export function NoteList({avaliableTags, notes}: NoteListProp) {

    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && 
                   (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id))) 
        })
    }, [title, selectedTags, notes])

    return (
        <>
            <Row>
                <Col><h1>Notes</h1></Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to="/new">
                            <Button type="submit" variant="primary">Create</Button>
                        </Link>
                        
                        <Button type="submit" variant="outline-secondary">Edit Tag</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-4 align-items-center">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <Select 
                                //the changed tag value
                                value={selectedTags.map(tag => {
                                    return {label: tag.label, value: tag.id}
                                })}
                                //set the tag after change
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return {label: tag.label, id: tag.value}
                                    }))
                                }}
                                options={avaliableTags.map(tag => {
                                    return {label: tag.label, value: tag.id}
                                })}
                                isMulti
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                {filteredNotes.map(note => {
                    return (
                        <Col key={note.id}>
                            {/* <NoteCard /> */}
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}