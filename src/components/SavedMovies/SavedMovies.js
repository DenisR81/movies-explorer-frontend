import React from "react";
import "./SavedMovies.css";
import ShowButMore from "../ShowButMore/ShowButMore";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Pic1 from "../../images/pic__COLOR_pic.svg";
import Pic2 from "../../images/pic__COLOR_pic2.svg";
import Pic3 from "../../images/pic__COLOR_pic3.svg";

function Movies() {
  const MOVIES_CARDS = [
    {
      img: Pic1,
      title: "33 слова о дизайне",
      duration: "1ч42м",
      isShortFilm: false,
      deleteFilm: true,
    },

    {
      img: Pic2,
      title: "Киноальманах «100 лет дизайна»",
      duration: "1ч42м",
      isShortFilm: false,
      deleteFilm: true,
    },

    {
      img: Pic3,
      title: "В погоне за Бенкси",
      duration: "1ч42м",
      isShortFilm: false,
      deleteFilm: true,
    },
  ];
  return (
    <div className="saved-movies">
      <Header loggedIn={true} />
      <main>
        <SearchForm />
        <MoviesCardList data={MOVIES_CARDS} />
        <ShowButMore />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
