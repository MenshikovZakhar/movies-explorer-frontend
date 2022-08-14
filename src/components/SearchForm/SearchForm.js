import React from 'react';
import './SearchForm.css';

function SearchForm() {
    return (
        <section className='search'>
            <form className='search-form'>
                <div className='search-movie'>
                    <input
                        className='search-form__input'
                        type='text'
                        placeholder={`Фильм`}
                        required
                    />
                    <button className='search-form__button' type='button'></button>
                </div>
                <label className='checkbox__label'>
                    <input className='checkbox' type='checkbox' value='short' />
                    <span className='checkbox__pseudo'></span>
                    Короткометражки
                </label>
            </form>
        </section>
    );
}

export default SearchForm;