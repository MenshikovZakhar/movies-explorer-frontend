import { NavLink, Link } from 'react-router-dom';
import './HiddenMenu.css';

function HiddenMenu({ onClickCloseMenu }) {
  return (
    <section className='hidden-menu'>
      <nav className='nav-movie__menu_adapt'>
        <div className='nav-menu__close' onClick={onClickCloseMenu}></div>
        <div className='nav-movie__movie_adapt'>
          <Link
            to='/'
            className='nav-movie__link-adapt'
            onClick={onClickCloseMenu}
          >
            Главная
          </Link>
          <NavLink
            to='/movies'
            className={({ isActive }) =>
              isActive
                ? 'nav-movie__link-adapt active-adapt'
                : 'nav-movie__link-adapt'
            }
            onClick={onClickCloseMenu}
          >
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            className={({ isActive }) =>
              isActive
                ? 'nav-movie__link-adapt active-adapt'
                : 'nav-movie__link-adapt'
            }
            onClick={onClickCloseMenu}
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
    </section>
  );
};

export default HiddenMenu;