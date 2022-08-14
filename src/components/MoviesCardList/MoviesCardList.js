import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ arrayMovie, type }) {
    return (
        <section className='movie-card-list'>
            <ul className='elements'>
                {arrayMovie.map((movie) => {
                    return <MoviesCard movie={movie} key={movie._id} type={type} />;
                })}
            </ul>
        </section>
    );
};

export default MoviesCardList;