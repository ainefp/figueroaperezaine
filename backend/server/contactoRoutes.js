import dotenv from 'dotenv';
import express from 'express';
import { Resend } from 'resend';

dotenv.config();
const router = express.Router();
console.log('Resend API Key:', process.env.RESEND_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
    const { nombre, email, asunto, mensaje } = req.body;

    try {
        const response = await resend.emails.send({
            from: 'Contacto <onboarding@resend.dev>',
            to: 'aine.xena.100@gmail.com',
            subject: asunto || `Nuevo mensaje de: ${nombre}`,
            html: `
                <h1>Nuevo mensaje desde el formulario</h1>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Asunto:</strong> ${asunto}</p>
                <p><strong>Mensaje:</strong> ${mensaje}</p>
            `
        });

        res.json({ ok: true, id: response.id });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ ok: false, error: 'Error al enviar el correo' });
    }
});

export default router;
