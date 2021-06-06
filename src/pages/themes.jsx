import React from 'react';

import '../styles/pages/themes.scss'

import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Palette from './components/palette.jsx';

import Person from '../utils/person.jsx';
import Menu from './components/menu.jsx';

function Body() {
    let person = new Person();

    return (
        <div id="body">
            <Palette
                title="Светло-зеленая"
                tone="light"
                color="green"
                right={true}
                theme={person.getThemeColors()}
            />
            <Palette
                title="Темно-зеленая"
                tone="dark"
                color="green"
                left={true}
                theme={person.getThemeColors()}
            />
            <Palette
                title="Светло-оранжевая"
                tone="light"
                color="orange"
                right={true}
                theme={person.getThemeColors()}
            />
            <Palette
                title="Темно-оранжевая"
                tone="dark"
                color="orange"
                left={true}
                theme={person.getThemeColors()}
            />
            <Palette
                title="Светло-красная"
                tone="light"
                color="red"
                right={true}
                theme={person.getThemeColors()}
            />
            <Palette
                title="Темно-красная"
                tone="dark"
                color="red"
                left={true}
                theme={person.getThemeColors()}
            />
        </div>
    );
}

export default () => {
    return (
        <div id="themes">
            <Header />
            <Menu />
            <div id="blockScroll">
                <Body />
                <Footer />
            </div>
        </div>
    );
};