import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
import articulosRoutes from "./articulosRoutes.js"; // ruta al router backend
import authRoutes from './authRoutes.js';
import contactoRoutes from './contactoRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bbdd';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions)); // <-- Aquí, antes de cualquier ruta o middleware

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/articulos", articulosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacto', contactoRoutes);

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server Express is running on port ${PORT}`);
});

// Config de Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Ruta para crear el pago
// Placeholder: crear-checkout-session (implementar cuando se necesite)
app.post('/crear-checkout-session', async (req, res) => {
    try {
        // TODO: implementar flujo de pago con Stripe
        return res.status(501).json({ message: 'Not implemented' });
    } catch (err) {
        console.error('Stripe checkout error:', err);
        return res.status(500).json({ message: 'Error creando la sesión de pago' });
    }
});