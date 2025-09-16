const express = require("express");
const cors = require("cors");
const sql = require("mssql");

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de conexión
const config = {
  user: "sa", // tu usuario SQL Server
  password: "mmujer$00p", // tu contraseña
  server: "192.168.1.7", // tu servidor
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
      SELECT 
        Id AS id,
        Titulo AS titulo,
        Sexo AS sexo,
        Nombre AS nombre
      FROM Preguntas
      ORDER BY Id DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("Error en GET /preguntas:", err);
    res.status(500).json({ error: "Error al obtener preguntas" });
  }
});

// POST: insertar una nueva pregunta
app.post("/preguntas", async (req, res) => {
  const { titulo, sexo, nombre } = req.body;
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input("Titulo", sql.NVarChar, titulo)
      .input("Sexo", sql.NVarChar, sexo)
      .input("Nombre", sql.NVarChar, nombre)
      .query("INSERT INTO Preguntas (Titulo, Sexo, Nombre) VALUES (@Titulo, @Sexo, @Nombre)");

    res.json({ message: "Pregunta agregada correctamente" });
  } catch (err) {
    console.error("Error en POST /preguntas:", err);
    res.status(500).json({ error: "Error al agregar pregunta" });
  }
});

// Iniciar servidor
app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));
