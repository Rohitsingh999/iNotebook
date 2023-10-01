import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const context = useContext(NoteContext);
  const { showAlert } = context;
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "i-notebook-api-alpha.vercel.app/api/auth/login";
    const response = await fetch(url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (json.success) {
      showAlert("success", "Login successfully");
      localStorage.setItem("token", json.authtoken);
      navigate("/home");
    } else {
      showAlert("danger", json.error);
    }
  };

  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-4">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
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
                placeholder="Enter password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    // <div  style={{ padding: "44px" }}>
    //   <h2>Login to continue with iNotebook</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-3 mt-3 ">
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

    //     <button type="submit" className="btn btn-primary">
    //       Submit
    //     </button>
    //   </form>
    // </div>
  );
};

export default Login;
