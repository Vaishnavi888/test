import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/requests').then((res) => setRequests(res.data));
  }, []);

  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:8080/requests/${id}`, { status: 'Answered' });
    window.location.reload();
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {requests.map((req) => (
          <li key={req.id}>
            {req.content} - <strong>{req.status}</strong>
            {req.status === 'Pending' && <button onClick={() => handleUpdate(req.id)}>Mark as Answered</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
