import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ShowButMore from "../ShowButMore/ShowButMore";
import Pic1 from "../../images/pic__COLOR_pic.svg";
import Pic2 from "../../images/pic__COLOR_pic2.svg";
import Pic3 from "../../images/pic__COLOR_pic3.svg";
import Pic4 from "../../images/pic__COLOR_pic4.svg";
import Pic5 from "../../images/pic__COLOR_pic5.svg";
import Pic6 from "../../images/pic__COLOR_pic6.svg";
import Pic7 from "../../images/pic__COLOR_pic7.svg";
import Pic8 from "../../images/pic__COLOR_pic8.svg";
import Pic9 from "../../images/pic__COLOR_pic9.svg";
import Pic10 from "../../images/pic__COLOR_pic10.svg";
import Pic11 from "../../images/pic__COLOR_pic11.svg";
import Pic12 from "../../images/pic__COLOR_pic12.svg";
import Pic13 from "../../images/pic__COLOR_pic13.svg";
import Pic14 from "../../images/pic__COLOR_pic14.svg";
import Pic15 from "../../images/pic__COLOR_pic15.svg";
import Pic16 from "../../images/pic__COLOR_pic16.svg";

function Movies() {
  const MOVIES_CARDS = [
    {
      img: Pic1,
      title: "33 слова о дизайне",
      duration: "1ч42м",
      isShortFilm: false,
    },

    {
      img: Pic2,
      title: "Киноальманах «100 лет дизайна»",
      duration: "1ч42м",
      isShortFilm: false,
    },

    {
      img: Pic3,
      title: "В погоне за Бенкси",
      duration: "1ч42м",
      isShortFilm: false,
    },

    {
      img: Pic4,
      title: "Баския: Взрыв реальности",
      duration: "1ч42м",
      isShortFilm: false,
    },

    {
      img: Pic5,
      title: "Бег это свобода",
      duration: "1ч42м",
      isShortFilm: false,
    },

    {
      img: Pic6,
      title: "Книготорговцы",
      duration: "1ч42м",
      isShortFilm: false,
    },
    {
      img: Pic7,
      title: "Когда я думаю о Германии ночью",
      duration: "1ч42м",
      isShortFilm: false,
    },
    {
      img: Pic8,
      title: "Gimme Danger: История Игги и The Stooges",
      duration: "1ч42м",
      isShortFilm: false,
    },
    {
      img: Pic9,
      title: "Дженис: Маленькая девочка грустит",
      duration: "1ч42м",
      isShortFilm: false,
    },
    {
      img: Pic10,
      title: "Соберись перед прыжком",
      duration: "1ч42м",
      isShortFilm: false,
    },
    {
      img: Pic11,
      title: "Пи Джей Харви: A dog called money",
      duration: "1ч42м",
      isShortFilm: false,
    },
    {
      img: Pic12,
      title: "По волнам: Искусство звука в кино",
      duration: "1ч42м",
      isShortFilm: false,
    },
    {
      img: Pic13,
      title: "Рудбой",
      duration: "1ч42м",
      isShortFilm: false,
    },
    {
      img: Pic14,
      title: "Скейт — кухня",
      duration: "1ч42м",
      isShortFilm: false,
    },
    {
      img: Pic15,
      title: "Война искусств",
      duration: "1ч42м",
      isShortFilm: false,
    },
    {
      img: Pic16,
      title: "Зона",
      duration: "1ч42м",
      isShortFilm: false,
    },
  ];
  return (
    <div className="movies">
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
