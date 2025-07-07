import React from 'react'

export default function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.release_date?.slice(0, 4)}</p>
      <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
    </div>
  )
}