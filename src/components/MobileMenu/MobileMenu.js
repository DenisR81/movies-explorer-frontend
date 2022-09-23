import React from "react";
import "./MobileMenu.css";
import account from "../../images/account-header.svg";
import close from "../../images/close.svg";
import { Link, NavLink } from "react-router-dom";

function MobileMenu({ isMenuOpen, handleBurgerClick }) {
  let activeStyle = {
    paddingBottom: "4px",
    borderBottom: "solid 2px black",
  };
  return (
    <div className={isMenuOpen ? "mobile-menu__bg" : "mobile-menu__bg-active"}>
      <div className="mobile-menu">
        <nav className="mobile-menu__nav">
          <img
            src={close}
            className="mobile-menu__close"
            alt="закрыть меню"
            onClick={handleBurgerClick}
          />
          <ul className="mobile-menu__list">
            <li className="mobile-menu__item">
              <NavLink to="/" className="mobile-menu__link">
                Главная
              </NavLink>
            </li>
            <li className="mobile-menu__item">
              <NavLink
                to="/movies"
                className="mobile-menu__link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Фильмы
              </NavLink>
            </li>
            <li className="mobile-menu__item">
              <NavLink
                to="/saved-movies"
                className="mobile-menu__link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Сохраненные фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
        <Link to="/profile" className="mobile-menu__profile">
          <img
            src={account}
            alt="иконка пользоввателя"
            className="mobile-menu__account-icon"
          />
        </Link>
      </div>
    </div>
  );
}

export default MobileMenu;
