import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import {Routes, Route, Navigate} from "react-router-dom"
import {NewNote} from "./Components/NewNote"
import { useLocalStorage } from "./useLocalStorage"
import {useMemo} from "react"
import {v4 as uuidV4} from "uuid"
import { NoteList } from "./Components/NoteList"

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIDs: string[]
}

export type Tag = {
  id: string
  label: string
}


function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag => {
        note.tagIDs.includes(tag.id)
      })}
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes, 
        {...data, id: uuidV4(), tagIDs: tags.map(tag => tag.id)}
      ]
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag]);
  }

  return (
    <Container className="m-4">
      <Routes>
        <Route path="/" element={<NoteList avaliableTags={tags} notes={notesWithTags}/>}/>
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} avaliableTags={tags}/>} />
        <Route path="/:id">
          <Route index element={<h1>show</h1>} />
          <Route path="edit" element={<h1>edit</h1>} />
        </Route>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App