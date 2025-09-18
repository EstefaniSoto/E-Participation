const express = require("express");
const cors = require("cors");
const sql = require("mssql");

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de conexión SQL
const config = {
  user: "sa",
  password: "mmujer$00p",
  server: "192.168.1.7",
  database: "EPARTICIPATION",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// GET: obtener todas las preguntas
app.get("/preguntas", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT Id AS id, Titulo AS titulo, Sexo AS sexo, Nombre AS nombre, Respuestas AS respuestas
      FROM Preguntas
      ORDER BY Id DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("Error GET /preguntas:", err);
    res.status(500).json({ error: "Error al obtener preguntas" });
  }
});

// POST: crear nueva pregunta
app.post("/preguntas", async (req, res) => {
  const { titulo, nombre, sexo, respuestas } = req.body;
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input("Titulo", sql.NVarChar, titulo)
      .input("Nombre", sql.NVarChar, nombre)
      .input("Sexo", sql.NVarChar, sexo)
      .input("Respuestas", sql.NVarChar, respuestas)
      .query("INSERT INTO Preguntas (Titulo, Nombre, Sexo, respuestas) VALUES (@Titulo, @Nombre, @Sexo, @Respuestas)");
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
    const pool = await sql.connect(config);
    await pool.request()
      .input("id", sql.Int, parseInt(id))
      .input("respuestas", sql.NVarChar, respuestas)
      .input("usuario", sql.NVarChar, usuario)
      .query("UPDATE Preguntas SET respuestas = @respuestas, nombre = @usuario WHERE Id = @id");
    res.json({ message: "Respuesta guardada" });
  } catch (err) {
    console.error("Error PUT /preguntas/:id/respuesta:", err);
    res.status(500).json({ error: "Error al guardar respuesta" });
  }
});

// Iniciar servidor
app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));
