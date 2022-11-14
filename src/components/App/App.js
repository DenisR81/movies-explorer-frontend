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
  SHOT_DURATION,
} from "../../utils/constants";

function App() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [userFoundMovies, setUserFoundMovies] = useState([]);
  const [userSavedMovies, setUserSavedMovies] = useState([]);
  const [userSavedMoviesCopy, setUserSavedMoviesCopy] = useState([]);
  const [checkBoxActive, setCheckboxActive] = useState(
    JSON.parse(localStorage.getItem("checkboxLocal"))
  );
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    getUserInfo();
  }, []);

  function getUserInfo() {
    MainApi.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(SERVER_ERROR);
        onSignOut();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

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

  function onRegister({ name, email, password }) {
    MainApi.registerUser({ name, email, password })
      .then((res) => {
        if (res._id) {
          setPopupTitle(REG_SUCESSFULL);
          setIsOpenPopup(true);
          setCheckboxActive(false);
          onLogin({ email, password });
        }
      })
      .catch((err) => {
        setPopupTitle(REG_ERROR);
        setIsOpenPopup(true);
      });
  }

  const onLogin = ({ email, password }) => {
    return MainApi.loginUser(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          getUserInfo();
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
        setUserFoundMovies([]);
        setUserSavedMovies([]);
        setUserSavedMoviesCopy([]);
        history.push("/");
      })
      .catch((err) => {
        console.log(SERVER_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const searchedMovies = userFoundMovies.filter((movie) => {
    if (localStorage.getItem("searchInput") !== "") {
      return movie.nameRU.toLowerCase().includes(searchInput);
    } else {
      return "";
    }
  });

  useEffect(() => {
    const searchResult = localStorage.getItem("searchInput");
    setSearchInput(searchResult);
  }, [searchInput]);

  const showSavedMovies = userSavedMovies.filter((movie) => {
    if (searchInput !== "") {
      return movie.nameRU.toLowerCase().includes(searchInput);
    } else return userSavedMovies;
  });

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
    if (!localStorage.getItem("checkboxLocal")) {
      localStorage.setItem("checkboxLocal", JSON.stringify(checkBoxActive));
    }
    if (checkBoxActive) {
      localStorage.setItem("checkboxLocal", JSON.stringify(!checkBoxActive));
      setCheckboxActive(false);
    } else if (!checkBoxActive) {
      localStorage.setItem("checkboxLocal", JSON.stringify(!checkBoxActive));
      setCheckboxActive(true);
    }
  };

  useEffect(() => {
    getMovies();
    JSON.parse(localStorage.getItem("checkboxLocal"));
    let filteredMovies;
    if (checkBoxActive) {
      filteredMovies = userSavedMoviesCopy.filter(
        (movie) => movie.duration <= SHOT_DURATION
      );
    } else if (!checkBoxActive) {
      filteredMovies = userSavedMoviesCopy;
    }
    setUserSavedMovies(filteredMovies);
  }, [checkBoxActive, userSavedMoviesCopy]);

  useEffect(() => {
    JSON.parse(localStorage.getItem("checkboxLocal"));
    let filteredMovies;
    if (checkBoxActive) {
      filteredMovies = allMovies.filter(
        (movie) => movie.duration <= SHOT_DURATION
      );
    } else if (!checkBoxActive) {
      filteredMovies = allMovies;
    }
    setUserFoundMovies(filteredMovies);
  }, [checkBoxActive, allMovies]);

  const searchMoviesHandler = (evt) => {
    const searchResult = evt.target.value.toLowerCase();
    console.log(searchResult);
    localStorage.setItem("searchInput", searchResult);
    console.log(localStorage.getItem("searchInput"));
    setSearchInput(searchResult);
    console.log(searchResult);
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
        {pathname === "/profile" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ||
        pathname === "/" ? (
          <Header loggedIn={loggedIn} isLoading={isLoading} />
        ) : (
          ""
        )}

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          {loggedIn && (
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
          )}
          {loggedIn && (
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
          )}

          {loggedIn && (
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              //updateUser={updateUser}
              isLoading={isLoading}
              onSignOut={onSignOut}
              openPopup={openPopup}
            />
          )}
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
