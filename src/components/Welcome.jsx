import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1e1e1e] text-white px-4 text-center welcome-container">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 fade-slide-up">
        Welcome to <span className="text-purple-400">NottePreziosa</span>
      </h1>

      <div className="text-gray-400 mb-8 max-w-md text-base sm:text-lg fade-slide-up space-y-2">
        <p>
          Your private notes. Write, save, and access anywhere — write with intention.
          Keep it safe. Keep it timeless.
        </p>
        <p className="text-cyan-300 font-medium italic">
          NottePreziosa — because in a noisy world, privacy is power.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 fade-slide-up">
        <button
          onClick={() => navigate("/notes/new")}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded text-base sm:text-lg font-semibold transition-all duration-300 shadow-md"
        >
          🖊️ Create Note
        </button>
        <button
          onClick={() => navigate("/notes")}
          className="bg-gray-700 hover:bg-gray-800 px-6 py-3 rounded text-base sm:text-lg font-semibold transition-all duration-300 shadow-md"
        >
          📄 View Notes
        </button>
      </div>
    </div>
  );
};

export default Welcome;
