import React, { useEffect } from 'react'

const apiKey = '08f2bae60a0940c5676cba90ec135d1a'

export default function SearchBar({
  setMovies,
  setError,
  query,
  setQuery,
  minRating,
  setMinRating,
  page,
  setPage
}) {
  const fetchMovies = async () => {
    if (!query.trim()) return

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          query
        )}&language=es-ES&page=${page}`
      )
      const data = await res.json()
      const filtered = data.results.filter(
        (m) => m.vote_average >= minRating && m.poster_path
      )
      setMovies(filtered)
      setError(null)
    } catch (err) {
      console.error('Error en búsqueda:', err)
      setError('😓 Error al conectar con la API.')
    }
  }

  useEffect(() => {
    if (query.trim()) {
      fetchMovies()
    }
  }, [query, minRating, page])

  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Buscar película..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating mínimo"
        value={minRating}
        onChange={(e) => setMinRating(parseFloat(e.target.value))}
      />
      <button
        onClick={() => {
          if (!query.trim()) {
            setError('🔍 Escribe un título para buscar.')
            setMovies([])
            return
          }

          if (page !== 1) {
            setPage(1)
          } else {
            
            fetchMovies()
          }
        }}
      >
        Buscar
      </button>
    </div>
  )
}
