import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import API from "../../api"; 

ChartJS.register(ArcElement, Tooltip, Legend);

const Preguntas = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoVista, setModoVista] = useState("todas");

  // Campos del modal
  const [nombre, setNombre] = useState("");
  const [sexo, setSexo] = useState("");
  const [tituloPregunta, setTituloPregunta] = useState("");

  // Cargar preguntas desde el backend
  const cargarPreguntas = async () => {
    try {
      const res = await API.get("/Preguntas");
      const data = res.data;

      const normalizadas = data.map((p) => ({
        id: p.id,
        titulo: p.titulo || "Pregunta sin título",
        respuestas: p.respuestas ? p.respuestas : null,
        abierta: false,
        nombre: p.nombre || "Usuario",
        sexo: p.sexo || "Mujer",
      }));

      setPreguntas(normalizadas);
    } catch (err) {
      console.error("Error cargando preguntas:", err);
    }
  };

  useEffect(() => {
    cargarPreguntas();
  }, []);

  // Alternar visibilidad de respuesta
  const togglePregunta = (id) => {
    setPreguntas((prev) =>
      prev.map((p) => (p.id === id ? { ...p, abierta: !p.abierta } : p))
    );
  };

  // Guardar nueva pregunta
const guardarPregunta = async () => {
  // Validar campos obligatorios
  if (!tituloPregunta.trim() || !nombre.trim() || !sexo) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor, completa todos los campos antes de enviar tu pregunta.",
      confirmButtonColor: "#6a1b9a",
    });
    return;
  }

  const nueva = { titulo: tituloPregunta, sexo, nombre };

  try {
    await API.post("/Preguntas", nueva);
    await cargarPreguntas();

    Swal.fire({
      title: "¡Pregunta registrada!",
      text: "Tu pregunta ha sido enviada correctamente.",
      icon: "success",
      confirmButtonColor: "#6a1b9a",
    });

    // Limpiar modal y campos
    setTituloPregunta("");
    setNombre("");
    setSexo("");
    setMostrarModal(false);
  } catch (err) {
    console.error("Error al guardar la pregunta:", err);

    Swal.fire({
      icon: "error",
      title: "Error al enviar",
      text: "Hubo un problema al registrar tu pregunta. Intenta nuevamente.",
      confirmButtonColor: "#d33",
    });
  }
};


  // Conteo para gráfica
  const hombres = preguntas.filter((p) => p.sexo === "Hombre").length;
  const mujeres = preguntas.filter((p) => p.sexo === "Mujer").length;

  const data = {
    labels: ["Hombres", "Mujeres"],
    datasets: [
      {
        data: [hombres, mujeres],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const generarPDF = () => {
    const input = document.getElementById("grafica");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.text("Gráfica de Preguntas por Sexo", 10, 10);
      pdf.addImage(imgData, "PNG", 10, 20, 180, 160);
      pdf.save("grafica_preguntas.pdf");
    });
  };

  // Filtro de búsqueda
  let filtradas = preguntas.filter(
    (p) => p.titulo && p.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (modoVista === "ultimas") {
    filtradas = filtradas.slice(0, 10);
  }

  return (
    <div className="min-h-screen px-6 lg:py-6">
      {/* Botones */}
      <div className="flex flex-row gap-3 justify-center mb-6 bg-white py-3 rounded-2xl lg:border-2 border-gray-200">
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-blue-700 text-white px-3 py-3 lg:py-2 lg:px-4 rounded-full lg:rounded-lg shadow hover:bg-blue-700 flex gap-2 items-center"
        >
          <img src="./img/add.png" alt="" className="w-6 h-5 md:w-5 md:h-5" />
          <p className="font-bold hidden lg:flex">Añadir pregunta</p>
        </button>
        <button
          onClick={generarPDF}
          className="bg-red-700 py-2 px-3 rounded-lg hover:bg-red-800 hidden lg:flex"
        >
          <img src="./img/archivo-pdf.png" alt="" width={20} />
        </button>
        <input
          type="text"
          placeholder="Buscar pregunta..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border-2 border-blue-500 px-4 py-2 rounded-full w-full md:w-2xl "
        />

        <button
          onClick={() => setModoVista("ultimas")}
          className={`px-4 py-2 rounded-lg font-bold hidden lg:flex ${
            modoVista === "ultimas"
              ? "bg-red-700 text-white"
              : "bg-red-300 text-white"
          }`}
        >
          Últimas 10 preguntas
        </button>

        <button
          onClick={() => setModoVista("todas")}
          className={`px-4 py-2 rounded-lg font-bold hidden lg:flex ${
            modoVista === "todas"
              ? "bg-blue-700 text-white"
              : "bg-blue-300 text-white"
          }`}
        >
          Todas las preguntas
        </button>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-center text-gray-800">Nueva Pregunta</h2>
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border px-3 py-2 rounded-lg w-full mb-3"
            />
            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className="border px-3 py-2 rounded-lg w-full mb-3"
            >
              <option value="">Selecciona tu sexo</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>
            <input
              type="text"
              placeholder="Escribe tu pregunta..."
              value={tituloPregunta}
              onChange={(e) => setTituloPregunta(e.target.value)}
              className="border px-3 py-2 rounded-lg w-full mb-3"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={guardarPregunta}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Listado */}
<div className="max-w-6xl mx-auto space-y-4">
  {filtradas.map((p) => (
    <div
      key={p.id}
      className="border-2 border-gray-400 rounded-lg bg-white shadow-sm overflow-hidden"
    >
      <div
        className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-100"
        onClick={() => togglePregunta(p.id)}
      >
        <span className="font-medium text-gray-800">{p.titulo}</span>
        <img
          src={p.abierta ? "./img/close.png" : "./img/add_edit.png"}
          alt={p.abierta ? "cerrar" : "abrir"}
          className="w-3 h-3 object-contain transition-all duration-200 ml-5"
        />
      </div>

      {p.abierta && (
        <div className="px-4 pb-3 text-gray-600">
          {p.respuestas ? (
            <p className="text-green-700 font-medium">{p.respuestas}</p>
          ) : (
            <p className="text-gray-500">
              Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Preguntado por: <b>{p.nombre}</b> ({p.sexo})
          </p>
        </div>
      )}
    </div>
  ))}
</div>

      {/* Gráfica */}
      <div id="grafica" className="max-w-sm mx-auto mt-10 hidden lg:flex">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default Preguntas;
