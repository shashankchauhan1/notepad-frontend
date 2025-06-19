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
      if (!id) return;
      try {
        setLoading(true);
        const res = await api.get(`/notes/${id}`);
        setTitle(res.data.title || "");
        setContent(res.data.content || "");
      } catch (err) {
        console.error("Error fetching note:", err);
        alert("Failed to load note for editing.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

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
      navigate("/notes"); // ✅ redirect to View Notes
    } catch (err) {
      console.error("Save failed:", err);
      alert("Error saving note.");
    }
  };

  const handleDiscard = () => {
    const confirmDiscard = window.confirm("Are you sure you want to discard this note?");
    if (confirmDiscard) {
      navigate("/"); // ✅ back to Welcome page
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-box">
        <h1 className="editor-title">
          {id ? "✏️ Edit Your Royal Note" : "📝 Write a Regal Thought"}
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
                💾 Save Note
              </button>
              <button onClick={handleDiscard} className="editor-discard">
                ❌ Discard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
