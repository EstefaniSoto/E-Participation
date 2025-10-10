import React from "react";
import { Facebook, Instagram, Phone, MapPin, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-blue-950 text-white mt-10 pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna 1: Logo y descripción */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src="./img/cupula_blanca.png" alt="Logo" className="w-20 mb-3 rounded-lg shadow-md" />
          <p className="text-md text-purple-100">
            Ministerio de la Mujer
          </p>
        </div>

        {/* Columna 2: Contacto */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white mb-3 border-b border-white/30 pb-1">Contáctanos</h3>
          <p className="flex items-center gap-2"><Phone size={18} /> <span>809-685-3755</span></p>
          <p className="flex items-center gap-2"><Mail size={18} /> <span>info@mujer.gob.do</span></p>
          <p className="flex items-center gap-2"><MapPin size={18} /> <span>Av. México esq. 30 de Marzo, Bloque D, Segundo Piso, Rep. Dom.</span></p>
        </div>

        {/* Columna 3: Redes Sociales */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white mb-3 border-b border-white/30 pb-1">Síguenos</h3>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300 transition-colors">
              <Facebook size={22} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300 transition-colors">
              <Instagram size={22} />
            </a>
           
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="mt-8 border-t border-white/30 pt-4 text-center text-sm text-purple-100">
        © {new Date().getFullYear()} Ministerio de la Mujer – Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
