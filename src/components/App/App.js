import { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';
import * as auth from "../../utils/auth.js";
import { mainApi } from '../../utils/MainApi.js';
import ProtectedRoute from '../ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CurrentMoviesSaveContext } from '../../contexts/CurrentMoviesSaveContext';
import { InfoToolTip } from '../InfoToolTip/InfoToolTip';
import {
  ERROR_SERVER_MESSAGE_SHORT,
  DELETE_MOVIE_MESSAGE,
  ERROR_MOVIES_VALID_DATA_MESSAGE,
  BAD_REQUEST_STATUS,
  SAVE_MOVIE_MESSAGE,
  UPDATE_DATA_MESSAGE,
  CONFLICT_ERROR
} from '../../constants/index';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const location = window.location.pathname;
  const [currentMovies, setCurrentMovies] = useState([]);
  const [messageAcceptAuth, setMessageAcceptAuth] = useState('');
  const [isAccept, setIsAccept] = useState(true);
  const [isInfoTooltipOpen, setInfoTooltip] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');

  let messageClean;
  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSaveMovies()])
        .then(([res, saveCards]) => {
          setCurrentUser({
            name: res.data.name,
            email: res.data.email,
            _id: res.data._id,
          });
          setCurrentMovies(saveCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          history.push(location);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [])

  //Регистрация
  function onRegister(name, password, email) {
    auth.register(name, password, email)
      .then((res) => {
        onLogin(email, password);
      })
      .catch((err) => {
        if (err === "Ошибка 409") {
          setRegisterErrorMessage("Пользователь с таким email уже существует");
        } else {
          setRegisterErrorMessage("Ошибка регистрации");
        }
        return;
      })
      .finally(() => {
        messageClean = setTimeout(() => {
          setRegisterErrorMessage('');
        }, 5000);
        setIsSaving(false);
      })
  }

  //Авторизация
  function onLogin(password, email) {
    auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          history.push('/movies');
        } if (data.message) {
          setLoginErrorMessage(data.message);
        }
      })
      .catch((err) => {
        setLoginErrorMessage(`Ошибка авторизации: ${err}`);
      })
      .finally(() => {
        messageClean = setTimeout(() => {
          setLoginErrorMessage('');
        }, 5000);
        setIsSaving(false);
      })
  }

  // Сохранение фильма по id
  const onClickSaveMovie = async (movie, status, id) => {
    if (status === 'delete') {
      onClickDeleteMovie(id);
      return;
    }
    const movieNew = {
      ...movie,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
    };
    delete movieNew.id;
    delete movieNew.created_at;
    delete movieNew.updated_at;
    const response = await mainApi.addSaveMovies(movieNew);

    if (response._id) {
      setCurrentMovies((prev) => [...prev, response]);
      setMessageAcceptAuth(SAVE_MOVIE_MESSAGE);
      setInfoTooltip(true);
    } else if (response.message === BAD_REQUEST_STATUS) {
      setMessageAcceptAuth(ERROR_MOVIES_VALID_DATA_MESSAGE);
      setInfoTooltip(true);
    } else {
      setMessageAcceptAuth(ERROR_SERVER_MESSAGE_SHORT);
      setInfoTooltip(true);
    }

  };

  // Удаление фильма из сохраненных по id
  const onClickDeleteMovie = async (id) => {
    const response = await mainApi.deleteMovies(id);
    if (response.message === DELETE_MOVIE_MESSAGE) {
      setCurrentMovies((prev) => prev.filter((el) => el._id !== id));
      setMessageAcceptAuth(DELETE_MOVIE_MESSAGE);
      setInfoTooltip(true);
    } else {
      setIsAccept(false);
      setMessageAcceptAuth(ERROR_SERVER_MESSAGE_SHORT);
    }
  };


  // Редактирование профиля
  function onClickUpdateProfile({ name, email }) {
    mainApi.updateUserInfo({ name, email })
      .then((res) => {
        setMessageAcceptAuth(UPDATE_DATA_MESSAGE);
        setCurrentUser(res);
        setIsAccept(false);
      })
      .catch((err) => {
        if (err) {
          setIsAccept(false);
          setMessageAcceptAuth(CONFLICT_ERROR);
        }
      })
      .finally(() => {
        messageClean = setTimeout(() => {
          setMessageAcceptAuth('');
        }, 5000);
        setIsSaving(false);
      })
  }

  // Выход из аккаунта
  const onSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('arrayAllMovies');
    localStorage.removeItem('searchText');
    localStorage.removeItem('shortFilter');
    setLoggedIn(false);
    setCurrentUser({});
    setCurrentMovies([]);
  };

  const closePopupsMessage = () => {
    setInfoTooltip(false);
    setMessageAcceptAuth('');
  };

  const openPopupsMessage = (message) => {
    setMessageAcceptAuth(message);
    setInfoTooltip(true);
  };

  function clearAllErrorMessages() {
    setRegisterErrorMessage('');
    setLoginErrorMessage('');
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentMoviesSaveContext.Provider value={currentMovies}>
        <div className='page'>
          <Switch>
            <Route exact path='/'>
              <Main
                loggedIn={loggedIn}
              />
            </Route>
            <Route exact path="/signin" >
              {loggedIn ? <Redirect to="/" /> :
                <Login
                  onLogin={onLogin}
                  errorMessage={loginErrorMessage}
                  onClear={clearAllErrorMessages}
                  isSaving={isSaving} />}
            </Route>

            <Route exact path='/signup' >
              {loggedIn ? <Redirect to="/" /> :
                <Register
                  onRegister={onRegister}
                  errorMessage={registerErrorMessage}
                  isSaving={isSaving}
                  onClear={clearAllErrorMessages}
                />}
            </Route>
            <Route path='/movies'>
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Movies}
                onClickSaveMovie={onClickSaveMovie}
                openPopupsMessage={openPopupsMessage}
              />
            </Route>
            <Route path='/saved-movies'>
              <ProtectedRoute
                loggedIn={loggedIn}
                component={SavedMovies}
                onClickDeleteMovie={onClickDeleteMovie}
                currentMovies={currentMovies}
                openPopupsMessage={openPopupsMessage}
              />
            </Route>
            <Route path='/profile'>
              <ProtectedRoute
                onSignOut={onSignOut}
                loggedIn={loggedIn}
                component={Profile}
                onClickUpdateProfile={onClickUpdateProfile}
                isAccept={isAccept}
                messageAccept={messageAcceptAuth}
              />
            </Route>
            <Route path='*'>
              <PageNotFound />
            </Route>
          </Switch>
          <InfoToolTip
            isOpen={isInfoTooltipOpen}
            onClose={closePopupsMessage}
            isAccept={isAccept}
            messageAcceptAuth={messageAcceptAuth}
          />
        </div>
      </CurrentMoviesSaveContext.Provider>
    </CurrentUserContext.Provider>
  );

};

export default App;