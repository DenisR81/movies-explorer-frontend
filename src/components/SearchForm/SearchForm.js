import {React, useEffect} from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from 'react-router-dom';

function SearchForm({
  searchMoviesHandler,
  handleCheckbox,
  getMovies,
  checkBoxActive,
  searchInput,
  checkBoxActiveSaveFilms,
  tokenCheck,
}) {
/*useEffect(() => {
  getUserInfo()
}, []);*/

  function onSubmitForm(event) {
    event.preventDefault();
    
  }
  const { pathname } = useLocation();
  return (
    <form
      className="search-form"
      name="search"
      onSubmit={onSubmitForm}
      onClick={tokenCheck}
      noValidate
    >
      <div className="search-form__container">
        <label className="search-form__label" htmlFor="search-query">
          <input
            className="search-form__input"
            id="search-query"
            name="search-query"
            type="text"
            placeholder="Фильм"
            onChange={searchMoviesHandler}
            value={searchInput || ""}
            required
          />
        </label>
        <button
          className="search-form__button"
          type="submit"
          aria-label="Искать"
          onClick={getMovies}
        />
      </div>
      <label className="search-form__checkbox" htmlFor="shorts">
      {pathname === "/movies" ?
        (<FilterCheckbox
          handleCheckbox={handleCheckbox}
          checkBoxActive={checkBoxActive}
        />) : <FilterCheckbox
        handleCheckbox={handleCheckbox}
        checkBoxActive={checkBoxActiveSaveFilms}
      />}
        <p className="search-form__text">Короткометражки</p>
      </label>
    </form>
  );
}
export default SearchForm;
