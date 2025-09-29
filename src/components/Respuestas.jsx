import React, { useEffect, useState } from "react";
import API from "../../api"; // importa tu instancia axios

export default function Respuestas({ usuario }) {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});

  // Cargar preguntas desde la API
  const cargarPreguntas = async () => {
    try {
      const { data } = await API.get("/Preguntas");
      setPreguntas(data);
    } catch (err) {
      console.error("Error cargando preguntas:", err);
      alert("Error al cargar preguntas.");
    }
  };

  // Guardar respuesta enviando el objeto completo según Swagger
  const guardarRespuesta = async (pregunta) => {
    try {
      const actualizado = {
        ...pregunta,
        respuestas: respuestas[pregunta.id] || "",
      };

      await API.put(`/Preguntas/${pregunta.id}/respuesta`, actualizado);

      alert("Respuesta guardada!");
      setRespuestas((prev) => ({ ...prev, [pregunta.id]: "" }));
      cargarPreguntas();
    } catch (err) {
      console.error("Error guardando respuesta:", err);
      alert("Ocurrió un error al guardar la respuesta.");
    }
  };

  useEffect(() => {
    cargarPreguntas();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
        Responder Preguntas
      </h1>
      <div className="space-y-4 max-w-4xl mx-auto">
        {preguntas.map((p) => (
          <div key={p.id} className="border p-4 rounded-lg bg-white shadow">
            <p className="font-semibold text-gray-800">{p.titulo}</p>
            <p className="text-sm text-gray-500">
              Preguntado por: {p.nombre} ({p.sexo})
            </p>

            <textarea
              placeholder="Escribe tu respuesta..."
              value={respuestas[p.id] || ""}
              onChange={(e) =>
                setRespuestas((prev) => ({ ...prev, [p.id]: e.target.value }))
              }
              className="w-full mt-2 border rounded-lg p-2"
            />

            <button
              onClick={() => guardarRespuesta(p)}
              className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
            >
              Responder
            </button>

            {p.respuestas && (
              <p className="mt-2 text-green-700 font-medium">
                Respuesta: {p.respuestas}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
