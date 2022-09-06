import { Form } from '../Form/Form';
import "./Login.css";
import logo from '../../images/logo.svg';
import { Link, withRouter } from "react-router-dom";
import React from "react";


function Login(props) {
    const { values, handleChange, errors, isFormValid } = Form();

    function handleLogin(e) {
        e.preventDefault();

        props.onLogin(values.email, values.password);


    }

    return (
        <section className="login">
            <Link to='/' className='form__link'>
                <img className='form__logo' src={logo} alt='logo' />
            </Link>
            <h2 className="login__title auth__title">Рады видеть!</h2>
            <form className="login__form auth__form" onSubmit={handleLogin} >
                <fieldset className="login__fields auth__fields">
                    <p className="login__input-name auth__input-name">E-mail</p>
                    <input type="email" name="email" className="login__input auth__input"
                        value={values.email || ''} onChange={handleChange}
                        required disabled={props.isSaving} />
                    <span className="login__error auth__error">{errors.email}</span>
                    <p className="login__input-name auth__input-name">Пароль</p>
                    <input type="password" name="password" className="login__input auth__input"
                        value={values.password || ''} onChange={handleChange}
                        required minLength="8" disabled={props.isSaving} />
                    <span className="login__error auth__error">{errors.password}</span>
                </fieldset>
                <span className="login__submit-error auth__submit-error">{props.errorMessage}</span>
                <button type="submit" disabled={!isFormValid}
                    className={`login__submit-button auth__submit-button ${isFormValid ? '' : 'auth__submit-button_disabled'}`}>
                    Войти</button>
            </form>
            <h3 className="login__subtitle auth__subtitle">Ещё не зарегистрированы?
                <Link className="login__link auth__link" to="/signup" onClick={props.onClear}>Регистрация</Link></h3>
        </section>
    )
}
export default withRouter(Login);
