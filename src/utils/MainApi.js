import { MAIN_API_URL } from "./constants";

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  registerUser({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then(this._checkResponse);
  }

  loginUser = (email, password) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  };

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then(this._checkResponse);
  }

  getToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }

  updateToken() {
    this._headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`;
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(this._checkResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export default mainApi;
