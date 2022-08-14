import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { arrayMovie } from '../../constants/arrayMovie';
import Footer from '../Footer/Footer';
import './SavedMovies.css';
import { Preloader } from '../Preloader/Preloader';
import Header from '../Header/Header';
function Movies() {
    const [preloaderOpen, setPreloaderOpen] = React.useState(false);
    const saveArreyMovie = arrayMovie.filter((movie) => movie.save);
    return (
        <>
            <Header />
            <main className='movies'>
                <SearchForm />
                {preloaderOpen ? (
                    <Preloader />
                ) : (
                    <>
                        <MoviesCardList arrayMovie={saveArreyMovie} type={'save'} />
                        <div className='indent'></div>
                    </>
                )}
            </main>
            <Footer />
        </>
    );
}

export default Movies;