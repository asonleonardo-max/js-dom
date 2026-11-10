// server.js
import express from "express";

const app = express();
app.use(express.json());

let productos = [
  { id: 1, nombre: "Teclado", precio: 80000, stock: 10 },
  { id: 2, nombre: "Mouse", precio: 35000, stock: 25 },
];
let siguienteId = 3;

// Validadores
const nombreValido = (n) => typeof n === "string" && n.trim() !== "";
const precioValido = (p) => typeof p === "number" && !isNaN(p) && p >= 0;
const stockValido = (s) => Number.isInteger(s) && s >= 0;

// 1. GET /productos -> 200
app.get("/productos", (req, res) => {
  res.status(200).json(productos);
});

// 2. GET /productos/:id -> 200 | 404
app.get("/productos/:id", (req, res) => {
  const producto = productos.find((p) => p.id === Number(req.params.id));
  if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
  res.status(200).json(producto);
});

// 3. POST /productos -> 201 | 400
app.post("/productos", (req, res) => {
  const { nombre, precio, stock } = req.body ?? {};
  if (!nombreValido(nombre) || !precioValido(precio) || !stockValido(stock)) {
    return res.status(400).json({ error: "Faltan datos o no son válidos (nombre, precio, stock)" });
  }
  const nuevo = { id: siguienteId++, nombre: nombre.trim(), precio, stock };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

// 4. PUT /productos/:id -> 200 | 400 | 404 (reemplaza todos los campos)
app.put("/productos/:id", (req, res) => {
  const producto = productos.find((p) => p.id === Number(req.params.id));
  if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

  const { nombre, precio, stock } = req.body ?? {};
  if (!nombreValido(nombre) || !precioValido(precio) || !stockValido(stock)) {
    return res.status(400).json({ error: "PUT requiere nombre, precio y stock válidos" });
  }
  producto.nombre = nombre.trim();
  producto.precio = precio;
  producto.stock = stock;
  res.status(200).json(producto);
});

// 5. PATCH /productos/:id -> 200 | 400 | 404 (solo algunos campos)
app.patch("/productos/:id", (req, res) => {
  const producto = productos.find((p) => p.id === Number(req.params.id));
  if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

  const { nombre, precio, stock } = req.body ?? {};
  if (nombre === undefined && precio === undefined && stock === undefined) {
    return res.status(400).json({ error: "Envía al menos un campo" });
  }
  if (nombre !== undefined && !nombreValido(nombre)) {
    return res.status(400).json({ error: "Nombre inválido" });
  }
  if (precio !== undefined && !precioValido(precio)) {
    return res.status(400).json({ error: "Precio inválido" });
  }
  if (stock !== undefined && !stockValido(stock)) {
    return res.status(400).json({ error: "Stock inválido" });
  }
  if (nombre !== undefined) producto.nombre = nombre.trim();
  if (precio !== undefined) producto.precio = precio;
  if (stock !== undefined) producto.stock = stock;
  res.status(200).json(producto);
});

// 6. DELETE /productos/:id -> 204 | 404
app.delete("/productos/:id", (req, res) => {
  const indice = productos.findIndex((p) => p.id === Number(req.params.id));
  if (indice === -1) return res.status(404).json({ error: "Producto no encontrado" });
  productos.splice(indice, 1);
  res.status(204).send(); // sin body
});

app.listen(3000, () => console.log("Servidor listo"));