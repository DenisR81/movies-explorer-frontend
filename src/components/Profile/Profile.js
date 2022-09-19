import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import "./Profile.css";
import { Link } from "react-router-dom";

function Profile({ nameProfile }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameErrorBool, setNameErrorBool] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [emailErrorBool, setEmailErrorBool] = useState(true);
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
      setNameError("Имя не должно содержать спец.символы");
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

  useEffect(() => {
    if (name && email && !nameError && !emailError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [name, email, nameError, emailError]);

  return (
    <>
      <div className="profile">
        <Header loggedIn={true} />
        <main>
          <h2 className="profile__header">Привет, {nameProfile}!</h2>
          <form className="profile__form">
            <fieldset className="profile__fieldset">
              <div className="profile__container">
                <label htmlFor="name" className="profile__form-label">
                  Имя
                </label>
                <input
                  id="nameprofile"
                  name="name"
                  type="text"
                  className={
                    nameErrorBool
                      ? "profile__form-input"
                      : "profile__form-input profile__form-input_err"
                  }
                  placeholder="Имя"
                  value={name}
                  onChange={handleChangeName}
                  required
                />
              </div>
            </fieldset>
            <span id="nameprofile-input-error" className="profile__item-error">
              {nameError}
            </span>
            <fieldset className="profile__fieldset">
              <div className="profile__container">
                <label htmlFor="email" className="profile__form-label">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChangeEmail}
                  className={
                    emailErrorBool
                      ? "profile__form-input"
                      : "profile__form-input profile__form-input_err"
                  }
                  placeholder="pochta@yandex.ru"
                  required
                />
              </div>
            </fieldset>
            <span id="emailprofile-input-error" className="profile__item-error">
              {emailError}
            </span>
            <div className="profile__buttons">
              <button
                type="submit"
                disabled={!formValid}
                className={
                  formValid
                    ? "profile__edit"
                    : "profile__edit profile__edit_disabled"
                }
              >
                Редактировать
              </button>
              <Link to="/" className="profile__exit">
                Выйти из аккаунта
              </Link>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default Profile;
