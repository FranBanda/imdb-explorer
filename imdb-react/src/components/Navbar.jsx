import React, { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">🎬 Explorador IMDb</h1>
        <div
          className={`hamburger ${open ? 'active' : ''}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-links ${open ? 'show' : ''}`}>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Cartelera</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </div>
    </nav>
  )
}