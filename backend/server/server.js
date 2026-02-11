import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';

import articulosRoutes from "./articulosRoutes.js";
import authRoutes from './authRoutes.js';
import contactoRoutes from './contactoRoutes.js';
import facturaRoutes from "./facturaRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bbdd';
const STRIPE = new Stripe(process.env.STRIPE_SECRET_KEY);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/articulos", articulosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacto', contactoRoutes);
app.use("/api/facturas", facturaRoutes);

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server Express is running on port ${PORT}`);
});

// Ruta para crear el pago
app.post('/crear-checkout-session', async (req, res) => {
    try {
        const { items } = req.body;

        const lineItems = items.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.nombre,
                },
                unit_amount: Math.round(item.precio * 100),
            },
            quantity: item.cantidad,
        }));

        const session = await STRIPE.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Error creando checkout session: ", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})