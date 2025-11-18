// server/articulosRoutes.js
import express from "express";
import Articulo from  "../modelos/Articulo.js";

const router = express.Router();
console.log("Router articulos cargado"); // para depurar

// Definir rutas
router.get("/", async (req, res) => {
  const articulos = await Articulo.find();
  res.json(articulos);
});

router.post("/", async (req, res) => {
  try {
    const articulo = new Articulo(req.body);
    const guardado = await articulo.save();
    res.json(guardado);
  } catch (err) {
    res.status(500).json({ error: "Error al guardar artículo" });
  }
});

// otras rutas PUT, DELETE, GET /:id igual

export default router;
