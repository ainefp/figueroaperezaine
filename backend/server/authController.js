import axios from 'axios';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { dni, password } = req.body;

    try {
        const response = await axios.get(`http://localhost:3000/clientes?dni=${dni}`);
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

/////////////// MEJOR EN UN FICHERO APARTE authMiddleware.js

// Middleware: verificar JWT
// Se usa en rutas que requieren autenticación
// Verifica el token enviado en el header Authorization

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Authorization: Bearer <token>
  if (!authHeader) return res.status(401).json({ mensaje: "Token no recibido" });

  const token = authHeader.split(" ")[1]; // separar "Bearer" del token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guardar info del usuario en req
    next(); // continuar al controlador
  } catch (err) {
    return res.status(403).json({ mensaje: "Token inválido" });
  }
};


/// TAMBIEN EN EL FICHERO APARTE authMiddleware.js
// Middleware: solo admin
export const soloAdmin = (req, res, next) => {
  if (req.user?.tipo !== "admin") {
    return res.status(403).json({ mensaje: "Acceso solo para administradores" });
  }
  next();
};