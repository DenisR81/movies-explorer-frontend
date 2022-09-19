import React from "react";
import "./AboutProject.css";
import HeaderAbout from "../HeaderAbout/HeaderAbout";

function AboutProject() {
  return (
    <div className="about" id="about">
      <HeaderAbout text="О проекте" />
      <div className="about__content">
        <div className="about__content-text">
          <h2 className="about__heading">Дипломный проект включал 5 этапов</h2>
          <p className="about__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about__content-text">
          <h2 className="about__heading">
            На выполнение диплома ушло 5 недель
          </h2>
          <p className="about__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__time">
        <div className="about__time-text_short">
          <p className="about__time-heading about__time-heading_green">
            1 неделя
          </p>
          <p className="about__time-paragraph">Back-end</p>
        </div>
        <div className="about__time-text_long">
          <p className="about__time-heading about__time-heading_grey">
            4 недели
          </p>
          <p className="about__time-paragraph">Front-end</p>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;
