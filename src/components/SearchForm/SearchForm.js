import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  searchMoviesHandler,
  handleCheckbox,
  getMovies,
  checkBoxActive,
  searchInput,
}) {
  function onSubmitForm(event) {
    event.preventDefault();
  }

  return (
    <form
      className="search-form"
      name="search"
      onSubmit={onSubmitForm}
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
        <FilterCheckbox
          handleCheckbox={handleCheckbox}
          checkBoxActive={checkBoxActive}
        />
        <p className="search-form__text">Короткометражки</p>
      </label>
    </form>
  );
}
export default SearchForm;
