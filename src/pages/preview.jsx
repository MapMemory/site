import React from 'react';

import '../styles/pages/preview.scss'

import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Present from './components/present.jsx'

import { ReactComponent as imgProtected } from '../assets/images/svg/protected.svg';
import { ReactComponent as imgOpenSouce } from '../assets/images/svg/open-source.svg';
import { ReactComponent as imgQRCode } from '../assets/images/svg/qr-code.svg'
import { ReactComponent as imgSettings } from '../assets/images/svg/settings.svg'
import { ReactComponent as imgMap } from '../assets/images/svg/map.svg'

import Person from '../utils/person.jsx';
import Menu from './components/menu.jsx';

function Body() {
    let person = new Person();

    return (
        <div id="body">
            <Present
                title="Удобство"
                content="Найдите на карте то, что именно вам нужно"
                ImgObj={imgMap}
                right={true}
                theme={person.getThemeColors()}
            />
            <Present
                title="Защита"
                content="Будьте уверены, что мы не собираем информацию о вас, все прозрачно и открыто"
                ImgObj={imgProtected}
                left={true}
                theme={person.getThemeColors()}
            />
            <Present
                title="Открытость"
                content="Проект чистый как песок после плавки"
                ImgObj={imgOpenSouce}
                right={true}
                theme={person.getThemeColors()}
            />
            <Present
                title="Быстрота"
                content="Поделитесь со всеми на столько быстро на сколько это вообще возможно"
                ImgObj={imgQRCode}
                left={true}
                theme={person.getThemeColors()}
            />
            <Present
                title="Простота"
                content="Менять темы проще простого попробуйте"
                ImgObj={imgSettings}
                right={true}
                theme={person.getThemeColors()}
            />
        </div>
    );
}

export default () => {

    return (
        <div id="preview">
            <Header />
            <Menu />
            <div id="blockScroll">
                <Body />
                <Footer />
            </div>
        </div>
    );
};