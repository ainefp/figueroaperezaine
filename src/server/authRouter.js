import { login, soloAdmin, verificarToken } from './authController.js';
import express from 'express';

const router = express.Router();

router.post('/login', login);

router.get('/cientes', verificarToken, soloAdmin, (req, res) => {
    res.json({ message: `Hola ${req.user.dni}, estás autenticado` });
});

router.get('/modelos', verificarToken, soloAdmin, (req, res) => {
    res.json({ message: `Hola ${req.user.dni}, estás autenticado` });
});

router.get('/taller', verificarToken, soloAdmin, (req, res) => {
    res.json({ message: `Hola ${req.user.dni}, estás autenticado` });
});

router.get('/ventas', verificarToken, (req, res) => {
    res.json({ message: `Hola ${req.user.dni}, estás autenticado` });
});

router.get('/noticias', verificarToken, soloAdmin, (req, res) => {
    res.json({ message: `Hola ${req.user.dni}, estás autenticado` });
});

router.get('/check-admin', verificarToken, (req, res) => {
    res.json({ admin: req.user?.tipo === 'admin' });
});

export default router;