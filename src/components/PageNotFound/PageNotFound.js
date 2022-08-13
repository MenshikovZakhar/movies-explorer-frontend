import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
    return (
        <div className="page-notfound">
            <h3 className="notfound__title">
                404
            </h3>
            <p className="notfound__subtitle">
                Страница не найдена
            </p>
            <Link className="notfound__link" to="/">
                Назад
            </Link>
        </div>
    );
}
export default PageNotFound;