import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { refreshToken } from './refreshToken';

function MovieGallery({ token, logout, setToken }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async (currentToken) => {
      try {
        const response = await axios.get('http://localhost:8000/api/movies/', {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });
        setMovies(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          const newToken = await refreshToken(setToken);
          if (newToken) {
            fetchMovies(newToken);
          } else {
            setError('Tu sesión expiró. Inicia sesión de nuevo.');
          }
        } else {
          setError('No se pudieron cargar las películas.');
        }
      }
    };

    fetchMovies(token);
  }, [token, logout, setToken]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="gallery">
      <button onClick={logout} className="logout-button">
        Cerrar sesión
      </button>

      {movies.map((movie) => (
        <div className="card" key={movie.id}>
          <h3>{movie.title}</h3>
          <p><strong>Género:</strong> {movie.genre}</p>
          <p><strong>Duración:</strong> {movie.duration} min</p>
          <p><strong>Calificación:</strong> {movie.rating}/10</p>
          <p>{movie.synopsis}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieGallery;
