import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./assets/search.svg";
import Loading from "./components/Loading";
import MovieResult from "./components/MovieResult";

// const API_URL = "https://imdb8.p.rapidapi.com/auto-complete";
const API_URL = "http://www.omdbapi.com?apikey=65978967";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2b84a0fc68msh99eccd1b141e44dp198ea7jsn52116a5ac2f9",
    "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
  },
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("spiderman");
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("spiderman");
  const [errorMessage, setErrorMessage] = useState("");

  const searchMovies = async () => {
    setLoading(true);
    // console.log(this.state.searchTerm ? this.state.searchTerm : "spiderman");
    console.log(searchTerm);

    await fetch(`${API_URL}&s=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.Search);
        setSearchTerm([]);
        setResult(searchTerm);
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage("Unable to fetch movie list");
        setLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovies();
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1> Movie Land </h1>

      <form className="search" onSubmit={handleSubmit}>
        <input
          placeholder="Search Movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">
          <img
            src={SearchIcon}
            alt="Search Icon"
            onClick={() => searchMovies(searchTerm)}
          />
        </button>
      </form>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {loading ? <Loading /> : <MovieResult movies={movies} result={result} />}
    </div>
  );
};

export default App;
