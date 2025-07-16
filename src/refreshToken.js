// src/refreshToken.js
import axios from 'axios';

export const refreshToken = async (setToken) => {
  try {
    const refresh = localStorage.getItem('refresh');
    const response = await axios.post('http://localhost:8000/api/token/refresh/', {
      refresh: refresh,
    });
    const newAccessToken = response.data.access;
    setToken(newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Error al refrescar token', error);
    setToken(null);
    return null;
  }
};
