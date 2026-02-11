import mongoose from 'mongoose';

const FacturaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  productos: [
    {
      productoId: String,
      nombre: String,
      cantidad: Number,
      precio_unitario: Number,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Factura", FacturaSchema);
