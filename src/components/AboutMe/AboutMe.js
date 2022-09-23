import React from "react";
import HeaderAbout from "../HeaderAbout/HeaderAbout";
import "./AboutMe.css";
import me from "../../images/me.png";

function AboutMe() {
  return (
    <div className="about-me">
      <HeaderAbout text="Студент" />
      <div className="about-me__content">
        <div className="about-me__texts">
          <h2 className="about-me__header">Денис</h2>
          <h3 className="about-me__subtext">Фронтенд-разработчик, 41 год</h3>
          <p className="about-me__biograf">
            Я живу и работаю в Новосибирске, закончил НГПУ по специальности
            математика информатика. Женат. Люблю слушать музыку и автомобили.
            После окончания курсов Яндекс-Практикума "Веб-разработчик" решил
            поменять профессию и стать фронтенд-разработчиком.
          </p>
          <a
            href="http://github.com/DenisR81"
            className="about-me__link"
            target="_blank"
            rel="noreferrer noopener"
          >
            Github
          </a>
        </div>
        <img className="about-me__img" src={me} alt="Фотография" />
      </div>
    </div>
  );
}

export default AboutMe;
