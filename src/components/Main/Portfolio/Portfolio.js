import './Portfolio.css';

function Portfolio() {
    return (
        <section className='portfolio'>
            <h1 className='portfolio__title'>Портфолио</h1>
            <ul className='website__list'>
                <li className='website__item'>
                    <a
                        className='website__item-link'
                        target={'_blank'}
                        rel='noopener noreferrer'
                        href='https://menshikovzakhar.github.io/how-to-learn/'
                    >
                        <p className='website__item-text'>Статичный сайт</p>
                        <p className='website__item-arrow'>↗</p>
                    </a>
                </li>

                <li className='website__item'>
                    <a
                        className='website__item-link'
                        target={'_blank'}
                        rel='noopener noreferrer'
                        href='https://menshikovzakhar.github.io/russian-travel/'
                    >
                        <p className='website__item-text'>Адаптивный сайт</p>
                        <p className='website__item-arrow'>↗</p>
                    </a>
                </li>
                <li className='website__item'>
                    <a
                        className='website__item-link'
                        target={'_blank'}
                        rel='noopener noreferrer'
                        href='domainname.mesto-full.nomoredomains.xyz'
                    >
                        <p className='website__item-text'>Одностраничное приложение</p>
                        <p className='website__item-arrow'>↗</p>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;