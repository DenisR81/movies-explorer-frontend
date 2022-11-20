import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo-header.svg";

function Register({ onRegister, isLoading }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameErrorBool, setNameErrorBool] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [emailErrorBool, setEmailErrorBool] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorBool, setPasswordErrorBool] = useState(true);
  const [formValid, setFormValid] = useState(false);

  const handleChangeName = (evt) => {
    const validName = /^[а-яА-ЯёЁa-zA-Z0-9 -]+$/.test(evt.target.value);
    if (evt.target.value.length < 2) {
      setNameError("Длина имени должна быть не менее 2 символов");
      setNameErrorBool(false);
    } else if (evt.target.value.length > 30) {
      setNameError("Длина имени должна должна быть не более 30 символов");
      setNameErrorBool(false);
    } else if (!validName) {
      setNameError(
        "Имя должно содержать латиницу, кириллицу, пробел или дефис"
      );
      setNameErrorBool(false);
    } else {
      setNameError("");
      setNameErrorBool(true);
    }
    setName(evt.target.value);
  };

  const handleChangeEmail = (evt) => {
    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
      evt.target.value
    );

    if (!validEmail) {
      setEmailError("Неверный формат почты");
      setEmailErrorBool(false);
    } else {
      setEmailError("");
      setEmailErrorBool(true);
    }
    setEmail(evt.target.value);
  };

  const handleChangePassword = (evt) => {
    if (evt.target.value.length < 6) {
      setPasswordError("Пароль должен быть не менее 6 символов");
      setPasswordErrorBool(false);
    } else {
      setPasswordError("");
      setPasswordErrorBool(true);
    }
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister({ name, email, password });
  };

  useEffect(() => {
    if (
      name &&
      email &&
      password &&
      !nameError &&
      !emailError &&
      !passwordError
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [name, email, password, nameError, emailError, passwordError]);

  return (
    <div className="register">
      <header className="register__header">
        <Link to="/">
          <img src={logo} className="register__header-logo" alt="Логотип" />
        </Link>
        <h2 className="register__header__text">Добро пожаловать!</h2>
      </header>
      <main>
        <form className="register__form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="register__form-label">
            Имя
          </label>
          <input
            id="name"
            className={
              nameErrorBool
                ? "register__form-input"
                : "register__form-input  register__form-input_err"
            }
            name="name"
            type="text"
            placeholder="Ваше имя"
            value={name || ""}
            onChange={handleChangeName}
            required
          />
          <span id="name-input-error" className="register__item-error">
            {nameError}
          </span>
          <label htmlFor="email" className="register__form-label">
            E-mail
          </label>
          <input
            id="email"
            className={
              emailErrorBool
                ? "register__form-input"
                : "register__form-input  register__form-input_err"
            }
            type="email"
            value={email || ""}
            placeholder="Email"
            onChange={handleChangeEmail}
            required
          />
          <span id="email-input-error" className="register__item-error">
            {emailError}
          </span>
          <label htmlFor="password" className="register__form-label">
            Пароль
          </label>
          <input
            id="password"
            className={
              passwordErrorBool
                ? "register__form-input"
                : "register__form-input  register__form-input_err"
            }
            value={password || ""}
            type="password"
            placeholder="Пароль"
            onChange={handleChangePassword}
            required
          />
          <span id="password-input-error" className="register__item-error">
            {passwordError}
          </span>
          <button
            type="submit"
            disabled={!formValid || isLoading}
            className={
              formValid
                ? "register__form-submit"
                : "register__form-submit  register__form-submit_disabled"
            }
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="register__footer">
          <p className="register__footer-text">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__footer-link">
            Войти
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Register;
