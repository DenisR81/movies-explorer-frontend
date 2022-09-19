import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__heading">
        <h3 className="footer__heading-text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h3>
      </div>
      <div className="footer__bottom">
        <p className="footer__bottom-year">@2022</p>
        <nav>
          <ul className="footer__bottom-nav">
            <li>
              <a
                href="https://practicum.yandex.ru/catalog/free/"
                className="footer__bottom-link"
                target="_blank"
                rel="noreferrer noopener"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                href="http://github.com/DenisR81"
                className="footer__bottom-link"
                target="_blank"
                rel="noreferrer noopener"
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
