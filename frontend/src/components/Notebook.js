import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";
const Notebook = () => {
  const context = useContext(NoteContext);
  const { toggleLogout } = context;
  toggleLogout(false);
  localStorage.removeItem("token");

  return (
    <div className="notebook-front-page">
      <div className="content">
        <h1>Welcome to iNotebook</h1>
        <p>
          Start jotting down your thoughts, ideas, and notes in your digital
          notebook. Stay organized and never miss an important detail!
        </p>
        <Link className="start-button btn" to="/signup">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Notebook;
