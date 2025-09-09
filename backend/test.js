const sql = require("mssql");

const config = {
  user: "estefani",
  password: "nenita02",
  server: "PC_ESTEFANI_ST",
  database: "MinisterioMujerDB",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const test = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Conexión exitosa a SQL Server");

    // Leer preguntas
    const result = await pool.request().query("SELECT TOP 5 * FROM Preguntas");
    console.log("Preguntas en DB:", result.recordset);

    // Insertar prueba
    const nombre = "TestUser";
    const sexo = "Mujer";
    const titulo = "Pregunta de prueba desde Node";
    await pool.request()
      .input("Nombre", sql.NVarChar, nombre)
      .input("Sexo", sql.NVarChar, sexo)
      .input("Titulo", sql.NVarChar, titulo)
      .query("INSERT INTO Preguntas (Nombre, Sexo, Titulo) VALUES (@Nombre, @Sexo, @Titulo)");

    console.log("Pregunta insertada correctamente");
  } catch (err) {
    console.error("Error en test.js:", err);
  } finally {
    sql.close();
  }
};

test();
