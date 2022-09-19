import React, { useState, useEffect } from "react";
import "../Register/Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo-header.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailErrorBool, setEmailErrorBool] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorBool, setPasswordErrorBool] = useState(true);
  const [formValid, setFormValid] = useState(false);

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

  useEffect(() => {
    if (email && password && !emailError && !passwordError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [email, password, emailError, passwordError]);

  return (
    <div className="register">
      <header className="register__header">
        <Link to="/">
          <img src={logo} className="register__header-logo" alt="Логотип" />
        </Link>
        <h2 className="register__header__text">Рады видеть!</h2>
      </header>
      <main>
        <form className="register__form">
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
            value={email}
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
            value={password}
            type="password"
            placeholder="Пароль"
            onChange={handleChangePassword}
            required
          />
          <span id="password-input-error" className="register__item-error">
            {passwordError}
          </span>
          <button
            disabled={!formValid}
            className={
              formValid
                ? "register__form-submit"
                : "register__form-submit  register__form-submit_disabled"
            }
          >
            Войти
          </button>
        </form>
        <div className="register__footer">
          <p className="register__footer-text">Eще не зарегистрированы?</p>
          <Link to="/signup" className="register__footer-link">
            Регистрация
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Login;
