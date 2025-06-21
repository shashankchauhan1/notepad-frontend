import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FaPlus, FaTrash, FaArrowLeft } from "react-icons/fa";
import "./NoteList.css"; // ✅ external styles here

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    const wakeAndFetch = async () => {
      try {
        await fetch("https://notepad-backend-dn97.onrender.com/");
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch notes:", err.response?.data || err.message);
        if (err.response?.status === 403) {
          alert("Unauthorized. Please login again.");
          navigate("/login");
        } else {
          alert("Error fetching notes.");
        }
      } finally {
        setLoading(false);
      }
    };

    wakeAndFetch();
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this note?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err.response?.data || err.message);
      alert("Failed to delete");
    }
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <button onClick={() => navigate("/")} className="back-btn">
          <FaArrowLeft /> Back
        </button>

        <button onClick={() => navigate("/editor")} className="new-note-btn">
          <FaPlus /> New Note
        </button>
      </div>

      <h1 className="notes-title">📘 Saved Notes</h1>

      {loading ? (
        <div className="notes-loading">Loading...</div>
      ) : notes.length === 0 ? (
        <div className="notes-empty">No notes available.</div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note._id}
              className="note-card"
              onClick={() => toggleExpand(note._id)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(note._id);
                }}
                className="note-delete-btn"
                title="Delete"
              >
                <FaTrash size={12} />
              </button>

              <h2 className="note-title">{note.title || "Untitled"}</h2>
              <p
                className={`note-content ${expandedId === note._id ? "expanded" : "collapsed"}`}
              >
                {note.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;
