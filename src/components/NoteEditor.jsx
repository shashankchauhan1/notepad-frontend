import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import "./NoteEditor.css";

const NoteEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to edit your note.");
        navigate("/login");
        return;
      }

      if (!id) return;
      try {
        setLoading(true);
        await fetch("https://notepad-backend-dn97.onrender.com/"); // wake-up
        const res = await api.get(`/notes/${id}`);
        setTitle(res.data.title || "");
        setContent(res.data.content || "");
      } catch (err) {
        console.error("Error fetching note:", err.response?.data || err.message);
        alert("Failed to load note for editing.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      alert("Please enter some content or a title.");
      return;
    }

    try {
      if (id) {
        await api.put(`/notes/${id}`, { title, content });
      } else {
        await api.post("/notes", { title, content });
      }
      alert("Note saved successfully!");
      navigate("/notes");
    } catch (err) {
      console.error("Save failed:", err.response?.data || err.message);
      alert("Error saving note.");
    }
  };

  const handleDiscard = () => {
    const confirmDiscard = window.confirm("Are you sure you want to discard this note?");
    if (confirmDiscard) {
      navigate("/");
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-box">
        <h1 className="editor-title">
          {id ? "✏️ Edit Your Note" : "📝 Write Your Note"}
        </h1>

        {loading ? (
          <p className="editor-loading">Loading your majestic note...</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter a graceful title..."
              className="editor-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Write your elegant thoughts here..."
              className="editor-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="editor-buttons">
              <button onClick={handleSave} className="editor-save">
                <strong>💾 Save Note </strong>
              </button>
              <button onClick={handleDiscard} className="editor-discard">
                <strong>❌ Discard</strong>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
