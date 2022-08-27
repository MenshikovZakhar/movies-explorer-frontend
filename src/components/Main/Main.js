import Techs from './Techs/Techs';
import AboutProject from './AboutProject/AboutProject';
import AboutMe from './AboutMe/AboutMe';
import Promo from './Promo/Promo';
import Footer from '../Footer/Footer';
import Portfolio from './Portfolio/Portfolio';
import Header from '../Header/Header';

function Main({ loggedIn }) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className='content'>
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </main>
            <Footer />
        </>
    );
}

export default Main;