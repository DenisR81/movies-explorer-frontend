import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  useLocation,
  useHistory,
  withRouter,
  Redirect,
} from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Popup from "../Popup/popup";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MoviesApi from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import MainApi from "../../utils/MainApi";
import {
  SERVER_ERROR,
  REG_ERROR,
  AUTH_ERROR,
  REG_SUCESSFULL,
} from "../../utils/constants";

function App() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [userFoundMovies, setUserFoundMovies] = useState([]);
  const [userSavedMovies, setUserSavedMovies] = useState([]);
  const [userSavedMoviesCopy, setUserSavedMoviesCopy] = useState([]);
  const [checkBoxActive, setCheckboxActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true || false);
  const [searchInput, setSearchInput] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const { pathname } = useLocation();
  const history = useHistory();

  function onRegister({ name, email, password }) {
    MainApi.registerUser({ name, email, password })
      .then((res) => {
        if (res._id) {
          setPopupTitle(REG_SUCESSFULL);
          setIsOpenPopup(true);
          onLogin({ email, password });
        }
      })
      .catch((err) => {
        setPopupTitle(REG_ERROR);
        setIsOpenPopup(true);
      });
  }

  const tokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      MainApi.getUserInfo(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            localStorage.setItem("loggedIn", loggedIn);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onLogin = ({ email, password }) => {
    return MainApi.loginUser(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          tokenCheck();
          history.push("/movies");
        }
      })
      .catch((err) => {
        setPopupTitle(AUTH_ERROR);
        setIsOpenPopup(true);
      });
  };

  function openPopup(textError) {
    setPopupTitle(textError);
    setIsOpenPopup(true);
  }

  function closePopup() {
    setIsOpenPopup(false);
    setPopupTitle("");
  }

  const onSignOut = () => {
    MainApi.logout()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({});
        localStorage.clear();
        setAllMovies([]);
        setSearchInput("");
        history.push("/");
      })
      .catch((err) => {
        console.log(SERVER_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const showSavedMovies = userSavedMovies.filter((movie) => {
    if (searchInput !== "") {
      return movie.nameRU.toLowerCase().includes(searchInput);
    } else return userSavedMovies;
  });

  const searchedMovies = userFoundMovies.filter((movie) => {
    if (searchInput !== "") {
      return movie.nameRU.toLowerCase().includes(searchInput);
    } else return "";
  });

  useEffect(() => {
    if (loggedIn) {
      MainApi.getUserInfo()
        .then((res) => setCurrentUser(res))
        .catch((err) => {
          console.log(err);
        });
      MainApi.getMovies()
        .then((data) => {
          setUserSavedMovies(data);
          setUserSavedMoviesCopy(data);
          localStorage.setItem("userSavedMovies", JSON.stringify(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleSavedMoviesSearch() {
    MainApi.getMovies()
      .then((data) => {
        setUserSavedMovies(data);
        setUserSavedMoviesCopy(data);
      })
      .catch((err) => console.log(err));
  }

  function getMovies() {
    if (!localStorage.getItem("allMovies")) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        MoviesApi.getMovies()
          .then((downloadedFilms) => {
            setAllMovies(downloadedFilms);
            localStorage.setItem("allMovies", JSON.stringify(downloadedFilms));
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 2000);
      return () => clearTimeout(timer);
    } else if (localStorage.getItem("allMovies")) {
      const loadedMovies = JSON.parse(localStorage.getItem("allMovies"));
      setAllMovies(loadedMovies);
    }
  }

  const handleCheckbox = () => {
    localStorage.getItem("checkboxLocal");
    if (!localStorage.getItem("checkboxLocal")) {
      localStorage.setItem("checkboxLocal", checkBoxActive);
    }
    if (checkBoxActive) {
      setCheckboxActive(false);
    } else if (!checkBoxActive) {
      setCheckboxActive(true);
    }
  };

  useEffect(() => {
    localStorage.getItem("checkboxLocal");
    let filteredMovies;
    if (checkBoxActive) {
      filteredMovies = userSavedMoviesCopy.filter(
        (movie) => movie.duration <= 40
      );
    } else if (!checkBoxActive) {
      filteredMovies = userSavedMoviesCopy;
    }
    setUserSavedMovies(filteredMovies);
  }, [checkBoxActive, userSavedMoviesCopy]);

  useEffect(() => {
    localStorage.getItem("checkboxLocal");
    let filteredMovies;
    if (checkBoxActive) {
      filteredMovies = allMovies.filter((movie) => movie.duration <= 40);
    } else if (!checkBoxActive) {
      filteredMovies = allMovies;
    }
    setUserFoundMovies(filteredMovies);
  }, [checkBoxActive, allMovies]);

  useEffect(() => {
    const searchResult = JSON.parse(localStorage.getItem("searchInput"));
    setSearchInput(searchResult);
  }, [searchInput]);

  const searchMoviesHandler = (evt) => {
    const search = evt.target.value.toLowerCase();
    localStorage.setItem("searchInput", JSON.stringify(search));
    const searchResult = JSON.parse(localStorage.getItem("searchInput"));
    setSearchInput(searchResult);
  };

  function handleSaveMovie(movie, setMovieId) {
    MainApi.saveMovie(movie)
      .then((res) => {
        setMovieId(res._id);
        setUserSavedMovies((state) =>
          state.map((c) => (c._id === movie._id ? res.data : c))
        );
        setUserSavedMoviesCopy((state) =>
          state.map((c) => (c._id === movie._id ? res.data : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMovieDelete(movie) {
    MainApi.deleteMovie(movie)
      .then((res) => {
        setUserSavedMovies((state) => state.filter((c) => c._id !== res._id));
        setUserSavedMoviesCopy((state) =>
          state.filter((c) => c._id !== res._id)
        );
        handleSavedMoviesSearch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ||
        pathname === "/profile" ? (
          <Header loggedIn={loggedIn} isLoading={isLoading} />
        ) : (
          ""
        )}

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute
            exact
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            isLoading={isLoading}
            getMovies={getMovies}
            searchedMovies={searchedMovies}
            userSavedMovies={userSavedMovies}
            handleSaveMovie={handleSaveMovie}
            handleMovieDelete={handleMovieDelete}
            searchMoviesHandler={searchMoviesHandler}
            handleCheckbox={handleCheckbox}
            checkBoxActive={checkBoxActive}
            searchInput={searchInput}
            openPopup={openPopup}
          />

          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            searchedMovies={showSavedMovies}
            userSavedMovies={userSavedMovies}
            handleSaveMovie={handleSaveMovie}
            handleMovieDelete={handleMovieDelete}
            handleSavedMoviesSearch={handleSavedMoviesSearch}
            searchMoviesHandler={searchMoviesHandler}
            handleCheckbox={handleCheckbox}
            checkBoxActive={checkBoxActive}
            searchInput={searchInput}
            openPopup={openPopup}
          />

          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            isLoading={isLoading}
            onSignOut={onSignOut}
            openPopup={openPopup}
          />

          <Route path="/signin">
            {() =>
              isLoading ? (
                <Preloader />
              ) : !loggedIn ? (
                <Login onLogin={onLogin} />
              ) : (
                <Redirect to="/movies" />
              )
            }
          </Route>

          <Route path="/signup">
            {() =>
              isLoading ? (
                <Preloader />
              ) : !loggedIn ? (
                <Register onRegister={onRegister} />
              ) : (
                <Redirect to="/movies" />
              )
            }
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        {pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ? (
          <Footer />
        ) : (
          ""
        )}

        <Popup text={popupTitle} isOpen={isOpenPopup} onClose={closePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
