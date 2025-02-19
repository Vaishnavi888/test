import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const SessionDetails = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Fetch session details from the backend
    axios.get('http://localhost:8080/sessions')
      .then(response => setSessions(response.data))
      .catch(error => console.error('Error fetching session details:', error));
  }, []);

  return (
    <div className="session-details-container">
      <h1>Session History</h1>
      <p>
        Explore previous session details including dates, topics discussed, and any presentation files.
      </p>
      <div className="session-cards">
        {sessions.length === 0 && <p>No sessions found.</p>}
        {sessions.map((session) => (
          <div className="session-card" key={session.id}>
            <div className="session-card-header">
              <h2>{session.topic}</h2>
              <p>{new Date(session.date).toLocaleDateString()}</p>
            </div>
            <div className="session-card-body">
              <p>{session.details}</p>
              {session.pptUrl && (
                <a
                  href={session.pptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="session-ppt-link"
                >
                  View PPT
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionDetails;
