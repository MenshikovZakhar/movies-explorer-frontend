import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';

import React, { useEffect, useState } from 'react';


import { More } from './More/More';
import {
    WIDTH_1279,
    WIDTH_767,
    NUMBER_OF_CARDS_OVER_1279,
    NUMBER_OF_CARDS_OVER_767,
    NUMBER_OF_CARDS_LESS_767,
    ADD_NUMBER_CARD_3,
    ADD_NUMBER_CARD_2,
} from '../../constants/index.js';

export const MoviesCardList = ({ arrayMovie, type, onClickButtonMovie }) => {
    const [counter, setCounter] = useState();
    const [moreCard, setMoreCard] = useState();

    const determiningCountCards = (width) => {
        if (width > WIDTH_1279) {
            setCounter(NUMBER_OF_CARDS_OVER_1279);
            return setMoreCard(ADD_NUMBER_CARD_3);
        } else if (width > WIDTH_767) {
            setCounter(NUMBER_OF_CARDS_OVER_767);
            return setMoreCard(ADD_NUMBER_CARD_2);
        } else setCounter(NUMBER_OF_CARDS_LESS_767);
        return setMoreCard(ADD_NUMBER_CARD_2);
    };

    useEffect(() => {
        const width = window.innerWidth;
        determiningCountCards(width);
    }, []);

    const addCounter = () => setCounter((...prev) => Number(prev) + moreCard);

    useEffect(() => {
        const setTimeOut = (e) => setTimeout(determiningCountCards(e), 3000);
        window.addEventListener('resize', (e) =>
            setTimeOut(e.currentTarget.innerWidth)
        );
        return window.removeEventListener('resize', (e) =>
            setTimeOut(e.currentTarget.innerWidth)
        );
    }, []);

    return (
        <section className='movie-card-list'>
            <ul className='elements'>
                {type === 'all'
                    ? arrayMovie.slice(0, counter).map((movie) => {
                        return (
                            <MoviesCard
                                movie={movie}
                                key={movie.id}
                                type={type}
                                onClickButtonMovie={onClickButtonMovie}
                            />
                        );
                    })
                    : arrayMovie.map((movie) => {
                        return (
                            <MoviesCard
                                movie={movie}
                                key={movie._id}
                                type={type}
                                onClickButtonMovie={onClickButtonMovie}
                            />
                        );
                    })}
            </ul>

            {type === 'all' && arrayMovie.length > counter && (
                <More addCounter={addCounter} />
            )}
        </section>
    );
};