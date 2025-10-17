import axios from 'axios'

const API_URL = 'http://localhost:3000/clientes'

// Obtener lista de clientes desde la API
export const getClientes = (mostrarHistorico) => {
    let url = `${API_URL}?_sort=apellidos&_order=asc`;

    if (!mostrarHistorico) {
    // Solo clientes con histórico = true
    url += `&historico=true`;
    }
    else {
        // Todos los clientes, sin filtrar por histórico
        url += ``;
    } 

    return axios.get(url)
        .then(res => res.data);
}

// Buscar cliente por DNI
    export const getClientePorDni = async (dni) => {
    try {
    const response = await axios.get(`${API_URL}?dni=${dni}`);
    return response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
    console.error('Error buscando cliente por DNI:', error);
    throw error;
    }
};

export const addCliente = (nuevoCliente) => {
    return axios.post(API_URL, nuevoCliente)
        .then(res => res.data)
}

export const updateCliente = (id, clienteActualizado) => {
    return axios.put(`${API_URL}/${id}`, clienteActualizado)
        .then(res => res.data)
}
// Eliminar cliente (poniendo el histórico a false, no con axios.delete)
export const deleteCliente = (id) => {
    return axios.patch(`${API_URL}/${id}`, {historico: false})
        .then(res => res.data)
}
