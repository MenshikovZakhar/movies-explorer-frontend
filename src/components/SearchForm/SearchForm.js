import { useEffect, useState } from 'react';
import './SearchForm.css';
import classNames from 'classnames';
import { ENTER_WORD_MESSAGE } from '../../constants';
export const SearchForm = ({
    onClickRequestArray,
    openPopupsMessage,
    type,
    onClickShortMovie,
}) => {
    const [value, setValue] = useState({ text: '', short: 'off' });
    const [tumbler, setTumbler] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [isValid, setIsValid] = useState(true);
    const classButton = classNames(`search-form__button`, {
        'search-form__button_disable': !isValid,
    });

    const handleChange = (evt) => {
        evt.preventDefault();
        const { value } = evt.target;
        setValue((prev) => ({ ...prev, text: value }));
        setMessageError(evt.target.validationMessage);
    };

    const handleShort = () => {
        const valueNew = value.short === 'off' ? 'on' : 'off';
        setValue((prev) => ({ ...prev, short: valueNew }));
        setTumbler(!tumbler);
        return onClickShortMovie(valueNew);
    };

    const onClickSearch = () => {
        if (messageError) {
            return openPopupsMessage(ENTER_WORD_MESSAGE);
        } else return onClickRequestArray(value);
    };

    useEffect(() => {
        if (type === 'allMovies') {
            const searchText = localStorage.getItem('searchText');
            const shortFilter = localStorage.getItem('shortFilter');
            if (!searchText && !shortFilter) {
                setValue({ text: '', short: 'off' });
                setTumbler(false);
                return;
            } else setValue({ text: searchText, short: shortFilter });
            setTumbler(shortFilter === 'on' ? true : false);

            return;
        }
    }, [type]);

    useEffect(() => {
        if (!value.text) {
            return setIsValid(false);
        }
        setIsValid(true);
    }, [value.text]);

    return (
        <section className='search'>
            <form className='search-form'>
                <div className='search-movie'>
                    <input
                        className='search-form__input'
                        type='text'
                        placeholder={`Фильм`}
                        value={value.text}
                        onChange={handleChange}
                        name='text'
                        required
                    />
                    <button
                        className={classButton}
                        type='button'
                        onClick={(e) => onClickSearch(e)}
                        disabled={!isValid}
                    ></button>
                </div>
                <label className='checkbox__label'>
                    <input
                        className='checkbox'
                        type='checkbox'
                        value={value.short}
                        name='short'
                        checked={tumbler}
                        onChange={handleShort}
                    />
                    <span className='checkbox__pseudo'></span>
                    Короткометражки
                </label>
            </form>
            {messageError && <span className='form__span-error'>{messageError}</span>}
        </section>
    );
};

