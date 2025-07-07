import React, { useEffect, useState } from 'react'

const apiKey = '08f2bae60a0940c5676cba90ec135d1a'

export default function MovieModal({ movieId, onClose }) {
  const [details, setDetails] = useState(null)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-ES&append_to_response=credits`)
      .then(res => res.json())
      .then(data => setDetails(data))
      .catch(err => console.error('Error cargando detalles:', err))
  }, [movieId])

  if (!details) return null

  const cast = details.credits?.cast?.slice(0, 5).map(actor => actor.name).join(', ') || 'Sin datos'

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>×</span>
        <h2>{details.title}</h2>
        <p><strong>Fecha:</strong> {details.release_date}</p>
        <p><strong>Calificación:</strong> {details.vote_average}</p>
        <p><strong>Sinopsis:</strong> {details.overview}</p>
        <p><strong>Actores:</strong> {cast}</p>
      </div>
    </div>
  )
}