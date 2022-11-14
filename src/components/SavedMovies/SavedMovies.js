import "./SavedMovies.css";
import { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  userSavedMovies,
  handleSaveMovie,
  handleMovieDelete,
  handleSavedMoviesSearch,
  handleCheckbox,
  checkBoxActive,
}) {
  const [searchInputSave, setSearchInputSave] = useState("");
  useEffect(() => {
    handleSavedMoviesSearch();
  }, []);

  useEffect(() => {
    setSearchInputSave("");
  }, []);

  const showSavedMovies = userSavedMovies.filter((movie) => {
    if (searchInputSave !== "") {
      return movie.nameRU.toLowerCase().includes(searchInputSave);
    } else return userSavedMovies;
  });

  const searchMoviesHandler = (evt) => {
    const searchResult = evt.target.value.toLowerCase();
    localStorage.setItem("searchInputSave", searchResult);
    setSearchInputSave(searchResult);
  };

  return (
    <div className="saved-movies">
      <main>
        <SearchForm
          searchMoviesHandler={searchMoviesHandler}
          handleCheckbox={handleCheckbox}
          checkBoxActive={checkBoxActive}
          searchInput={searchInputSave}
        />

        <MoviesCardList
          searchedMovies={showSavedMovies}
          userSavedMovies={userSavedMovies}
          handleSaveMovie={handleSaveMovie}
          handleMovieDelete={handleMovieDelete}
        />
      </main>
    </div>
  );
}

export default SavedMovies;
