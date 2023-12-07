import { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateNote() {
  const [noteList, setNoteList] = useState([]);

  const [selectedNote, setSelectedNote] = useState({
    id: null,
    noteTitle: "",
    noteDescription: "",
    noteUser_id: "",
  });

  const [selectedValue, setSelectedValue] = useState("");

  const getNoteList = () => {
    axios.get(`http://localhost:6001/notes`).then((response) => {
      setNoteList(response.data);
    });
  };

  // const getOneNote = (id) => {
  //   axios
  //     .get(`${import.meta.env.VITE_BACKEND_URL}/note/${id}`)
  //     .then((response) => {
  //       setSelectedNote({
  //         id: response.data.id || "",
  //         noteTitle: response.data.noteTitle || "",
  //         noteDescription: response.data.noteDescription || "",
  //         noteUser_id: response.data.noteUser_id || "",
  //       });
  //     });
  // };

  const updateNote = (id) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/note/${id}`, {
        noteTitle: selectedNote.noteTitle,
        noteDescription: selectedNote.noteDescription,
        noteUser_id: selectedNote.noteUser_id,
      })
      .then((response) => {
        console.info(response);
      });
  };

  useEffect(() => {
    getNoteList();
  }, []);

  // useEffect(() => {
  //   getOneNote(selectedValue);
  // }, [selectedValue]);

  useEffect(() => {
    console.info(selectedNote);
  }, [selectedNote]);

  return (
    <div className="update_note_panel">
      <h2>Modifez votre note </h2>
      <select
        onChange={(event) => setSelectedValue(event.target.value)}
        value={selectedValue}
      >
        <option value="">Sélectionne une note</option>
        {noteList.map((note) => (
          <option key={note.id} value={note.id}>
            {note.id} - {note.title}
          </option>
        ))}
      </select>
      <div>
        {selectedNote && (
          <form onSubmit={() => updateNote(selectedNote.id)}>
            <input
              type="text"
              placeholder={selectedNote.title}
              value={selectedNote.title}
              onChange={(event) =>
                setSelectedNote({
                  ...selectedNote,
                  noteTitle: event.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder={selectedNote.description}
              value={selectedNote.description}
              onChange={(event) =>
                setSelectedNote({
                  ...selectedNote,
                  noteDescription: event.target.value,
                })
              }
            />
            <input
              style={{ backgroundColor: "green", color: "beige" }}
              type="submit"
              value="Enregistrer"
            />
          </form>
        )}
      </div>
    </div>
  );
}
