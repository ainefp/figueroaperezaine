import axios from 'axios';

export const loginUsuario = async (dni, password, tipo) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      dni,
      password,
      tipo
    });
    return response.data;
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    throw error;
  }
};