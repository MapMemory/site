import React from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from "react-router-dom";

import '../styles/pages/map.scss';
import 'leaflet/dist/leaflet.css';

import Header from './components/header.jsx';
import Person from '../utils/person.jsx';
import Menu from './components/menu.jsx';
import FullScreenText from './components/fullScreenText.jsx';

import LayerUser from './components/layerUser.jsx';

import Server from '../utils/server.jsx';

async function showLayerUser(aim) {
    let server = new Server();
    let objects = await server.getObjects('');
    let aimObject = null;
    let focus = "objects";

    if (aim.scheme != undefined || aim.id != undefined) {
        aimObject = await server.getAimObject(aim);
        focus = "aim";
    }

    let userLocation = await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition((position) =>
            resolve({
                lat: position.coords.latitude,
                long: position.coords.longitude
            }));
    });

    await ReactDOM.render(
        <div id="mapBox">
            <LayerUser
                monuments={objects.monuments}
                tables={objects.tables}
                streets={objects.streets}
                aimObject={aimObject}
                userLocation={userLocation}
                focus={focus}
                allObjects={objects} />
        </div>
        , document.getElementById('body'));
}

export default () => {
    let person = new Person();
    person.getThemeTone()
    const { search } = useLocation();
    const urlParams = Object.fromEntries([...new URLSearchParams(search)]);

    showLayerUser({ scheme: urlParams.scheme, id: urlParams.id });

    return (
        <div id="map" style={person.getThemeColors().backgoundColorFirst}>
            <Header />
            <Menu />
            <FullScreenText
                text=""
            />
            <div id="blockScroll"
                style={person.getThemeColors().backgoundColorFirst}>
                <div id="body"
                    style={person.getThemeColors().backgoundColorFirst}>

                    {
                        (person.getThemeTone() === 'light') ? <div id="loading" className="dark"></div> : <div id="loading" className="light"></div>
                    }

                </div>
            </div>
        </div >
    );
}