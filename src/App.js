import './App.css';
import { useState } from 'react';
import { ReactComponent as Search } from './assets/search.svg';
import { Banner } from './components/Banner';

export const App = () => {
  const [query, setQuery] = useState('');
  const [moviesResults, setMoviesResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMoviesResults([]);

    if (query.trim() === '') {
      setError('Invalid string');
      return;
    }

    setIsLoading(true);

    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    );

    const data = await response.json();

    if (data.Search) {
      setMoviesResults([...data.Search]);
      setIsLoading(false);
    }

    if (!data.Search) {
      setError('Invalid string');
    }
  };

  const handleNomination = async (id) => {
    if (nominatedMovies.length === 5) return;

    const response = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    const { Title, Year, imdbID } = await response.json();

    setNominatedMovies([{ imdbID, Title, Year }, ...nominatedMovies]);

    setDisabledButtons([...disabledButtons, imdbID]);
  };

  const handleDelete = (id) => {
    const newNominatedMovies = nominatedMovies.filter(
      ({ imdbID }) => imdbID != id
    );

    setNominatedMovies([...newNominatedMovies]);

    const newDisabledButtons = disabledButtons.filter((item) => item != id);

    setDisabledButtons([...newDisabledButtons]);
  };

  return (
    <div className="App">
      <h1>The Shoppies</h1>

      <form onSubmit={handleSubmit}>
        <label>Movie Title:</label>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          required
        />

        <button type="submit">
          <Search />
        </button>
      </form>

      <div className="results-wrapper">
        <section className="movies-search-results">
          <h2>
            Results for
            <span>“{query}“</span>
          </h2>

          {isLoading ? <p>Loading...</p> : ''}

          {moviesResults
            ? moviesResults.map(({ Title, Year, imdbID }) => (
                <li key={imdbID}>
                  <span>{Title}</span>
                  -<span>{Year}</span>
                  <button
                    type="button"
                    disabled={disabledButtons.includes(imdbID)}
                    onClick={() => handleNomination(imdbID)}
                  >
                    Nominate
                  </button>
                </li>
              ))
            : ''}
        </section>

        <section className="nominations">
          <h2>Nominations</h2>

          <Banner nominatedMovies={nominatedMovies} />

          <div className="nominated-movies">
            {nominatedMovies
              ? nominatedMovies.map(({ Title, Year, imdbID }) => (
                  <li key={imdbID}>
                    <span>{Title}</span>
                    -<span>{Year}</span>
                    <button type="button" onClick={() => handleDelete(imdbID)}>
                      Remove
                    </button>
                  </li>
                ))
              : ''}
          </div>
        </section>
      </div>
    </div>
  );
};
