import "./MoviesCard.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Card = (props) => {
  const [isSaved, setSavedCard] = useState(false);
  const [movieId, setMovieId] = useState("");

  const path = useLocation();

  useEffect(() => {
    props.userSavedMovies.map((c) => {
      if (c.movieId === props.movies.id || props.movies.movieId) {
        setSavedCard(true);
        setMovieId(c._id);
      }
    });
  }, [props.userSavedMovies, props.movies.id, props.movies.movieId]);

  function saveMovie() {
    if (!isSaved) {
      props.handleSaveMovie(props.movies, setMovieId);
    } else if (isSaved) {
      props.handleMovieDelete(props.movies._id || movieId);
      setSavedCard(false);
    }
  }
  function handleLikeClick() {
    saveMovie();
    setSavedCard(!isSaved);
  }

  return (
    <li className="movies-card">
      <a href={props.movies.trailerLink} target="blank" rel="noreferrer">
        <img
          className="movies-card__image"
          src={
            path.pathname === "/movies"
              ? `https://api.nomoreparties.co${props.movies.image.url}`
              : `${props.movies.image}`
          }
          alt={props.movies.nameRU}
        />
      </a>
      <div className="movies-card__list">
        <h3 className="movies-card__heading">{props.movies.nameRU}</h3>

        {path === "/saved-movies" ? (
          <button
            type="button"
            className="movies-card__save-button movies-card__save-button_delete"
            onClick={handleLikeClick}
          />
        ) : (
          <button
            type="button"
            className={
              isSaved
                ? "movies-card__save-button movies-card__save-button_active"
                : "movies-card__save-button movies-card__save-button_deactive"
            }
            onClick={handleLikeClick}
          />
        )}
      </div>
      <p className="movies-card__duration">
        {props.movies.duration > 60
          ? `${parseInt(props.movies.duration / 60)}ч ${
              props.movies.duration % 60
            }м`
          : `${props.movies.duration}м`}
      </p>
    </li>
  );
};

export default Card;
