import student__photo from '../../../images/student__photo.jpg';
import './AboutMe.css';

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__heading section__heading">Студент</h2>
            <div className="about-me__description">
                <div className="about-me__description-text">
                    <h3 className="about-me__description-title">Захар</h3>
                    <p className="about-me__description-subtitle">Фронтенд-разработчик, 36 лет</p>
                    <p className="about-me__description-paragraph">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы..
                    </p>
                    <div className="about-me__description-links">
                        <a href="https://github.com/MenshikovZakhar" target="_blank" rel="noreferrer" className="about-me__description-link">Github</a>
                    </div>
                </div>
                <img src={student__photo} alt="фото" className="about-me__description-photo" />
            </div>
        </section>
    )
}

export default AboutMe;