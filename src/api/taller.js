import axios from "axios"

const API_URL = 'http://localhost:3000/citas';

// Obtener todas las citas
export async function getCitasTaller() {
  const res = await axios.get(API_URL)
  return res.data
}

// Añadir cita
export async function addCitaTaller(cita) {
  const res = await axios.post(API_URL, cita)
  return res.data
}

// Actualizar cita
export async function updateCitaTaller(id, cita) {
  const res = await axios.put(`${API_URL}/${id}`, cita)
  return res.data
}

// Eliminar cita
export async function deleteCitaTaller(id) {
  await axios.delete(`${API_URL}/${id}`)
}
