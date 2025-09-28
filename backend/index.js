const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise"); // Usamos mysql2 con promesas

const app = express();

app.use(cors());
app.use(express.json());

// Configuración de conexión MySQL
const pool = mysql.createPool({
  host: "localhost",   // Servidor MySQL
  user: "root",          // Tu usuario MySQL (cambia si es otro)
  password: "mmujer$00p",
  database: "EPARTICIPATION",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// GET: obtener todas las preguntas
app.get("/preguntas", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT Id AS id, Titulo AS titulo, Sexo AS sexo, Nombre AS nombre, Respuestas AS respuestas
      FROM Preguntas
      ORDER BY Id DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error GET /preguntas:", err);
    res.status(500).json({ error: "Error al obtener preguntas" });
  }
});

// POST: crear nueva pregunta
app.post("/preguntas", async (req, res) => {
  const { titulo, nombre, sexo, respuestas } = req.body;
  try {
    await pool.query(
      "INSERT INTO Preguntas (Titulo, Nombre, Sexo, Respuestas) VALUES (?, ?, ?, ?)",
      [titulo, nombre, sexo, respuestas]
    );
    res.json({ message: "Pregunta guardada" });
  } catch (err) {
    console.error("Error POST /preguntas:", err);
    res.status(500).json({ error: "Error al guardar pregunta" });
  }
});

// PUT: actualizar respuesta
app.put("/preguntas/:id/respuesta", async (req, res) => {
  const { id } = req.params;
  const { respuestas, usuario } = req.body;
  try {
    await pool.query(
      "UPDATE Preguntas SET Respuestas = ?, Nombre = ? WHERE Id = ?",
      [respuestas, usuario, id]
    );
    res.json({ message: "Respuesta guardada" });
  } catch (err) {
    console.error("Error PUT /preguntas/:id/respuesta:", err);
    res.status(500).json({ error: "Error al guardar respuesta" });
  }
});

// Iniciar servidor
app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));
