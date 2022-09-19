import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ handleSearch }) {
  const [inputValue, setInputValue] = useState("");
  const [shorts, setShorts] = useState(false);

  const handleInput = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleSwitcher = () => {
    setShorts(!shorts);
  };

  return (
    <form className="search-form" name="search" noValidate>
      <div className="search-form__container">
        <label className="search-form__label" htmlFor="search-query">
          <input
            className="search-form__input"
            id="search-query"
            name="search-query"
            type="text"
            placeholder="Фильм"
            onChange={handleInput}
            value={inputValue}
            required
          />
        </label>
        <button
          className="search-form__button"
          type="submit"
          aria-label="Искать"
        />
      </div>
      <label className="search-form__checkbox" htmlFor="shorts">
        <FilterCheckbox value={shorts} onChange={handleSwitcher} />
        <p className="search-form__text">Короткометражки</p>
      </label>
    </form>
  );
}
export default SearchForm;
