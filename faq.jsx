import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FAQ = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/requests').then((res) => {
      setRequests(res.data.filter((req) => req.status === 'Answered'));
    });
  }, []);

  return (
    <div>
      <h2>FAQ</h2>
      <ul>
        {requests.map((req) => (
          <li key={req.id}>{req.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
