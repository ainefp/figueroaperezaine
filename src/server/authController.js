import axios from 'axios';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { dni, password } = req.body;

    try {
        const response = await axios.get(`https://localhost:3000/clientes?dni=${dni}`);
        const user = response.data[0];

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const ok = await bycrypt.compare(password, user.password);
        if (!ok) return res.status(400).json({ message: 'Usuario o Contraseña incorrecta' });

        const token = jwt.sign(
            { dni: user.dni, tipo: user.tipo || 'user' },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ 
            token,
            nombre: user.nombre,
            apellido: user.apellido,
            tipo: user.tipo || 'user'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}