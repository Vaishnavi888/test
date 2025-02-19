import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const RequestForm = ({ fetchRequests }) => {
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState('');
  const [details, setDetails] = useState('');
  const [requestType, setRequestType] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!userId || !details || !requestType || !content) {
      alert('Please fill all fields');
      return;
    }

    // Create the new request object
    const newRequest = { userId, details, requestType, content, status: 'Pending' };

    try {
      // Post request to backend endpoint
      await axios.post('http://localhost:8080/requests', newRequest);

      // Optionally refresh request list (if passed as a prop)
      if (fetchRequests) {
        fetchRequests();
      }
      
      // Reset fields and hide the form
      setUserId('');
      setDetails('');
      setRequestType('');
      setContent('');
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request. Please try again later.');
    }
  };

  return (
    <div className="request-form-container">
      <h1>Request Form</h1>
      <p>
        Welcome to the Office Hours Request Form. Here you can submit a request to either
        discuss a specific topic or ask a question during office hours. Once your request is submitted,
        you'll be able to track its progress.
      </p>

      {!showForm && (
        <div className="open-form-button-container">
          <button onClick={() => setShowForm(true)}>Open Request Form</button>
        </div>
      )}

      {showForm && (
        <div className="form-box">
          <div className="form-box-header">
            <h2>Submit Your Request</h2>
          </div>
          <form onSubmit={handleSubmit} className="form-content">
            <input
              type="text"
              placeholder="Your ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <textarea
              placeholder="Your Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
            >
              <option value="">Choose Request Type</option>
              <option value="Topic">Request a Topic</option>
              <option value="Question">Ask a Question</option>
            </select>
            {requestType && (
              <textarea
                placeholder={requestType === 'Topic' ? 'Enter Topic' : 'Enter Question'}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            )}
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RequestForm;
