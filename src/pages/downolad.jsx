import React from 'react';

import '../styles/pages/download.scss'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Device from './components/device.jsx';

import { ReactComponent as imgAndroid } from '../assets/images/svg/android.svg';
import { ReactComponent as imgApple } from '../assets/images/svg/apple.svg';
import { ReactComponent as imgLinux } from '../assets/images/svg/linux.svg';
import { ReactComponent as imgWindows } from '../assets/images/svg/windows.svg';

import Person from '../utils/person.jsx';
import Menu from './components/menu.jsx';

function Body() {
    let person = new Person();

    return (
        <div id="body">
            <div id="Smartphone">
                <div style={person.getThemeColors().headerColorPrimary} className="name">
                    <hr />
                    <p style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }}>Смартфон</p>
                    <hr />
                </div>

                <Device
                    title="Android"
                    ImgObj={imgAndroid}
                    url="https://github.com/MapMemory/android"
                    right={true}
                    theme={person.getThemeColors()}
                />
                <Device
                    title="IOS"
                    ImgObj={imgApple}
                    url="https://github.com/MapMemory/ios"
                    left={true}
                    theme={person.getThemeColors()}
                />
            </div>
            <div id="Desktop">
                <div style={person.getThemeColors().headerColorPrimary} className="name">
                    <hr />
                    <p style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }}>Десктоп</p>
                    <hr />
                </div>

                <Device
                    title="Linux"
                    ImgObj={imgLinux}
                    url="https://github.com/MapMemory/desktop"
                    right={true}
                    theme={person.getThemeColors()}
                />
                <Device
                    title="Windows"
                    ImgObj={imgWindows}
                    url="https://github.com/MapMemory/desktop"
                    left={true}
                    theme={person.getThemeColors()}
                />
                <Device
                    title="MacOS"
                    ImgObj={imgApple}
                    url="https://github.com/MapMemory/desktop"
                    right={true}
                    theme={person.getThemeColors()}
                />
            </div>
        </div >
    );
}

export default () => {
    return (
        <div id="download">
            <Header />
            <Menu />
            <div id="blockScroll">
                <Body />
                <Footer />
            </div>
        </div>
    );
};