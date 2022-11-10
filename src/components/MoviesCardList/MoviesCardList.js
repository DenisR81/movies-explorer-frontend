import { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import useMediaQuery from "../../hooks/useMediaQuery";

const MoviesCardList = ({
  searchedMovies,
  userSavedMovies,
  handleSaveMovie,
  handleMovieDelete,
  isLoading,
}) => {
  const [cardsCount, setCardsCount] = useState(12); 
  const [movieList, setMovieList] = useState([]); 
  const [foundError, setFoundError] = useState("");
  const isDesktop = useMediaQuery("(min-width: 769px)");
  const isTablet = useMediaQuery("(max-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 480px)");

  function mediaQueryHooks() {
    if (isDesktop && !isMobile && !isTablet) {
      setCardsCount(12);
    } else if (isTablet && !isMobile) {
      setCardsCount(8);
    } else if (isMobile) {
      setCardsCount(5);
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
      setCardsCount(cardsCount + 3);
    } else if (isTablet && !isMobile) {
      setCardsCount(cardsCount + 2);
    } else if (isMobile) {
      setCardsCount(cardsCount + 2);
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
