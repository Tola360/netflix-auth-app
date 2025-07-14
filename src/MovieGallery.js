import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function MovieGallery({ token }) {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/movies/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMovies(response.data);
            } catch (err) {
                console.error('Error al cargar películas:', err);
                setError('No se pudieron cargar las películas.');
            }
        };

        fetchMovies();
    }, [token]);

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="gallery">
            {movies.map(movie => (
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
