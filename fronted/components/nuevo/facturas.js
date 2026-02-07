import axios from "axios";
const API_URL = "http://localhost:5000/api/facturas";
export async function addFactura(factura) {
  try {
    const response = await axios.post(API_URL, factura);
    return response.data;
  } catch (error) {
    console.error("Error al enviar factura:", error);
    throw error;
  }
}
