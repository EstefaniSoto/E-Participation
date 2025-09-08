import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  // Preguntas iniciales
  const iniciales = [
   {
          id: 1,
          titulo:
            "¿Cuáles son los principales programas y servicios que el Ministerio de la Mujer ofrece para ayudar a mujeres que son víctimas de violencia de género? ¿Cómo se puede acceder a ellos de forma rápida y segura?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 2,
          titulo:
            "¿Qué acciones concretas está tomando el Ministerio para prevenir la violencia intrafamiliar y los feminicidios, que siguen siendo un problema grave en el país?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 3,
          titulo:
            "¿Existen programas de apoyo económico o capacitación laboral dirigidos a mujeres de escasos recursos, especialmente a madres solteras, para que logren su independencia financiera? Si es así, ¿cuáles son los requisitos?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 4,
          titulo:
            "¿Cómo está colaborando el Ministerio con otras instituciones, como el Ministerio de Educación y el Ministerio de Salud Pública, para implementar programas de educación sexual y reproductiva en escuelas y comunidades?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 5,
          titulo:
            "¿Qué iniciativas se están desarrollando para promover la igualdad salarial y la participación de la mujer en roles de liderazgo en el sector público y privado?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 6,
          titulo:
            "¿De qué manera el Ministerio está abordando la problemática del embarazo adolescente y qué planes tiene para reducir las altas tasas que se registran en el país?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 7,
          titulo:
            "¿Hay programas de asistencia legal y psicológica gratuitos para mujeres que necesitan asesoramiento en casos de divorcio, pensión alimenticia o custodias? ¿Cómo se solicitan?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 8,
          titulo:
            "¿Qué acciones está tomando el Ministerio para proteger y apoyar a grupos vulnerables de mujeres, como las migrantes, las mujeres con discapacidad o las de la comunidad LGTBIQ+?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 9,
          titulo:
            "¿Cómo se fiscaliza el uso de los fondos asignados al Ministerio para asegurar que los programas lleguen realmente a las mujeres que más los necesitan en todo el país, incluyendo las zonas rurales y fronterizas?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 10,
          titulo:
            "¿Cómo pueden los ciudadanos, organizaciones de la sociedad civil y el sector privado colaborar activamente con el Ministerio de la Mujer en sus diferentes proyectos y campañas?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 11,
          titulo:
            "¿Cómo puede el Ministerio de la Mujer colaborar con los hombres para prevenir la violencia de género y los feminicidios? ¿Hay programas o campañas dirigidas a nosotros para que seamos parte de la solución?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Hombre",
        },
        {
          id: 12,
          titulo:
            "Si una mujer de mi familia (madre, hermana, hija) sufre de violencia, ¿a qué servicios de ayuda, como apoyo psicológico o asistencia legal, puede acceder a través del Ministerio?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Hombre",
        },
        {
          id: 13,
          titulo:
            "¿Qué recursos ofrece el Ministerio a las familias en general para promover relaciones sanas y equitativas en el hogar?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 14,
          titulo:
            "¿Qué apoyo brinda el Ministerio de la Mujer a mujeres que son emprendedoras o dueñas de pequeños negocios? ¿Qué impacto tiene ese apoyo en la economía familiar y en la sociedad?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 15,
          titulo:
            "¿De qué manera el Ministerio está trabajando para eliminar la desigualdad salarial y fomentar que más mujeres ocupen puestos de liderazgo en las empresas y el gobierno?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 16,
          titulo:
            "¿Existen programas de educación o charlas para que los jóvenes entiendan la importancia de la equidad de género desde temprano?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 17,
          titulo:
            "¿Cómo está el Ministerio de la Mujer lidiando con el problema del embarazo adolescente en el país, y cómo puede ayudar a las familias a enfrentar esa situación?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 18,
          titulo:
            "¿Qué tan accesible es el Ministerio en las zonas rurales y qué servicios específicos tiene para las mujeres del campo?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
        {
          id: 19,
          titulo:
            "¿Cómo pueden los hombres participar o colaborar como voluntarios en las iniciativas del Ministerio?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Hombre",
        },
        {
          id: 20,
          titulo:
            "¿De qué forma el Ministerio de la Mujer aborda la equidad para todas las mujeres, incluyendo a aquellas de comunidades marginadas o que tienen discapacidades?",
          respuesta: "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
          abierta: false,
          nombre: "Usuario inicial",
          sexo: "Mujer",
        },
  ];

  // Cargar preguntas desde localStorage o iniciales
  useEffect(() => {
    const guardadas = localStorage.getItem("preguntas");
    if (guardadas) {
      const parsed = JSON.parse(guardadas);
      if (parsed.length > 0) {
        setPreguntas(parsed);
      } else {
        setPreguntas(iniciales);
        localStorage.setItem("preguntas", JSON.stringify(iniciales));
      }
    } else {
      setPreguntas(iniciales);
      localStorage.setItem("preguntas", JSON.stringify(iniciales));
    }
  }, []);

  // Guardar preguntas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("preguntas", JSON.stringify(preguntas));
  }, [preguntas]);

  const togglePregunta = (id) => {
    setPreguntas(
      preguntas.map((p) =>
        p.id === id ? { ...p, abierta: !p.abierta } : p
      )
    );
  };

  const guardarPregunta = () => {
    if (!tituloPregunta.trim() || !nombre.trim() || !sexo) return;

    const nueva = {
      id: Date.now(),
      titulo: tituloPregunta,
      respuesta:
        "Tu pregunta ha sido registrada. Un administrador podrá responderla pronto.",
      abierta: false,
      nombre,
      sexo,
    };

    setPreguntas([nueva, ...preguntas]);
    setTituloPregunta("");
    setNombre("");
    setSexo("");
    setMostrarModal(false);
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
  let filtradas = preguntas.filter((p) =>
    p.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Vista de últimas 10 o todas
  if (modoVista === "ultimas") {
    filtradas = filtradas.slice(0, 10);
  }

  return (
    <div className="min-h-screen p-6">
      {/* Botones */}
      <div className="flex flex-col md:flex-row gap-3 justify-center mb-6 bg-white py-3 rounded-2xl border-2 border-gray-200">
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 flex gap-2 items-center"
        >
          <img src="./img/add.png" alt="" className="w-5 h-5" />{" "}
          <p className=" font-bold">Añadir pregunta</p>
        </button>
        <button
          onClick={generarPDF}
          className="bg-red-700 py-2 px-3 rounded-lg hover:bg-red-800"
        >
          <img src="./img/archivo-pdf.png" alt="" width={20} />
        </button>
        <input
          type="text"
          placeholder="Buscar pregunta..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-2xl border-gray-300"
        />

        <button
          onClick={() => setModoVista("ultimas")}
          className={`px-4 py-2 rounded-lg font-bold ${
            modoVista === "ultimas"
              ? "bg-red-700 text-white"
              : "bg-red-300 text-white"
          }`}
        >
          Últimas 10 preguntas
        </button>

        <button
          onClick={() => setModoVista("todas")}
          className={`px-4 py-2 rounded-lg font-bold ${
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
            <h2 className="text-lg font-bold mb-4">Nueva Pregunta</h2>
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
              <span className="text-xl">
                {p.abierta ? (
                  <img src="./img/close.png" width={10} />
                ) : (
                  <img src="./img/add_edit.png" width={10} />
                )}
              </span>
            </div>
            {p.abierta && (
              <div className="px-4 pb-3 text-gray-600">
                {p.respuesta}
                <p className="text-sm text-gray-500 mt-2">
                  Preguntado por: <b>{p.nombre}</b> ({p.sexo})
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Gráfica */}
      <div id="grafica" className="max-w-sm mx-auto mt-10">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default Preguntas;
