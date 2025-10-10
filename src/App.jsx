import './App.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Preguntas from './components/Preguntas'
import Login from './components/Login'
import Respuestas from './components/Respuestas'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <Header />

      <Routes>
        {/* Página principal */}
        <Route path="/" element={
          <>
            <Navbar />
            <Preguntas />
          </>
        } />

        {/* Login */}
        <Route path="/login" element={<Login setUsuario={setUsuario} />} />

        {/* Respuestas: solo accesible si usuario existe */}
        <Route
          path="/respuestas"
          element={usuario ? <Respuestas usuario={usuario} /> : <Login setUsuario={setUsuario} />}
        />
      </Routes>
      <Footer></Footer>
    </Router>
  )
}

export default App;


