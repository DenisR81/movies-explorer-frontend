/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./MoviesCard.css";

function MoviesCard({ data, locationPathname }) {
  const [saved, setSaved] = useState(false);
  function handleSaved() {
    setSaved(!saved);
  }

  return (
    <li className="movies-card">
      <a href="#" target="blank" rel="noreferrer">
        <img className="movies-card__image" src={data.img} alt="Кадр фильма" />
      </a>
      <div className="movies-card__list">
        <h3 className="movies-card__heading">{data.title}</h3>
        <button
          className={
            data.deleteFilm
              ? "movies-card__save-button movies-card__save-button_delete"
              : saved
              ? "movies-card__save-button movies-card__save-button_active"
              : "movies-card__save-button movies-card__save-button_deactive"
          }
          type="button"
          aria-label="Сохранить"
          onClick={handleSaved}
        ></button>
      </div>
      <p className="movies-card__duration">{data.duration}</p>
    </li>
  );
}

export default MoviesCard;
