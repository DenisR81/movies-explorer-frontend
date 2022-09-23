import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            href="https://github.com/DenisR81/how-to-learn"
            className="portfolio__list-link"
            target="_blank"
            rel="noreferrer noopener"
          >
            <p className="portfolio__list-text">Статичный сайт</p>
            <p className="portfolio__list-text portfolio__list-text_arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://github.com/DenisR81/russian-travel"
            className="portfolio__list-link"
            target="_blank"
            rel="noreferrer noopener"
          >
            <p className="portfolio__list-text">Адаптивный сайт</p>
            <p className="portfolio__list-text portfolio__list-text_arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://github.com/DenisR81/react-mesto-api-full"
            className="portfolio__list-link"
            target="_blank"
            rel="noreferrer noopener"
          >
            <p className="portfolio__list-text">Одностраничное приложение</p>
            <p className="portfolio__list-text portfolio__list-text_arrow">↗</p>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
