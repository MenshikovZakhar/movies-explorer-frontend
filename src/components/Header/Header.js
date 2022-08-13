import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';

function Header() {
    return (
        <header className='header'>
            <Link to='/' className='header__link'>
                <img className='header__logo' src={logo} alt='logo' />
            </Link>
            <Navigation />
        </header>
    );
};

export default Header;