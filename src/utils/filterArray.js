import { SHORT_MOVIE_TIME } from '../constants';
export const filterArray = () => {
    const arrayAllMovies = JSON.parse(localStorage.getItem('arrayAllMovies'));
    const searchText = localStorage.getItem('searchText');
    const shortFilter = localStorage.getItem('shortFilter');

    const filteredArray = arrayAllMovies.filter(
        (movie) => movie.nameRU.toLowerCase().indexOf(searchText) >= 0
    );
    if (shortFilter === 'on') {
        const shortArray = filteredArray.filter(
            (movie) => movie.duration < SHORT_MOVIE_TIME
        );
        return shortArray;
    } else return filteredArray;
};

export const filterSaveArray = (array, searchText, short) => {
    const filteredArray = array.filter(
        (movie) => movie.nameRU.indexOf(searchText) >= 0
    );
    if (short === 'on') {
        const shortArray = filteredArray.filter(
            (movie) => movie.duration < SHORT_MOVIE_TIME
        );
        return shortArray;
    } else return filteredArray;
};