import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";

const Signup = () => {
  const context = useContext(NoteContext);
  const { showAlert } = context;

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      return showAlert(
        "danger",
        "Your password and confirmation password do not match"
      );
    }

    const url = "i-notebook-api-alpha.vercel.app/api/auth/createuser";
    const response = await fetch(url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (json.success) {
      showAlert("success", "Login Successfully");
      localStorage.setItem("token", json.authtoken);
      navigate("/home");
    } else {
      showAlert("danger", json.error);
    }
  };

  return (
    <div className="Auth-form-container">
      <form
        className="Auth-form"
        style={{ height: "530px" }}
        onSubmit={handleSubmit}
      >
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span
              id="signup"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              name="name"
              value={credentials.name}
              onChange={onChange}
              minLength={3}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label> Confirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              name="cpassword"
              value={credentials.cpassword}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </div>
        </div>
      </form>
    </div>
    // <div className=" container mt-5 ">
    //   <h2>Signup to continue with iNotebook</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-3 my-3 ">
    //       <label htmlFor="name" className="form-label">
    //         Name
    //       </label>
    //       <input
    //         type="name"
    //         className="form-control"
    //         id="name"
    //         name="name"
    //         value={credentials.name}
    //         onChange={onChange}
    //         aria-describedby="emailHelp"
    //         minLength={3}
    //         required
    //       />
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="email" className="form-label">
    //         Email address
    //       </label>
    //       <input
    //         type="email"
    //         className="form-control"
    //         id="email"
    //         name="email"
    //         value={credentials.email}
    //         onChange={onChange}
    //         aria-describedby="emailHelp"
    //       />
    //       <div id="emailHelp" className="form-text">
    //         We'll never share your email with anyone else.
    //       </div>
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="password" className="form-label">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="password"
    //         name="password"
    //         value={credentials.password}
    //         onChange={onChange}
    //         minLength={5}
    //         required
    //       />
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="cpassword" className="form-label">
    //         Confirm Password
    //       </label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="cpassword"
    //         name="cpassword"
    //         value={credentials.cpassword}
    //         onChange={onChange}
    //         minLength={5}
    //         required
    //       />
    //     </div>

    //     <button type="submit" className="btn btn-primary">
    //       Submit
    //     </button>
    //   </form>
    // </div>
  );
};

export default Signup;
