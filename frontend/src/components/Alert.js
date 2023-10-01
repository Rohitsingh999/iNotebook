import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

export default function Alert() {
  const context = useContext(NoteContext);
  const { alert } = context;

  return (
    alert && (
      <div
        className={`alert alert-${alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{alert.type === "danger" ? "Error" : alert.type}</strong> :{" "}
        {alert.msg}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    )
  );
}
