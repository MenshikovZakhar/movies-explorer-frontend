import './Techs.css';
function Techs() {
    return (
        <section className='techs' id='techs'>
            <h1 className='title'>Технологии</h1>
            <div className='content__wrapper'>
                <h2 className='content__title'>7 технологий</h2>
                <p className='content__text'>
                    На курсе веб-разработки мы освоили технологии, которые применили в
                    дипломном проекте.
                </p>
                <ul className='techs-list'>
                    <li className='techs-list__item'>HTML</li>
                    <li className='techs-list__item'>CSS</li>
                    <li className='techs-list__item'>JS</li>
                    <li className='techs-list__item'>React</li>
                    <li className='techs-list__item'>Git</li>
                    <li className='techs-list__item'>Express.js</li>
                    <li className='techs-list__item'>mongoDB</li>
                </ul>
            </div>
        </section>
    );
};

export default Techs;