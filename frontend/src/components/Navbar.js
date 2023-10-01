import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";

const Navbar = () => {
  let location = useLocation();
  const context = useContext(NoteContext);
  const { logout } = context;
  //console.log(logout);
  return (
    <nav className="navbar   navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {logout && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            {!logout && (
              <Link className="btn btn-light mx-1" to="/login" role="submit">
                Sign in
              </Link>
            )}
            {!logout && (
              <Link className="btn btn-light mx-1" to="/signup" role="submit">
                Sign up
              </Link>
            )}
            {logout && (
              <Link className="btn btn-light mx-1" to="/" role="submit">
                Logout
              </Link>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
