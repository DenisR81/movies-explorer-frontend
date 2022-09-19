import React from "react";
import promo from "../../images/promo.svg";
import "./Promo.css";

function Promo() {
  return (
    <div className="promo">
      <div className="promo__pr">
        <div className="promo__bl">
          <h1 className="promo__text">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <h2 className="promo__subtext">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя
          </h2>
        </div>
        <img
          src={promo}
          className="promo__img"
          alt="Рисунок цифровой планеты"
        />
      </div>
      <nav className="promo__nav">
        <a href="#about" className="promo__nav-text">
          Узнать больше
        </a>
      </nav>
    </div>
  );
}

export default Promo;
