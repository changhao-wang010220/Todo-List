import {Form, Stack, Row, Col, Button} from "react-bootstrap"
import CreatableSelect from 'react-select/creatable';
import {Link, useNavigate} from "react-router-dom"
import { FormEvent, useRef, useState } from "react";
import { NoteData } from "../App";
import { Tag } from "../App";
import {v4 as uuidV4} from "uuid"

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    avaliableTags: Tag[]
}

// interface Option {
//     readonly label: string;
//     readonly value: string;
// }

export function NoteForm({ onSubmit, onAddTag, avaliableTags }: NoteFormProps) {

    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const navigate = useNavigate();

    // const handleTagsChange = (tags: readonly Option[]) => {
    //     setSelectedTags(tags.map(tag => {
    //         return {lable: tag.label, id: tag.value}
    //     }))
    // }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSubmit({
            //"!" means the titleRef will never be null
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags
        });
        navigate("..");
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableSelect 
                                onCreateOption={label => {
                                    const newTag = {id: uuidV4(), label};
                                    onAddTag(newTag);
                                    setSelectedTags(prev => [...prev, newTag]);

                                }}
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
                <Form.Group>
                    <Form.Label>Body</Form.Label>
                    <Form.Control ref={markdownRef} required as="textarea" rows={15} />
                </Form.Group>
                <Stack direction="horizontal" gap={3} className="justify-content-end">
                    <Button type="submit" variant="primary">Save</Button>
                    <Link to="..">
                        <Button type="submit" variant="outline-secondary">Cancel</Button>
                    </Link>
                    
                </Stack>
            </Stack>
        </Form>
    )
}