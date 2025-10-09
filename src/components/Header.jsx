import React from 'react'

function Header() {
  return (
    <div>
      <div className='bg-white w-full p-3 flex justify-between items-center shadow-md'>
        {/* Logo izquierda */}
        <img src='./img/logo.jpg' className=' w-40 h-auto lg:flex' alt="Logo"/>

        {/* Logo derecha + nav */}
        <div className='flex flex-col items-end space-y-2'>
          <img src='./img/burger-bar.png' className=' flex w-7 h-auto lg:hidden' alt="República Dominicana"/>
          <img src='./img/escudo.png' className='hidden w-52 h-auto lg:flex' alt="República Dominicana"/>

          <nav>
            <ul className='space-x-6 text-gray-700 font-semibold text-sm hidden lg:flex'>
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
