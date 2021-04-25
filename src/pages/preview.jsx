import React from 'react';
import '../styles/light/green/preview.scss'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import ShowcaseObject from './components/showcaseObject.jsx'
import imgProtected from '../assets/images/svg/protected.svg';
import imgOpenSouce from '../assets/images/svg/open-source.svg';
import imgQRCode from '../assets/images/svg/qr-code.svg'
import imgSettings from '../assets/images/svg/settings.svg'
import imgMap from '../assets/images/svg/map.svg'

function Body() {
    return (
        <div id="body">
            <ShowcaseObject
                title="Удобство"
                content="Найди на карте то, что именно тебе нужно"
                img={imgMap}
                right={true}
            />
            <ShowcaseObject
                title="Защита"
                content="Будьте уверены, что мы не собираем информацию о вас, все прозрачно и открыто"
                img={imgProtected}
                left={true} />
            <ShowcaseObject
                title="Открытость"
                content="Проект чистый как зеркало после плавки"
                img={imgOpenSouce}
                right={true}
            />
            <ShowcaseObject
                title="Быстро"
                content="Поделись со всеми на столько быстро на сколько это вообще возможно"
                img={imgQRCode}
                left={true}
            />
            <ShowcaseObject
                title="Просто"
                content="Менять темы проще простого попробуйте"
                img={imgSettings}
                right={true}
            />
        </div>
    );
}

export default () => {
    return (
        <div>
            <Header />
            <Body />
            <Footer />
        </div>
    );
};