// App.jsx
import React, { useState, useEffect } from "react";
import "./style.css"; // Import your CSS styles

const App = () => {
  const [isRedirectEnabled, setIsRedirectEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("Guest");
  const [formData, setFormData] = useState({
    season: "",
    language: "",
    episode: "",
    director: "",
    fav: "",
    noOfMovies: "",
    reason: "",
  });

  // Mock function to set user role
  useEffect(() => {
    setUserRole("Admin"); // Set role dynamically if needed
  }, []);

  // Handle toggle change for redirection
  useEffect(() => {
    if (isRedirectEnabled) {
      window.location.href = "another_page.html"; // Change to desired page
    }
  }, [isRedirectEnabled]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { season, language, episode, director, fav, noOfMovies, reason } =
      formData;

    if (!season || !language || !episode || !director || !fav || !noOfMovies || !reason) {
      alert("Please fill in all fields.");
      return;
    }

    const data = {
      movie: { season, language, episode, director },
      fav,
      "no.of movies": Number(noOfMovies),
      reason,
    };

    console.log("Data to be sent:", data);

    try {
      const response = await fetch("https://example.com/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      alert("Data submitted successfully!");
      setIsModalOpen(false);
      setFormData({
        season: "",
        language: "",
        episode: "",
        director: "",
        fav: "",
        noOfMovies: "",
        reason: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("There was an error submitting the data.");
    }
  };

  return (
    <div>
      {/* 🔹 Top Bar */}
      <div id="top-bar">
        <div className="toggle-container">
          <label className="toggle-label">Redirect:</label>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isRedirectEnabled}
              onChange={() => setIsRedirectEnabled(!isRedirectEnabled)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="user-info">
          <div className="user-icon">👤</div>
          <span>{userRole}</span>
        </div>
      </div>

      {/* 🔹 Launchpad */}
      <div id="launchpad">
        <div className="content">
          <nav>
            {[
              ["🧭 Safari"],
              ["📝 Notes"],
              ["📹 Facetime"],
              ["🛍️ App Store"],
              ["📚 Dictionary"],
              ["🖋️ Text Editor"],
              ["📊 Activity Monitor"],
              ["✈️ AirPort Utility"],
              ["🌐 Chromium"],
              ["🎭 Opera"],
              ["☁️ Skydrive"],
              ["🐦 Twitter"],
              ["📌 Pinterest"],
              ["🎬 iMovie"],
            ].map(([label], index) => (
              <a key={index} className="icon" onClick={() => setIsModalOpen(true)}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* 🔹 Modal */}
      {/* 🔹 Modal */}
<div className={`modal-overlay ${isModalOpen ? "show" : ""}`}>
  <div className="modal">
    <div className="modal-header">
      <span>Movie Information</span>
      <button className="close-btn" onClick={() => setIsModalOpen(false)}>
        ✖
      </button>
    </div>
    <div className="modal-content">
      <div className="modal-left">
        <h3>About This Entry</h3>
        <p>Please provide complete movie details on the right side.</p>
      </div>
      <div className="modal-right">
        <form onSubmit={handleSubmit}>
          {[
            ["season", "Season (e.g., 01)"],
            ["language", "Language (e.g., English)"],
            ["episode", "Episode (e.g., Second)"],
            ["director", "Director (e.g., Robert Anderson)"],
            ["fav", "Fav (e.g., 1234)"],
            ["noOfMovies", "No. of Movies (e.g., 233)"],
            ["reason", "Reason"],
          ].map(([name, placeholder]) => (
            <div key={name} className="form-group">
              <input
                type={name === "noOfMovies" ? "number" : "text"}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default App;
