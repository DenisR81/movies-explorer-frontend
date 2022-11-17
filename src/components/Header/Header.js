import React, { useState } from "react";
import logo from "../../images/logo-header.svg";
import account from "../../images/account-header.svg";
import burger from "../../images/burger.svg";
import { Link, NavLink } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";
import "./Header.css";

function Header({ loggedIn, tokenCheck }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  function handleBurgerClick() {
    setIsMenuOpen(!isMenuOpen);
    tokenCheck();
  }
  return (
    <header className={
      loggedIn
        ? "header"
        : "header header_blue"
    }>
      <Link to="/">
        <img src={logo} alt="Логотип" className="header__logo" />
      </Link>
      {loggedIn ? (
        <div className="header__block">
          <img
            src={burger}
            className="header__login-open"
            alt="бургер"
            onClick={handleBurgerClick}
          />
          <nav className="header__login">
            <ul className="header__nav-login">
              <li className="header__nav-item">
                <NavLink to="/movies" className="header__nav-link" activeClassName='header__link_active' onClick={tokenCheck}>
                  Фильмы
                </NavLink>
              </li>
              <li className="header__nav-item">
                <NavLink to="/saved-movies" className="header__nav-link" activeClassName='header__link_active' onClick={tokenCheck}>
                  Сохраненные фильмы
                </NavLink>
              </li>
            </ul>
            <div>
              <Link to="/profile" className="header__profile" onClick={tokenCheck}>
                <img
                  src={account}
                  alt="иконка пользователя"
                  className="header__account-icon"
                />
              </Link>
            </div>
          </nav>
          <MobileMenu
            handleBurgerClick={handleBurgerClick}
            isMenuOpen={isMenuOpen}
          />
        </div>
      ) : (
        <nav className="header__nav-reg">
          <Link to="/signup" className="header__reg">
            Регистрация
          </Link>
          <Link to="/signin" className="header__btn">
            Войти
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
