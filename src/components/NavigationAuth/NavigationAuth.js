import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationAuth.css';


function NavigationAuth() {
    return (
        <nav className='menu'>
            <NavLink to='/signup' className='menu__link'>
                Регистрация
            </NavLink>
            <NavLink to='/signin' className='menu__link button'>
                Войти
            </NavLink>
        </nav>
    );
};

export default NavigationAuth;