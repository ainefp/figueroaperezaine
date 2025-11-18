import axios from "axios";

const API_URL = "http://localhost:5000/api/articulos";

// Obtener todos los artículos
export async function getArticulos() {
  const res = await axios.get(API_URL);
  return res.data;
}

// Obtener artículo por ID
export async function getArticuloById(id) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}

// Crear artículo
export async function addArticulo(articulo) {
  const res = await axios.post(API_URL, articulo);
  return res.data;
}

// Actualizar artículo
export async function updateArticulo(id, articulo) {
  const res = await axios.put(`${API_URL}/${id}`, articulo);
  return res.data;
}

// Eliminar artículo
export async function deleteArticulo(id) {
  await axios.delete(`${API_URL}/${id}`);
}
