import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FaPlus, FaTrash, FaArrowLeft } from "react-icons/fa";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
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
        // Wake up the Render server
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

  return (
    <div className="min-h-screen px-4 sm:px-6 py-10 bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1c1c1c] text-white font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <button
          onClick={() => navigate("/")}
          className="text-gray-300 hover:text-white flex items-center gap-2 text-sm font-semibold transition-all"
        >
          <FaArrowLeft />
          Back
        </button>

        <button
          onClick={() => navigate("/editor")}
          className="bg-gradient-to-br from-purple-800 via-purple-600 to-purple-500 hover:brightness-125 px-6 py-2 rounded-full shadow-2xl text-white font-semibold flex items-center gap-2 transition-all"
          style={{
            boxShadow: "0 0 18px rgba(168, 85, 247, 0.5)",
            fontFamily: "Georgia, serif",
          }}
        >
          <FaPlus /> New Note
        </button>
      </div>

      <h1
        className="text-3xl sm:text-4xl text-center font-bold mb-10"
        style={{
          textShadow: "0 0 14px rgba(255, 255, 255, 0.12)",
          fontFamily: "Georgia, serif",
        }}
      >
        📘 Saved Notes
      </h1>

      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : notes.length === 0 ? (
        <div className="text-center text-gray-500">No notes available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="relative backdrop-blur-md bg-gradient-to-tr from-white/10 to-white/5 p-6 rounded-3xl border border-white/10 shadow-[0_8px_24px_rgba(168,85,247,0.2)] hover:shadow-purple-500/40 hover:scale-[1.03] transition-all duration-300 ease-in-out cursor-pointer group"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(note._id);
                }}
                className="absolute top-3 right-3 bg-gradient-to-tr from-red-600 to-red-500 hover:brightness-110 text-white p-1.5 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all shadow-md"
                title="Delete"
              >
                <FaTrash size={12} />
              </button>

              <div onClick={() => navigate(`/notes/${note._id}`)}>
                <h2 className="text-xl font-semibold mb-2 truncate">
                  {note.title || "Untitled"}
                </h2>
                <p className="text-sm text-gray-300 max-h-[100px] overflow-hidden leading-relaxed">
                  {note.content.length > 100
                    ? note.content.slice(0, 100) + "..."
                    : note.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;
