import axios from 'axios';

const API_URL = 'http://localhost:3000/citas';

export const getCitas = () => {
    return axios.get(API_URL).then(res => res.data);
}

export const addCita = (nuevaCita) => {
    return axios.post(API_URL, nuevaCita).then(res => res.data);
}

export const deleteCita = (id) => {
    return axios.delete(`${API_URL}/${id}`).then(res => res.data);
}

export const updateCita = (id, citaActualizada) => {
    return axios.put(`${API_URL}/${id}`, citaActualizada)
        .then(res => res.data)
};