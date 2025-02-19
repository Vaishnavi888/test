import React, { useState, useEffect } from 'react';
import './style.css';

const SessionDetails = () => {
  // Sample data array for testing CSS and layout
  const sampleSessions = [
    {
      id: 1,
      date: '2025-02-10T14:30:00Z',
      topic: 'Introduction to Spring Boot',
      details: 'Discussed the basics of Spring Boot and how to set up a simple application.',
      pptUrl: 'https://example.com/ppt/springboot-intro.pdf'
    },
    {
      id: 2,
      date: '2025-02-12T16:00:00Z',
      topic: 'Advanced React Patterns',
      details: 'Explored advanced React patterns including hooks, context API, and higher order components.',
      pptUrl: ''
    },
    {
      id: 3,
      date: '2025-02-14T10:00:00Z',
      topic: 'Deploying on Kubernetes',
      details: 'Covered the basics of containerizing your application and deploying it on Kubernetes.',
      pptUrl: 'https://example.com/ppt/kubernetes-deployment.pdf'
    }
  ];

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // For now, we're using sample data.
    // In a real app, replace this with an API call (e.g., axios.get(...))
    setSessions(sampleSessions);
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
              {session.pptUrl && session.pptUrl.trim() !== '' && (
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
