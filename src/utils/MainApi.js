export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    // Обработка ответа от сервера
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _getHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Authorization': `Bearer ${token}`,
            ...this._headers,
        };
    }

    //Загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._getHeaders(),
        })
            .then(this._checkResponse);
    };

    // Редактирование данных пользователя
    updateUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
            .then(this._checkResponse);
    };

    // Получение информации о сохраненных фильмах 
    getSaveMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: this._getHeaders(),
        })
            .then(this._checkResponse);
    };

    // Добавление фильмов в сохраненные
    addSaveMovies(data) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify(data),
        })
            .then(this._checkResponse);
    }

    // Удаление фильмов из сохраненных 
    deleteMovies(movieId) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        })
            .then(this._checkResponse);
    };
}

//подключение апи
export const mainApi = new Api({
    baseUrl: 'https://ap.domainname.movies.nomoredomains.xyz',
    headers: {
        'content-type': 'application/json'
    }
});

