import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./components/Welcome";
import NoteEditor from "./components/NoteEditor";
import NotesList from "./components/NotesList";
import Login from "./components/Login";
import Signup from "./components/Signup";

// Protected route wrapper
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Welcome />} />} />
        <Route path="/welcome" element={<ProtectedRoute element={<Welcome />} />} />
        <Route path="/notes" element={<ProtectedRoute element={<NotesList />} />} />
        <Route path="/notes/new" element={<ProtectedRoute element={<NoteEditor />} />} />
        <Route path="/notes/:id" element={<ProtectedRoute element={<NoteEditor />} />} />
        <Route path="/editor" element={<ProtectedRoute element={<NoteEditor />} />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
