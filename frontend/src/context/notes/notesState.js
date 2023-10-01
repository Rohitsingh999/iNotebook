import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "i-notebook-api-alpha.vercel.app";

  const [notes, setNotes] = useState([]);
  const [alert, setAlert] = useState(null);
  const [logout, setLogout] = useState(false);

  //  for  using Alert
  const showAlert = (type, message) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleLogout = (log) => {
    setLogout(log);
  };

  //Fetch all Notes
  const fetchNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    //console.log(json);
    setNotes(json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnote`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    if (json.success) {
      setNotes(notes.concat(json.saveNote));
      showAlert("success", json.message);
    } else {
      showAlert("danger", json.error);
    }
  };

  //Delete a Note

  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();

    if (json.success) {
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
      showAlert("success", json.message);
    } else {
      showAlert("danger", json.error);
    }
  };

  //Edit a Note

  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    if (json.success) {
      let newnotes = JSON.parse(JSON.stringify(notes));

      for (let i = 0; i < newnotes.length; i++) {
        if (newnotes[i]._id === id) {
          newnotes[i].title = title;
          newnotes[i].description = description;
          newnotes[i].tag = tag;
          break;
        }
      }
      setNotes(newnotes);
      showAlert("success", "Note Update Successfully..");
    } else {
      showAlert("danger", json.error);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        fetchNotes,
        alert,
        showAlert,
        logout,
        toggleLogout,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
