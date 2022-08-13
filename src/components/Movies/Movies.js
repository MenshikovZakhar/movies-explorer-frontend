import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { arrayMovie } from '../../constants/arrayMovie';
import Footer from '../Footer/Footer';
import MoreButton from '../MoreButton/MoreButton';
import { Preloader } from '../Preloader/Preloader';
import Header from '../Header/Header';
function Movies() {
    const [preloaderOpen, setPreloaderOpen] = React.useState(false);
    return (
        <>
            <Header />
            <main className='movies'>
                <SearchForm />
                {preloaderOpen ? (
                    <Preloader />
                ) : (
                    <>
                        <MoviesCardList arrayMovie={arrayMovie} type={'all'} />
                        <MoreButton>Ещё</MoreButton>
                    </>
                )}
            </main>
            <Footer />
        </>
    );
}

export default Movies;