import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import Header from '../Header/Header';

export const Profile = ({
    onSignOut,
    loggedIn,
    onClickUpdateProfile,
    messageAccept,
    isAccept,
}) => {
    const currentUser = useContext(CurrentUserContext);
    const [edit, setEdit] = useState(false);
    const [userDataUpdate, setUserDataUpdate] = useState({ name: '', email: '' });
    const [messageError, setMessageError] = useState({
        name: '',
        email: '',
    });
    const [isValidForm, setIsValidForm] = useState(true);
    const classSaveButton = classNames(`profile__save-button`, {
        'profile__save-button_disable': !isValidForm,
        'profile__save-button_disable profile__save-button_span-text': !isAccept,
    });
    useEffect(() => {
        setUserDataUpdate({ name: currentUser.name, email: currentUser.email });
    }, [currentUser]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setUserDataUpdate((prev) => ({ ...prev, [name]: value }));
        setMessageError((prev) => ({
            ...prev,
            [name]: evt.target.validationMessage,
        }));
    };

    const enterUpdateProfile = (e) => {
        if (messageError.name && messageError.email) {
            return;
        }
        e.preventDefault();
        onClickUpdateProfile(userDataUpdate);
    };

    useEffect(() => {
        if (messageError.name || messageError.email) {
            return setIsValidForm(false);
        } else if (
            currentUser.name === userDataUpdate.name &&
            currentUser.email === userDataUpdate.email
        ) {
            return setIsValidForm(false);
        }
        setIsValidForm(true);
    }, [messageError, userDataUpdate, currentUser]);

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className='profile'>
                <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
                <form className='profile__form'>
                    <fieldset className='profile__fieldset'>
                        <label className='profile__label'>Имя</label>
                        <input
                            type='text'
                            name='name'
                            defaultValue={userDataUpdate.name}
                            className='profile__input profile__input_type_name'
                            placeholder='Имя'
                            required
                            pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
                            minLength={2}
                            maxLength={100}
                            title='Кириллица'
                            disabled={!edit}
                            onChange={handleChange}
                        />
                    </fieldset>
                    {messageError.name && (
                        <span className='profile__span-error'>{messageError.name}</span>
                    )}
                    <fieldset className='profile__fieldset'>
                        <label className='profile__label'>E-mail</label>
                        <input
                            type='email'
                            name='email'
                            defaultValue={userDataUpdate.email}
                            className='profile__input profile__input_type_email'
                            placeholder='email'
                            pattern='^[^ ]+@[^ ]+\.[a-z]{2,3}$'
                            required
                            title='email'
                            disabled={!edit}
                            onChange={handleChange}
                        />
                    </fieldset>
                    {messageError.email && (
                        <span className='profile__span-error'>{messageError.email}</span>
                    )}
                    {!isAccept && <span className='profile__error'>{messageAccept}</span>}
                    {edit ? (
                        <button
                            type='submit'
                            className={classSaveButton}
                            disabled={!isValidForm}
                            onClick={enterUpdateProfile}
                        >
                            Сохранить
                        </button>
                    ) : (
                        <div className='profile__buttons'>
                            <p className='profile__edit' onClick={() => setEdit(!edit)}>
                                Редактировать
                            </p>
                            <Link to='/' className='profile__logout' onClick={onSignOut}>
                                Выйти из аккаунта
                            </Link>
                        </div>
                    )}
                </form>
            </main>
        </>
    );
};