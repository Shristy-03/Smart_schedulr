// React Example Component showing how to use the Schedulr API
// This is just an example - you can use this with any frontend framework

import React, { useState, useEffect } from 'react';
import apiClient from './client.js';

const SchedulrDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: 'admin@example.com',
    password: 'admin123'
  });

  // Check if user is already logged in
  useEffect(() => {
    if (apiClient.isAuthenticated()) {
      setIsAuthenticated(true);
      setUser(apiClient.getCurrentUser());
    }
  }, []);

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.login(loginData.email, loginData.password);
      setIsAuthenticated(true);
      setUser(response.user);
      console.log('Login successful:', response);
    } catch (err) {
      setError(err.message);
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    apiClient.logout();
    setIsAuthenticated(false);
    setUser(null);
    setTimetables([]);
  };

  // Generate timetable
  const generateTimetable = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.generateTimetable(3);
      setTimetables(response.choices);
      console.log('Timetable generated:', response);
    } catch (err) {
      setError(err.message);
      console.error('Timetable generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get existing timetable choices
  const getTimetableChoices = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.getTimetableChoices();
      setTimetables(response.choices);
      console.log('Timetable choices:', response);
    } catch (err) {
      setError(err.message);
      console.error('Failed to get timetable choices:', err);
    } finally {
      setLoading(false);
    }
  };

  // Approve a timetable
  const approveTimetable = async (timetableId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.approveTimetable(timetableId);
      console.log('Timetable approved:', response);
      // Refresh the choices
      await getTimetableChoices();
    } catch (err) {
      setError(err.message);
      console.error('Failed to approve timetable:', err);
    } finally {
      setLoading(false);
    }
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <h2>Login to Schedulr</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <label>Email:</label>
            <input
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Password:</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '10px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </div>
    );
  }

  // If authenticated, show dashboard
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Welcome to Schedulr, {user?.name}!</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
          Logout
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Timetable Management</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={generateTimetable} 
            disabled={loading}
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            {loading ? 'Generating...' : 'Generate New Timetables'}
          </button>
          <button 
            onClick={getTimetableChoices} 
            disabled={loading}
            style={{ padding: '10px 20px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            {loading ? 'Loading...' : 'Get Existing Choices'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px', padding: '10px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      {timetables.length > 0 && (
        <div>
          <h3>Generated Timetables ({timetables.length} choices)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {timetables.map((timetable, index) => (
              <div key={timetable.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
                <h4>{timetable.name}</h4>
                <p><strong>ID:</strong> {timetable.id}</p>
                <p><strong>Total Classes:</strong> {timetable.slots?.length || 0}</p>
                
                {timetable.slots && timetable.slots.length > 0 && (
                  <div>
                    <h5>Sample Classes:</h5>
                    <ul style={{ fontSize: '14px', maxHeight: '150px', overflowY: 'auto' }}>
                      {timetable.slots.slice(0, 5).map((slot, slotIndex) => (
                        <li key={slotIndex}>
                          Day {slot.day}, Slot {slot.slot}: {slot.courseCode} ({slot.batch}) - {slot.roomName}
                        </li>
                      ))}
                      {timetable.slots.length > 5 && <li>... and {timetable.slots.length - 5} more classes</li>}
                    </ul>
                  </div>
                )}
                
                <button 
                  onClick={() => approveTimetable(timetable.id)}
                  disabled={loading}
                  style={{ 
                    marginTop: '10px', 
                    padding: '8px 16px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  Approve This Timetable
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {timetables.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>No timetables generated yet. Click "Generate New Timetables" to create some!</p>
        </div>
      )}
    </div>
  );
};

export default SchedulrDashboard;
