import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  searchedMovies,
  userSavedMovies,
  handleSaveMovie,
  handleMovieDelete,
  searchMoviesHandler,
  handleCheckbox,
  getMovies,
  isLoading,
  checkBoxActive,
  searchInput,
}) {
  
  return (
    <div className="movies">
      <main>
        <SearchForm
          searchMoviesHandler={searchMoviesHandler}
          handleCheckbox={handleCheckbox}
          getMovies={getMovies}
          checkBoxActive={checkBoxActive}
          searchInput={searchInput}
        ></SearchForm>
        <MoviesCardList
          searchedMovies={searchedMovies}
          userSavedMovies={userSavedMovies}
          handleSaveMovie={handleSaveMovie}
          handleMovieDelete={handleMovieDelete}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default Movies;
