import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ data }) {
  const moviesCardsAll = data.map((item) => (
    <li key={item.id} className="movies-card">
      <MoviesCard data={item} />
    </li>
  ));

  return <ul className="movies-card__item">{moviesCardsAll}</ul>;
}

export default MoviesCardList;
