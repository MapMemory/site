import React from 'react';
import '../styles/light/green/download.scss'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Device from './components/device.jsx';
import imgAndroid from '../assets/images/svg/android.svg';
import imgApple from '../assets/images/svg/apple.svg';
import imgLinux from '../assets/images/svg/linux.svg';
import imgWindows from '../assets/images/svg/windows.svg';

function Body() {
    return (
        <div id="body">
            <div id="Smartphone">
                <Device
                    title="Android"
                    img={imgAndroid}
                    url="https://github.com/MapMemory/android"
                />
                <Device
                    title="IOS"
                    img={imgApple}
                    url="https://github.com/MapMemory/ios"
                />
            </div>
            <div id="Desktop">
                <Device
                    title="Linux"
                    img={imgLinux}
                    url="https://github.com/MapMemory/desktop"
                />
                <Device
                    title="Windows"
                    img={imgWindows}
                    url="https://github.com/MapMemory/desktop"
                />
                <Device
                    title="MacOS"
                    img={imgApple}
                    url="https://github.com/MapMemory/desktop"
                />
            </div>
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