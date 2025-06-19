import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./components/Welcome";
import NoteEditor from "./components/NoteEditor";
import NotesList from "./components/NotesList";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Show Welcome if logged in, else Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Welcome /> : <Navigate to="/login" />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} /> {/* Optional extra route */}

        <Route path="/notes" element={<NotesList />} />
        <Route path="/notes/new" element={<NoteEditor />} />
        <Route path="/notes/:id" element={<NoteEditor />} />
        <Route path="/editor" element={<NoteEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
