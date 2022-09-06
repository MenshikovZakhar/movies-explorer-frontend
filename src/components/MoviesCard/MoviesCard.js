import { useContext } from 'react';
import { CurrentMoviesSaveContext } from '../../contexts/CurrentMoviesSaveContext';

import './MoviesCard.css';
export const MoviesCard = ({ movie, type, onClickButtonMovie }) => {
    const CurrentMoviesSave = useContext(CurrentMoviesSaveContext);
    const { nameRU, duration, image } = movie;
    const movieData = CurrentMoviesSave.filter((el) => el.movieId === movie.id);
    const isSave = movieData.length > 0;

    const getTimeFromMins = (mins) => {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
    };

    const duretionHour = getTimeFromMins(duration);
    const imageMovie =
        type === 'all' ? `https://api.nomoreparties.co${image.url}` : movie.image;

    return (
        <section className='movie-card'>
            <a
                className='link__trailer'
                href={movie.trailerLink}
                target={'_blank'}
                rel='noopener noreferrer'
            >
                <img className='movie__image' src={imageMovie} alt={nameRU} />
            </a>
            <div className='movie__info'>
                <div className='movie__text'>
                    <h1 className='movie__title'>{nameRU}</h1>
                    <p className='movie__duration'>{duretionHour}</p>
                </div>
                {type === 'all' ? (
                    isSave ? (
                        <button
                            type='button'
                            className='movie__button movie__button_type_active'
                            onClick={() =>
                                onClickButtonMovie(movie, 'delete', movieData[0]._id)
                            }
                        ></button>
                    ) : (
                        <button
                            type='button'
                            className='movie__button movie__button_type_disabled'
                            onClick={() => onClickButtonMovie(movie, 'save', null)}
                        ></button>
                    )
                ) : (
                    <button
                        type='button'
                        className='movie__button movie__button_type_close'
                        onClick={() => onClickButtonMovie(movie._id)}
                    ></button>
                )}
            </div>

        </section>
    );
};