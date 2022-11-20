import { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import useMediaQuery from "../../hooks/useMediaQuery";
import {
  NUMBER_OF_DESKTOP,
  NUMBER_OF_TABLET,
  NUMBER_OF_MOBILE,
  WIDTH_OF_DESKTOP,
  WIDTH_OF_TABLET,
  WIDTH_OF_MOBILE,
  ADD_OF_DESKTOP,
  ADD_OF_TABLET_OR_MOBILE,
} from "../../utils/constants";

const MoviesCardList = ({
  searchedMovies,
  userSavedMovies,
  handleSaveMovie,
  handleMovieDelete,
  isLoading,
}) => {
  const [cardsCount, setCardsCount] = useState(NUMBER_OF_DESKTOP); 
  const [movieList, setMovieList] = useState([]); 
  const [foundError, setFoundError] = useState("");
  const isDesktop = useMediaQuery(WIDTH_OF_DESKTOP);
  const isTablet = useMediaQuery(WIDTH_OF_TABLET);
  const isMobile = useMediaQuery(WIDTH_OF_MOBILE);

  function mediaQueryHooks() {
    if (isDesktop && !isMobile && !isTablet) {
      setCardsCount(NUMBER_OF_DESKTOP);
    } else if (isTablet && !isMobile) {
      setCardsCount(NUMBER_OF_TABLET);
    } else if (isMobile) {
      setCardsCount(NUMBER_OF_MOBILE);
    }
  }

  useEffect(() => {
    onResize();
    return () => offResize();
  });

  function onResize() {
    window.addEventListener("resize", mediaQueryHooks);
  }

  function offResize() {
    window.removeEventListener("resize", mediaQueryHooks);
  }

  useEffect(() => {
    setMovieList(searchedMovies.slice(0, cardsCount));
    setFoundError("");
    if (searchedMovies.length === 0) {
      checkMovies();
      function checkMovies() {
        if (movieList.length === 0) {
          setFoundError("Ничего не найдено");
        } else if (movieList.length > 0) {
          setFoundError("");
        }
      }
    }
    if (!localStorage.getItem("allMovies")) {
      setFoundError("");
    }
  }, [cardsCount, searchedMovies, setMovieList, movieList.length]);

  function handleAddMoreCards() {
    if (isDesktop && !isMobile && !isTablet) {
      setCardsCount(cardsCount + ADD_OF_DESKTOP);
    } else if (isTablet && !isMobile) {
      setCardsCount(cardsCount + ADD_OF_TABLET_OR_MOBILE);
    } else if (isMobile) {
      setCardsCount(cardsCount + ADD_OF_TABLET_OR_MOBILE);
    }
  }
  return (
    <section className="movies-card-list">
      <span className="movies-card__foundError">{foundError}</span>
      {isLoading ? (
        <Preloader />
      ) : (
        <ul className="movies-card__item">
          {movieList.map((movies) => {
            return (
              <MoviesCard
                userSavedMovies={userSavedMovies}
                handleSaveMovie={handleSaveMovie}
                handleMovieDelete={handleMovieDelete}
                movies={movies}
                key={movies.id || movies._id}
              />
            );
          })}
        </ul>
      )}

      {!isLoading ? (
        <>
          {searchedMovies.length !== movieList.length ? (
            <div className="movies-card__button-container">
              <button
                className="movies-card__button"
                type="button"
                name="more"
                onClick={handleAddMoreCards}
              >
                Ещё
              </button>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </section>
  );
};

export default MoviesCardList;
