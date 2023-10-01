import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Ibook from "./components/Notebook";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoteState from "./context/notes/notesState";
import Alert from "./components/Alert";

const App = () => {
  return (
    <NoteState>
      <Router>
        <>
          <Navbar />
          <Alert />
          <div>
            <Routes>
              <Route exact path="/" element={<Ibook />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </>
      </Router>
    </NoteState>
  );
};

export default App;
