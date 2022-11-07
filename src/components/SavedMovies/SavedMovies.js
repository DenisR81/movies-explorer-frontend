import "./SavedMovies.css";
import { useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  searchedMovies,
  userSavedMovies,
  handleSaveMovie,
  handleMovieDelete,
  handleSavedMoviesSearch,
  loggedIn,
  searchMoviesHandler,
  handleCheckbox,
  checkBoxActive,
  searchInput,
}) {
  useEffect(() => {
    handleSavedMoviesSearch();
  }, []);

  return (
    <div className="saved-movies">
      <main>
        <SearchForm
          searchMoviesHandler={searchMoviesHandler}
          handleCheckbox={handleCheckbox}
          checkBoxActive={checkBoxActive}
          searchInput={searchInput}
        />

        <MoviesCardList
          searchedMovies={searchedMovies}
          userSavedMovies={userSavedMovies}
          handleSaveMovie={handleSaveMovie}
          handleMovieDelete={handleMovieDelete}
        />
      </main>
    </div>
  );
}

export default SavedMovies;
