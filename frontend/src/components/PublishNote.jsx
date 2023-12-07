import axios from "axios";
import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import NotesContent from "./NoteContent";

export default function PublishNote() {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  // const { id } = useParams();
  const [data, setData] = useState([]);

  const addOffer = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/note`, {
        title: noteTitle,
        description: noteDescription,
        user_id: 1,
      })
      .then((response) => {
        console.info(response);
      })
      .catch((error) => {
        console.error(error);
      });
    window.location.assign("/note");
  };

  const getAllNotes = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/notes/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    console.info("Titre de l'offre", noteTitle);
  }, [noteTitle]);

  useEffect(() => {
    console.info("Description de la note", noteDescription);
  }, [noteDescription]);

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div className="notesOnly">
      <div className="content_publish_note">
        <form onSubmit={addOffer}>
          <div className="publish_form_input" action="">
            <div className="input_wrapper">
              <label htmlFor="name">Titre de la note </label>
              <textarea
                type="text"
                placeholder="Titre de la note"
                value={noteTitle}
                onChange={(event) => setNoteTitle(event.target.value)}
              />
            </div>
          </div>

          <div className="publish_form_label" action="">
            <label htmlFor="name">Quelles sont tes inspirations ?</label>
            <textarea
              className="big_label"
              type="text"
              placeholder="Quelles sont tes inspirations ?"
              value={noteDescription}
              onChange={(event) => setNoteDescription(event.target.value)}
            />
            <button type="submit"> Enregistrer la note</button>
          </div>
        </form>
      </div>
      <div className="content_saved_note">
        {data.map((note) => (
          <NotesContent key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
