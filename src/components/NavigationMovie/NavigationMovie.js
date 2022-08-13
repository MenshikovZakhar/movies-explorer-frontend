import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationMovie.css';
import HiddenMenu from '../HiddenMenu/HiddenMenu';

function NavigationMovie() {
    const [toggle, setToggle] = useState(true);

    const onClickOpenMenu = () => {
        setToggle(false);
    };

    const onClickCloseMenu = () => {
        setToggle(true);
    };

    return (
        <>
            {toggle ? (
                <div className='nav-menu__menu-adapt' onClick={onClickOpenMenu}></div>
            ) : (
                <HiddenMenu onClickCloseMenu={onClickCloseMenu} />
            )}
            <nav className='nav-movie__menu'>
                <div className='nav-movie__movie'>
                    <NavLink
                        to='/movies'
                        className={({ isActive }) =>
                            isActive ? 'nav-movie__link active' : 'nav-movie__link'
                        }
                    >
                        Фильмы
                    </NavLink>
                    <NavLink
                        to='/saved-movies'
                        className={({ isActive }) =>
                            isActive ? 'nav-movie__link active' : 'nav-movie__link'
                        }
                    >
                        Сохранённые фильмы
                    </NavLink>
                </div>
                <div className='nav__link'>
                    <NavLink to='/profile' className='navigation__profile-link'>
                        Аккаунт
                        <div className='navigation__user-icon' />
                    </NavLink>
                </div>
            </nav>
        </>
    );
};

export default NavigationMovie; 