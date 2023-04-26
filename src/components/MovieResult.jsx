import React from "react";
import MovieCard from "./MovieCard";

const MovieResult = ({movies,result}) => {
    return (
        <div className="result">
            <span>Search results for "{result}"</span>
            <br />
            <br />
            <span>{movies?.length} movies found.</span>

            {movies?.length > 0 ? (
                <div className="container">
                  {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                  ))}
                </div>
              ) : (
                <div className="empty">
                  <h2> No movies found.</h2>
                </div>
              )}
        </div>
    )
}

export default MovieResult;