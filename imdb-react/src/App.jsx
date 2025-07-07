import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import MovieCard from './components/MovieCard'
import MovieModal from './components/MovieModal'
import Footer from './components/Footer'

export default function App() {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [page, setPage] = useState(1)

  const apiKey = '08f2bae60a0940c5676cba90ec135d1a'

  // 🎬 Cargar cartelera inicial (solo si no hay búsqueda)
  useEffect(() => {
    if (!query.trim()) {
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=${page}`
      )
        .then(res => res.json())
        .then(data => {
          const filtered = data.results.filter(
            m => m.vote_average >= minRating && m.poster_path
          )
          setMovies(filtered)
          setError(null)
        })
        .catch(err => {
          console.error('Error al cargar populares:', err)
          setError('😓 No se pudieron cargar las películas.')
        })
    }
  }, [page, query, minRating])

  return (
    <div className="App">
      <Navbar />

      <SearchBar
        setMovies={setMovies}
        setError={setError}
        query={query}
        setQuery={setQuery}
        minRating={minRating}
        setMinRating={setMinRating}
        page={page}
        setPage={setPage}
      />

      {/* 🔎 Subtítulo dinámico */}
      {!query.trim() ? (
        <h2 className="subtitle">🎬 Películas populares del momento</h2>
      ) : (
        <>
          <h2 className="subtitle">🔎 Resultados para: <span>{query}</span></h2>
          <button className="volver-btn" onClick={() => setQuery('')}>
            🔁 Volver a populares
          </button>
        </>
      )}

      {error && <p className="error">{error}</p>}

      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
        ))}
      </div>

      <div className="pagination">
        {page > 1 && <button onClick={() => setPage(page - 1)}>◀ Anterior</button>}
        <span>Página {page}</span>
        {movies.length >= 1 && <button onClick={() => setPage(page + 1)}>Siguiente ▶</button>}
      </div>

      {selectedMovie && (
        <MovieModal movieId={selectedMovie.id} onClose={() => setSelectedMovie(null)} />
      )}

      <Footer />
    </div>
  )
}