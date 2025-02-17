import React, { useState } from "react";
import "./style.css"; // Ensure you have the CSS file

const ModalComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    season: "",
    language: "",
    episode: "",
    director: "",
    fav: "",
    noOfMovies: "",
    reason: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { season, language, episode, director, fav, noOfMovies, reason } = formData;

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
      closeModal();
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
      {/* Open Modal Button */}
      <button className="open-modal-btn" onClick={openModal}>
        Open Modal
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay show">
          <div className="modal">
            {/* Modal Header */}
            <div className="modal-header">
              <span>Movie Information</span>
              <button className="close-btn" onClick={closeModal}>
                ✖
              </button>
            </div>

            {/* Modal Content */}
            <div className="modal-content">
              {/* Left Side */}
              <div className="modal-left">
                <h3>About This Entry</h3>
                <p>
                  Please provide the complete movie details on the right side. All fields are required to build the data in the correct JSON format.
                </p>
              </div>

              {/* Right Side (Form) */}
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
                    <button type="button" className="cancel-btn" onClick={closeModal}>
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
      )}
    </div>
  );
};

export default ModalComponent;
