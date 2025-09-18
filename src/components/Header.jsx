import React from 'react'

function Header() {
  return (
    <div>
      <div className='bg-white w-full p-3 flex justify-between items-center shadow-md'>
        {/* Logo izquierda */}
        <img src='./img/logo.jpg' className='w-40 h-auto' alt="Logo"/>

        {/* Logo derecha + nav */}
        <div className='flex flex-col items-end space-y-2'>
          <img src='./img/rep.png' className='w-52 h-auto' alt="República Dominicana"/>

          <nav>
            <ul className='flex space-x-6 text-gray-700 font-semibold text-sm'>
              <li>
                <a href="https://mujer.gob.do/" className="hover:text-red-600 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="https://mujer.gob.do/index.php/mapa-de-sitio" className="hover:text-red-600 transition-colors">
                  Mapa de sitio
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-red-600 transition-colors">
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Header
