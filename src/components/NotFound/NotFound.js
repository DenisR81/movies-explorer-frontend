import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__header">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <Link to='/' className="not-found__back">
        Назад
      </Link>
    </div>
  );
}

export default PageNotFound;
