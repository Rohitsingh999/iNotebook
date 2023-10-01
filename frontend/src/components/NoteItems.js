import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

const NoteItems = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title"> {note.title}</h5>
          <p className="card-text">{note.description}</p>
          <h6 className="card-title"> Tag : {note.tag}</h6>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => deleteNote(note._id)}
          ></i>
          <i
            className="fa-solid fa-pen mx-2"
            onClick={() => updateNote(note)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItems;
