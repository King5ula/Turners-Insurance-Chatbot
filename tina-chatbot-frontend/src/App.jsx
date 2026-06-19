import { useState } from "react";
import InsuranceChatPage from "./pages/InsuranceChatPage";
import { Sun, Moon } from "lucide-react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`app-canvas-wrapper ${darkMode ? "dark-theme-global" : ""} `}
    >
      <div className="turners-page">
        <header className="turner-header">
          <div className="logo-container">
            <div className="mock-logo-badge">t</div>
            <h1>
              Turners <span className="logo-sub">Cars</span>
            </h1>
          </div>
          <nav className="mock-nav">
            <span>Buy a Car</span>
            <span>Sell Your Car</span>
            <span className="active-nav">Car Insurance</span>
          </nav>
          <button
            className="theme-toggle-btn absolute-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>
        <InsuranceChatPage darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;
