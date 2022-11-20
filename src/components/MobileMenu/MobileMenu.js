import React from "react";
import "./MobileMenu.css";
import account from "../../images/account-header.svg";
import close from "../../images/close.svg";
import { Link, NavLink } from "react-router-dom";

function MobileMenu({ isMenuOpen, handleBurgerClick }) {
  function handleClickLink(evt) {
    if (evt.currentTarget.className.includes("mobile-menu__link_active")) {
      return;
    }
    handleBurgerClick();
  }

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
            <li className="mobile-menu__item mobile-menu__item_invisible">
              <NavLink
                exact
                to="/"
                className="mobile-menu__link"
                activeClassName="mobile-menu__link_active"
                onClick={handleClickLink}
              >
                Главная
              </NavLink>
            </li>
            <li className="mobile-menu__item">
              <NavLink
                to="/movies"
                className="mobile-menu__link"
                activeClassName="mobile-menu__link_active"
                onClick={handleClickLink}
              >
                Фильмы
              </NavLink>
            </li>
            <li className="mobile-menu__item">
              <NavLink
                to="/saved-movies"
                className="mobile-menu__link"
                activeClassName="mobile-menu__link_active"
                onClick={handleClickLink}
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
            onClick={handleBurgerClick}
          />
        </Link>
      </div>
    </div>
  );
}

export default MobileMenu;
