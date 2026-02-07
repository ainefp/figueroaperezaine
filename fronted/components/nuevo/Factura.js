import mongoose from 'mongoose';

const facturaSchema = new mongoose.Schema({
    numeroFactura: {
        type: String,
        required: true,
        unique: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    cliente: {
        nombre: { type: String, required: true },
        dni: String,
        direccion: String,
        email: String,
        telefono: String
    },
    items: [{
        id: String,
        matricula: String,
        marca: String,
        modelo: String,
        anio: Number,
        kilometros: Number,
        precio: Number,
        cantidad: Number
    }],
    subtotal: {
        type: Number,
        required: true
    },
    iva: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    estadoPago: {
        type: String,
        enum: ['pendiente', 'pagado', 'cancelado'],
        default: 'pagado'
    },
    metodoPago: {
        type: String,
        enum: ['efectivo', 'tarjeta', 'transferencia'],
        default: 'efectivo'
    }
}, {
    timestamps: true
});

const Factura = mongoose.model('Factura', facturaSchema);

export default Factura;
