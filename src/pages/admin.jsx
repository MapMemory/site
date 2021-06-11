import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header.jsx';
import Menu from './components/menu.jsx';

import '../styles/pages/map.scss';
import '../styles/pages/admin.scss'
import 'leaflet/dist/leaflet.css';

import { ReactComponent as ImgLock } from '../assets/images/svg/lock.svg';

import LayerAdmin from './components/layerAdmin.jsx';

import Person from '../utils/person.jsx';
import Server from '../utils/server.jsx';

function Body() {
    let person = new Person();

    return (
        <div id="body" >
            <div style={person.getThemeColors().backgoundColorFirst} id="bone">
                <div style={person.getThemeColors().headerColorPrimary} id="containerLogin">
                    <ImgLock id="lockCircle" fill={person.getThemeColors().svg.fill} />
                    <div id="boxLogin">
                        <div style={person.getThemeColors().text} className="text">Имя</div>
                        <input style={{
                            color: person.getThemeColors().text.color,
                            backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor,
                            borderColor: person.getThemeColors().svg.fill
                        }} placeholder="" type="text" id="login" />
                        <div style={person.getThemeColors().text} className="text">Пароль</div>
                        <input style={{
                            color: person.getThemeColors().text.color,
                            backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor,
                            borderColor: person.getThemeColors().svg.fill
                        }} placeholder="" type="text" id="password" />
                        <br />
                        <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} onClick={async () => {
                            let server = new Server();

                            try {
                                if (await server.getAdminIsAuth(document.getElementById('login').value, document.getElementById('password').value) === "True") {

                                    document.getElementById('bone').style.display = 'none';
                                    document.getElementById('mapBox').style.display = 'block';

                                    let objects = await server.getObjects('');

                                    console.log(objects);

                                    let markers = []

                                    objects.monuments.map((monument) => markers.push({
                                        lat: monument.lat,
                                        lng: monument.long
                                    }));

                                    objects.tables.map((table) => markers.push({
                                        lat: table.lat,
                                        lng: table.long
                                    }));

                                    objects.streets.map((street) => markers.push({
                                        start_lat: street.start_lat,
                                        start_long: street.start_long,
                                        end_lat: street.end_lat,
                                        end_long: street.end_long
                                    }));

                                    let points = []

                                    objects.monuments.map((monument, idx) => points.push({
                                        idx: 'MarkerN' + idx,
                                        id: monument.id,
                                        type: 'monument',
                                        name: monument.name,
                                        description: monument.description,
                                        direction: monument.direction,
                                        lat: monument.lat,
                                        long: monument.long,
                                        images: '',
                                        isDeleted: false
                                    }));

                                    objects.tables.map((table, idx) => points.push({
                                        idx: 'MarkerN' + (objects.monuments.length + idx),
                                        id: table.id,
                                        type: 'table',
                                        name: table.name,
                                        description: table.description,
                                        direction: table.direction,
                                        lat: table.lat,
                                        long: table.long,
                                        images: '',
                                        isDeleted: false
                                    }));

                                    objects.streets.map((street, idx) => points.push({
                                        idx: 'MarkerN' + (objects.monuments.length + objects.tables.length + idx),
                                        id: street.id,
                                        type: 'street',
                                        new_name: street.new_name,
                                        old_name: street.old_name,
                                        description: street.description,
                                        direction: street.direction,
                                        start_lat: street.start_lat,
                                        start_long: street.start_long,
                                        end_lat: street.end_lat,
                                        end_long: street.end_long,
                                        images: '',
                                        isDeleted: false
                                    }));

                                    await ReactDOM.render(
                                        <div id="mapBox">
                                            <LayerAdmin
                                                markers={markers}
                                                points={points} />
                                        </div>
                                        , document.getElementById('body'));
                                }
                                else {
                                    document.getElementById('login').style.borderColor = 'Red';
                                    document.getElementById('password').style.borderColor = 'Red';
                                }
                            }
                            catch (error) {
                                if (error.toJSON().message === 'Network Error') {
                                    alert('Отсутствует подлючение к серверу')
                                    document.getElementById('login').style.borderColor = 'Red';
                                    document.getElementById('password').style.borderColor = 'Red';
                                }
                            }
                        }
                        }>Войти</button>
                    </div>
                </div>
            </div>
            <div id="mapBox">
            </div>
        </div >
    );
}

export default () => {
    return (
        <div id="admin">
            <Header />
            <Menu />
            <div id="blockScroll">
                <Body />
            </div>
        </div>
    );
};