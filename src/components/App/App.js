import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
  REGISTRATION_MESSAGE,
  CONFLICT_ERROR,
  ERROR_SERVER_MESSAGE_SHORT,
  ERROR_MESSAGE_EMAIL_PASSWORD,
  UPDATE_DATA_MESSAGE,
  DELETE_MOVIE_MESSAGE,
  ERROR_MOVIES_VALID_DATA_MESSAGE,
  CONFLICT_ERROR_STATUS,
  UNAUTHORIZED_STATUS,
  BAD_REQUEST_STATUS,
} from '../../constants';

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
        if (res) {
          setLoginErrorMessage('');
          history.push('/signin');
        } else if (res.error === 'Bad Request') {
          setRegisterErrorMessage('Введены невалидные данные');
        } else if (res.message) {
          setRegisterErrorMessage(res.message);
        }
      })
      .catch(() => {
        setRegisterErrorMessage(ERROR_SERVER_MESSAGE_SHORT);
      })
      .finally(() => {
        messageClean = setTimeout(() => {
          setRegisterErrorMessage('');
        }, 5000);
        setIsSaving(false);
      })
  }

  //Авторизации
  function onLogin(password, email) {
    auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoginErrorMessage('');
          setLoggedIn(true);
          history.push('/movies');
        } else if (data.error === 'Bad Request') {
          setLoginErrorMessage('Введены невалидные данные');
        } else if (data.message) {
          setLoginErrorMessage(data.message);
        }
      })
      .catch(() => {
        setLoginErrorMessage(ERROR_SERVER_MESSAGE_SHORT);

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
    } else {

      setMessageAcceptAuth(ERROR_SERVER_MESSAGE_SHORT);
    }
  };


  // Редактирование профиля
  const onClickUpdateProfile = async (userDataNew) => {
    const response = await mainApi.updateUserInfo(userDataNew);

    if (response._id) {
      setIsAccept(false);
      setMessageAcceptAuth(UPDATE_DATA_MESSAGE);
      setCurrentUser(userDataNew);
    } else if (response.message === CONFLICT_ERROR_STATUS) {
      setIsAccept(false);
      setMessageAcceptAuth(CONFLICT_ERROR);
    } else {
      setIsAccept(false);
      setMessageAcceptAuth(ERROR_SERVER_MESSAGE_SHORT);
    }
    messageClean = setTimeout(() => {
      setIsAccept(true);
      setMessageAcceptAuth('');
    }, 5000);
  };

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
              />
            </Route>

            <Route path='/signin'>
              <Login
                onLogin={onLogin}
                messageAcceptAuth={messageAcceptAuth}
                isAccept={isAccept}
                errorMessage={loginErrorMessage}
                isSaving={isSaving}
                onClear={clearAllErrorMessages}
              />
            </Route>

            <Route path='/signup'>
              <Register
                onRegister={onRegister}
                errorMessage={registerErrorMessage}
                isSaving={isSaving}
                onClear={clearAllErrorMessages}
              />
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