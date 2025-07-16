import React, { useState, useEffect } from 'react';
import Login from './Login';
import MovieGallery from './MovieGallery';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('refresh');
  };

  return (
    <div className="App">
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <MovieGallery token={token} logout={logout} />
      )}
    </div>
  );
}

export default App;
