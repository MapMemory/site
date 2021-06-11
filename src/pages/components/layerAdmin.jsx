import React from 'react';
import ReactDOM from 'react-dom';
import Control from 'react-leaflet-control';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import update from 'react-addons-update';

import Routing from "./RoutingMachine.jsx";

import '../../styles/pages/map.scss';
import '../../styles/pages/admin.scss'
import 'leaflet/dist/leaflet.css';

import ImgMapPinLight from '../../assets/images/svg/mapPinLight.svg';
import ImgMapPinDark from '../../assets/images/svg/mapPinDark.svg';

import ImgMapYouDark from '../../assets/images/svg/mapYouDark.svg';
import ImgMapYouLight from '../../assets/images/svg/mapYouLight.svg';

import { ReactComponent as ImgCommitChanges } from '../../assets/images/svg/commitChanges.svg';
import { ReactComponent as ImgDeletePoint } from '../../assets/images/svg/deletePoint.svg';
import { ReactComponent as ImgMop } from '../../assets/images/svg/mop.svg';
import { ReactComponent as ImgMagnify } from '../../assets/images/svg/magnify.svg';
import { ReactComponent as ImgExchange } from '../../assets/images/svg/exchange.svg';
import { ReactComponent as ImgUpload } from '../../assets/images/svg/upload.svg';
import { ReactComponent as ImgManHere } from '../../assets/images/svg/manHere.svg';

import Person from '../../utils/person.jsx';
import Server from '../../utils/server.jsx';

export default class extends React.Component {
    constructor({ markers, points }) {
        super();

        this.state = {
            isMapInit: false,
            isYourLocation: false,
            markers: markers,
            tempObj: null,
            points: points,
            focusLocation: {
                lat: 53.900596113714116,
                lng: 27.55894660949707
            }
        };
    }

    closeInfo() {
        document.getElementById('blockFullInfo').style.display = 'none';
        document.getElementById('box').style.display = 'none';

        ReactDOM.render(<this.ElementNull />, document.getElementById('objInfo'));
    }

    async openInfo(idx) {
        if (idx.split('|').length == 1)
            this.setState({ tempObj: this.state.points.find((point) => point.idx == idx) });

        if (idx.split('|').length > 1)
            this.setState({ tempObj: this.state.points.find((point) => point.idx == idx.split('|')[0]) });

        if (this.state.tempObj.type == 'empty') {
            if (document.getElementById('infoMonumentLatLong'))
                document.getElementById('infoMonumentLatLong').style.display = 'none';

            if (document.getElementById('infoTableLatLong'))
                document.getElementById('infoTableLatLong').style.display = 'none';

            if (document.getElementById('infoStreetFrom'))
                document.getElementById('infoStreetFrom').style.display = 'none';

            if (document.getElementById('infoStreetTo'))
                document.getElementById('infoStreetTo').style.display = 'none';
        }

        if (this.state.tempObj.type == 'monument') {
            if (document.getElementById('infoTableLatLong'))
                document.getElementById('infoTableLatLong').style.display = 'none';

            if (document.getElementById('infoStreetFrom'))
                document.getElementById('infoStreetFrom').style.display = 'none';

            if (document.getElementById('infoStreetTo'))
                document.getElementById('infoStreetTo').style.display = 'none';
        }

        if (this.state.tempObj.type == 'table') {
            if (document.getElementById('infoMonumentLatLong'))
                document.getElementById('infoMonumentLatLong').style.display = 'none';

            if (document.getElementById('infoStreetFrom'))
                document.getElementById('infoStreetFrom').style.display = 'none';

            if (document.getElementById('infoStreetTo'))
                document.getElementById('infoStreetTo').style.display = 'none';
        }

        if (this.state.tempObj.type == 'street') {
            if (document.getElementById('infoMonumentLatLong'))
                document.getElementById('infoMonumentLatLong').style.display = 'none';

            if (document.getElementById('infoTableLatLong'))
                document.getElementById('infoTableLatLong').style.display = 'none';
        }

        if (document.getElementById('blockFullInfo'))
            document.getElementById('blockFullInfo').style.display = 'block';

        if (document.getElementById('box'))
            document.getElementById('box').style.display = 'block';

        let person = new Person();

        ReactDOM.render(<this.ObjectInfo person={person} object={this.state.tempObj} type={this.state.tempObj.type} />, document.getElementById('objInfo'));
    }

    downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify({ markers: this.state.markers, points: this.state.points })], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "Информация.txt";
        document.body.appendChild(element);
        element.click();
    }

    ElementNull() {
        return (<div></div>);
    }

    handleCommitChanges = async () => {
        let index;

        if (this.state.tempObj.type == 'monument') {
            this.state.tempObj.name = document.getElementById('infoMonumentName').value;
            this.state.tempObj.description = document.getElementById('infoMonumentDescription').value;
            this.state.tempObj.direction = document.getElementById('infoMonumentDirection').value;
            this.state.tempObj.images = document.getElementById('infoMonumentPictures').value;
            this.state.tempObj.lat = document.getElementById('infoMonumentLatLong').value.slice(1, -1).split(', ')[0];
            this.state.tempObj.long = document.getElementById('infoMonumentLatLong').value.slice(1, -1).split(', ')[1];

            index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);

            if (index > -1)
                this.state.points[index] = this.state.tempObj;
        }

        if (this.state.tempObj.type == 'table') {
            this.state.tempObj.name = document.getElementById('infoTableName').value;
            this.state.tempObj.description = document.getElementById('infoTableDescription').value;
            this.state.tempObj.direction = document.getElementById('infoTableDirection').value;
            this.state.tempObj.images = document.getElementById('infoTablePictures').value;
            this.state.tempObj.lat = document.getElementById('infoTableLatLong').value.slice(1, -1).split(', ')[0];
            this.state.tempObj.long = document.getElementById('infoTableLatLong').value.slice(1, -1).split(', ')[1];

            index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);

            if (index > -1)
                this.state.points[index] = this.state.tempObj;
        }

        if (this.state.tempObj.type == 'street') {
            this.state.tempObj.old_name = document.getElementById('infoStreetNewName').value;
            this.state.tempObj.new_name = document.getElementById('infoStreetOldName').value;
            this.state.tempObj.description = document.getElementById('infoStreetDescription').value;
            this.state.tempObj.direction = document.getElementById('infoStreetDirection').value;
            this.state.tempObj.images = document.getElementById('infoStreetPictures').value;
            this.state.tempObj.end_lat = document.getElementById('infoStreetTo').value.slice(1, -1).split(', ')[0];
            this.state.tempObj.end_long = document.getElementById('infoStreetTo').value.slice(1, -1).split(', ')[1];

            index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);

            if (index > -1)
                this.state.points[index] = this.state.tempObj;
        }
    }

    handleDeletePoint = async () => {
        let index = this.state.points.findIndex((pont) => pont.idx == this.state.tempObj.idx);
        this.state.points[index].isDeleted = true;

        index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);
        this.state.tempObj = this.state.points[index];

        await this.openInfo(this.state.tempObj.idx);
    }

    ObjectInfo({ person, object, type }) {
        if (type == 'monument')
            return (
                <div>
                    {(object.isDeleted) ? <p className="text" style={person.getThemeColors().text} onClick={() => {
                    }}><b style={{ color: 'red' }}>Удаленный</b> Монумент</p> : <p className="text" style={person.getThemeColors().text} onClick={() => {
                    }}>Монумент</p>}

                    <textarea id="infoMonumentName" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Название" disabled={false} editable={true} placeholder="Название">{object.name}</textarea>

                    <textarea id="infoMonumentDescription" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Описание" disabled={false} editable={true} placeholder="Описание">{object.description}</textarea>

                    <textarea id="infoMonumentDirection" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Направление" disabled={false} editable={true} placeholder="Направление">{object.direction}</textarea>

                    <textarea id="infoMonumentPictures" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Список изображений" disabled={false} editable={true} placeholder="Список изображений">{object.images}</textarea>

                    <textarea id="infoMonumentLatLong" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Позиция" disabled={false} editable={false} placeholder="Позиция" value={'[' + object.lat + ', ' + object.long + ']'}></textarea>
                </div >
            );

        if (type == 'table')
            return (
                <div>
                    {(object.isDeleted) ? <p className="text" style={person.getThemeColors().text} onClick={() => {
                    }}><b style={{ color: 'red' }}>Удаленная</b> Табличка</p> : <p className="text" style={person.getThemeColors().text} onClick={() => {
                    }}>Табличка</p>}

                    <textarea id="infoTableName" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Название" disabled={false} editable={true} placeholder="Название">{object.name}</textarea>

                    <textarea id="infoTableDescription" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Описание" disabled={false} editable={true} placeholder="Описание">{object.description}</textarea>

                    <textarea id="infoTableDirection" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Направление" disabled={false} editable={true} placeholder="Направление">{object.direction}</textarea>

                    <textarea id="infoTablePictures" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Список изображений" disabled={false} editable={true} placeholder="Список изображений">{object.images}</textarea>

                    <textarea id="infoTableLatLong" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Позиция" disabled={false} editable={false} placeholder="Позиция" value={'[' + object.lat + ', ' + object.long + ']'}></textarea>
                </div >
            );

        if (type == 'street')
            return (
                <div>
                    {(object.isDeleted) ? <p className="text" style={person.getThemeColors().text} onClick={() => {
                    }}><b style={{ color: 'red' }}>Удаленный</b> Улица</p> : <p className="text" style={person.getThemeColors().text} onClick={() => {
                    }}>Улица</p>}

                    <textarea id="infoStreetNewName" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Новое название" disabled={false} editable={true} placeholder="Новое название">{object.new_name}</textarea>

                    <textarea id="infoStreetOldName" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Старое название" disabled={false} editable={true} placeholder="Старое название">{object.old_name}</textarea>

                    <textarea id="infoStreetDescription" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Описание" disabled={false} editable={true} placeholder="Описание">{object.description}</textarea>

                    <textarea id="infoStreetDirection" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Направление" disabled={false} editable={true} placeholder="Направление">{object.direction}</textarea>

                    <textarea id="infoStreetPictures" id="infoStreetPictures" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Список изображений" disabled={false} editable={true} placeholder="Список изображений">{object.images}</textarea>

                    <textarea id="infoStreetFrom" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Позиция начала" disabled={false} editable={false} placeholder="Позиция начала" value={'[' + object.start_lat + ', ' + object.start_long + ']'}></textarea>

                    <textarea id="infoStreetTo" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Позиция конца" disabled={false} editable={false} placeholder="Позиция конца">{'[' + object.end_lat + ', ' + object.end_long + ']'}</textarea>
                </div >
            );

        if (type == 'empty')
            return (
                <div>
                    <textarea class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Позиция точки" disabled={false} editable={true} placeholder="Позиция точки" value={'[' + object.lat + ', ' + object.lng + ']'}></textarea>
                </div >
            );

    }

    BlockFullInfo({ person }) {
        return (
            <div style={{
                display: 'none'
            }} class="box-block" id="blockFullInfo">
                <p className="text" style={person.getThemeColors().text} onClick={() => {
                    if (document.getElementById('objInfo').style.display == 'none')
                        document.getElementById('objInfo').style.display = 'block';
                    else
                        document.getElementById('objInfo').style.display = 'none';


                    if (document.getElementById('fullInfoLine').style.display == 'none')
                        document.getElementById('fullInfoLine').style.display = 'block';
                    else
                        document.getElementById('fullInfoLine').style.display = 'none';

                    document.getElementById('boxObjectActions').style.display = 'none';
                    document.getElementById('fullObjectActionLine').style.display = 'none';

                    document.getElementById('boxGlobalActions').style.display = 'none';
                    document.getElementById('fullGlobalActionLine').style.display = 'none';
                }}>Информация</p>
                <hr style={{ backgroundColor: person.getThemeColors().backgoundColorFirst.backgroundColor, borderColor: person.getThemeColors().backgoundColorFirst.backgroundColor, display: 'none' }} id="fullInfoLine" />
                <div style={{ display: 'none' }} id="objInfo">
                </div>
            </div>
        );
    }

    handleGoToMe = async () => {
        this.setState(update(this.state, {
            isYourLocation: {
                $set: true
            },
            focusLocation: await new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition((position) =>
                    resolve({
                        lat: {
                            $set: position.coords.latitude
                        },
                        lng: {
                            $set: position.coords.longitude
                        }
                    }));
            })
        }));
    }

    handleClearSearch = async () => {
        document.getElementById('inputSearch').value = "";
    }


    handleSearchObject = async () => {
        if (document.getElementById('inputSearch').value == 'Монумент') {
            if (this.state.tempObj.type == 'empty') {
                let index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);

                this.state.tempObj = {
                    idx: this.state.tempObj.idx,
                    type: 'monument',
                    name: '',
                    description: '',
                    direction: '',
                    images: '',
                    lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long) ? (this.state.tempObj.start_long) : (this.state.tempObj.lng),
                    isDeleted: false
                };

                this.state.points[index] = this.state.tempObj;
            }

            if (this.state.tempObj.type == 'table') {
                let index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);

                this.state.tempObj = {
                    idx: this.state.tempObj.idx,
                    type: 'monument',
                    name: '',
                    description: '',
                    direction: '',
                    images: '',
                    lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long) ? (this.state.tempObj.start_long) : (this.state.tempObj.lng),
                    isDeleted: false
                };

                this.state.points[index] = this.state.tempObj;
            }

            if (this.state.tempObj.type == 'street') {
                let index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);

                this.state.tempObj = {
                    idx: this.state.tempObj.idx,
                    type: 'monument',
                    name: '',
                    description: '',
                    direction: '',
                    images: '',
                    lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long) ? (this.state.tempObj.start_long) : (this.state.tempObj.lng),
                    isDeleted: false
                };

                this.state.points[index] = this.state.tempObj;
            }

            await this.openInfo(this.state.tempObj.idx);
        }

        if (document.getElementById('inputSearch').value == 'Табличка') {
            if (this.state.tempObj.type == 'empty') {
                let index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);

                this.state.tempObj = {
                    idx: this.state.tempObj.idx,
                    type: 'table',
                    name: '',
                    description: '',
                    direction: '',
                    images: '',
                    lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long) ? (this.state.tempObj.start_long) : (this.state.tempObj.lng),
                    isDeleted: false
                };

                this.state.points[index] = this.state.tempObj;
            }

            if (this.state.tempObj.type == 'monument') {
                let index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);

                this.state.tempObj = {
                    idx: this.state.tempObj.idx,
                    type: 'table',
                    name: '',
                    description: '',
                    direction: '',
                    images: '',
                    lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long) ? (this.state.tempObj.start_long) : (this.state.tempObj.lng),
                    isDeleted: false
                };

                this.state.points[index] = this.state.tempObj;
            }


            if (this.state.tempObj.type == 'street') {
                let index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);

                this.state.tempObj = {
                    idx: this.state.tempObj.idx,
                    type: 'table',
                    name: '',
                    description: '',
                    direction: '',
                    images: '',
                    lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long) ? (this.state.tempObj.start_long) : (this.state.tempObj.lng),
                    isDeleted: false
                };

                this.state.points[index] = this.state.tempObj;
            }

            await this.openInfo(this.state.tempObj.idx);
        }

        if (document.getElementById('inputSearch').value == 'Улица') {
            if (this.state.tempObj.type == 'empty') {
                let index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);

                this.state.tempObj = {
                    idx: this.state.tempObj.idx,
                    type: 'street',
                    new_name: '',
                    old_name: '',
                    description: '',
                    direction: '',
                    images: '',
                    start_lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    start_long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long) ? (this.state.tempObj.start_long) : (this.state.tempObj.lng),
                    end_lat: '0',
                    end_long: '0',
                    isDeleted: false
                };

                this.state.points[index] = this.state.tempObj;
            }

            if (this.state.tempObj.type == 'monument') {
                let index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);

                this.state.tempObj = {
                    idx: this.state.tempObj.idx,
                    type: 'street',
                    new_name: '',
                    old_name: '',
                    description: '',
                    direction: '',
                    images: '',
                    start_lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    start_long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long) ? (this.state.tempObj.start_long) : (this.state.tempObj.lng),
                    end_lat: '0',
                    end_long: '0',
                    isDeleted: false
                };

                this.state.points[index] = this.state.tempObj;
            }


            if (this.state.tempObj.type == 'table') {
                let index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);

                this.state.tempObj = {
                    idx: this.state.tempObj.idx,
                    type: 'street',
                    new_name: '',
                    old_name: '',
                    description: '',
                    direction: '',
                    images: '',
                    start_lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    start_long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long) ? (this.state.tempObj.start_long) : (this.state.tempObj.lng),
                    end_lat: '0',
                    end_long: '0',
                    isDeleted: false
                };

                this.state.points[index] = this.state.tempObj;
            }

            await this.openInfo(this.state.tempObj.idx);
        }
    }

    handleChangeSearchObject = async (e) => {
        if (e.key === 'Enter') {
            this.handleSearchObject();
        }
    }

    saveMap = map => {
        this.map = map;
        this.setState({
            isMapInit: true
        });
    };

    addMarker = (e) => {
        const { markers, points } = this.state
        markers.push(e.latlng)
        points.push({
            idx: "MarkerN" + points.length,
            lat: e.latlng.lat,
            long: e.latlng.lng,
            type: 'empty',
            isDeleted: false
        })
        console.log(e.latlng);
        this.setState({
            markers: markers,
            points: points
        })
    }

    render() {
        let person = new Person();

        let iconMapUrl = null;

        let iconMapYou = null;

        let focusObject = null;

        let zoom = null;

        if (person.getThemeTone() === 'light') {
            iconMapYou = ImgMapYouDark;
            iconMapUrl = ImgMapPinDark;
        }

        if (person.getThemeTone() === 'dark') {
            iconMapYou = ImgMapYouLight;
            iconMapUrl = ImgMapPinLight;
        }

        const iconPin = require('leaflet').icon({
            iconUrl: iconMapUrl,
            fillColor: 'blue',
            className: 'fa-fort-awesome',
            iconSize: [
                38, 55
            ],
            iconAnchor: [
                22, 55
            ],
            popupAnchor: [-3, -56]
        });

        const iconYou = require('leaflet').icon({
            iconUrl: iconMapYou,
            fillColor: 'blue',
            className: 'fa-fort-awesome',
            iconSize: [
                38, 55
            ],
            iconAnchor: [
                22, 55
            ],
            popupAnchor: [-3, -56]
        });

        let linkMap = null;

        if (person.getThemeTone() === 'light')
            linkMap = 'https://api.mapbox.com/styles/v1/xihnik/ckpla9u5d1rmz17qt5yylvfh9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieGlobmlrIiwiYSI6ImNrb25oMzJiZTAxZXQycm51b2RrbHZvZWQifQ.qmlv4rTGiUZCTDYDIvbdxg';

        if (person.getThemeTone() === 'dark')
            linkMap = 'https://api.mapbox.com/styles/v1/xihnik/ckonhbulp3g6e18ogetaszhiu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieGlobmlrIiwiYSI6ImNrb25oMzJiZTAxZXQycm51b2RrbHZvZWQifQ.qmlv4rTGiUZCTDYDIvbdxg';

        return (
            <LeafletMap
                center={this.state.focusLocation}
                zoom={6} minZoom={6} maxZoom={18} attributionControl={true} zoomControl={false} doubleClickZoom={false} scrollWheelZoom={true} dragging={true} animate={true} easeLinearity={0.35} ref={this.saveMap} onClick={this.addMarker}>

                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url={linkMap} />

                {(this.state.isYourLocation) ? <Marker
                    icon={iconYou}
                    position={new Array(this.state.focusLocation.lat, this.state.focusLocation.lng)}
                >
                    <Popup fill="#000000">
                        <b><center>Ваша позиция</center></b>
                        <b>[{this.state.focusLocation.lat}, {this.state.focusLocation.lng}]</b>
                    </Popup>
                </Marker> : null}

                {this.state.markers.map((position, idx) =>
                    (position.lat) ? <div>
                        <Marker id={'MarkerN' + idx} position={position} icon={iconPin}
                            onpopupopen={async () => (document.getElementById("blockFullInfo")) ? await this.openInfo('MarkerN' + idx + "|" + position.lat + "|" + position.lng) : null}
                            onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}
                        >
                            <Popup fill="#000000">
                                <b>Точка на карте</b>
                            </Popup>:

                        </Marker>
                    </div> :
                        <div>
                            <Marker
                                icon={iconPin}
                                position={new Array(position.start_lat, position.start_long)}
                                onpopupopen={async () => (document.getElementById("blockFullInfo")) ? await this.openInfo('MarkerN' + idx + "|" + position.start_lat + "|" + position.start_lng + "|" + position.end_lat + "|" + position.end_lng) : null}
                                onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}
                            >

                                <Popup fill="#000000">
                                    <b>Улица</b><br />
                                    <b>Начало</b>
                                </Popup>

                            </Marker>

                            <Marker
                                icon={iconPin}
                                position={new Array(position.end_lat, position.end_long)}
                                onpopupopen={async () => (document.getElementById("blockFullInfo")) ? await this.openInfo('MarkerN' + idx + "|" + position.end_lat + "|" + position.end_lng) : null}
                                onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}
                            >

                                <Popup fill="#000000">
                                    <b>Улица</b><br />
                                    <b>Конец</b>
                                </Popup>

                            </Marker>

                            {this.state.isMapInit && <Routing map={this.map} person={person} lineColor={person.getThemeColors().svg.fill} startPoint={{ lat: position.start_lat, long: position.start_long }} endPoint={{ lat: position.end_lat, long: position.end_long }} />}
                        </div>
                )}

                <datalist id="inpSearchHelp">
                    <option value="Монумент"></option>
                    <option value="Табличка"></option>
                    <option value="Улица"></option>
                </datalist>

                <Control>
                    <div id="boxMenHere" style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().svg.fill }} onClick={this.handleGoToMe}>
                        <ImgManHere id="imgMenHere" fill={person.getThemeColors().svg.fill} />
                    </div>

                    <div id="box" style={{
                        backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor,
                        borderColor: person.getThemeColors().svg.fill,
                        display: 'none'
                    }}>
                        <div id="blockSearch">
                            <div id="boxInput">
                                <input id="inputSearch" list="inpSearchHelp" style={{
                                    color: person.getThemeColors().text.color,
                                    backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor,
                                    borderColor: person.getThemeColors().svg.fill
                                }}
                                    placeholder={"Поменять тип..."}
                                    onKeyDown={this.handleChangeSearchObject}
                                    className={(person.getThemeTone() === 'light') ? 'dark' : 'light'}>
                                </input>
                                <div id="boxMopClear" style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().svg.fill }} onClick={this.handleClearSearch}>
                                    <ImgMop id="imgMopClear" fill={person.getThemeColors().svg.fill} />
                                </div>

                                <div id="boxMagnifySearch" style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().svg.fill }} onClick={this.handleSearchObject}>
                                    <ImgExchange id="imgMagnifySearch" fill={person.getThemeColors().svg.fill} />
                                </div>
                            </div>
                        </div>

                        <this.BlockFullInfo person={person} />

                        <div style={{
                            borderColor: person.getThemeColors().svg.fill
                        }} id="blockObjectActions">
                            <p className="text" style={person.getThemeColors().text} onClick={() => {
                                document.getElementById('objInfo').style.display = 'none';
                                document.getElementById('fullInfoLine').style.display = 'none';

                                if (document.getElementById('boxObjectActions').style.display == 'none')
                                    document.getElementById('boxObjectActions').style.display = 'flex';
                                else
                                    document.getElementById('boxObjectActions').style.display = 'none';


                                if (document.getElementById('fullObjectActionLine').style.display == 'none')
                                    document.getElementById('fullObjectActionLine').style.display = 'block';
                                else
                                    document.getElementById('fullObjectActionLine').style.display = 'none';

                                document.getElementById('boxGlobalActions').style.display = 'none';
                                document.getElementById('fullGlobalActionLine').style.display = 'none';
                            }}>Действия с объектом</p>

                            <hr style={{ backgroundColor: person.getThemeColors().backgoundColorFirst.backgroundColor, borderColor: person.getThemeColors().backgoundColorFirst.backgroundColor, display: 'none' }} id="fullObjectActionLine" />

                            <div id="boxObjectActions" style={{ display: 'none' }}>

                                <div id="boxCommitChanges" style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().svg.fill }} onClick={this.handleCommitChanges}>
                                    <ImgCommitChanges id="imgCommitChanges" fill={person.getThemeColors().svg.fill} />
                                </div>

                                <div id="boxDeletePoint" style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().svg.fill }}>
                                    <ImgDeletePoint id="imgDeletePoint" fill={person.getThemeColors().svg.fill} onClick={this.handleDeletePoint} />
                                </div>
                            </div>
                        </div>
                        <div style={{
                            borderColor: person.getThemeColors().svg.fill
                        }} id="blockGlobalActions">
                            <p className="text" style={person.getThemeColors().text} onClick={() => {
                                document.getElementById('objInfo').style.display = 'none';
                                document.getElementById('fullInfoLine').style.display = 'none';

                                document.getElementById('boxObjectActions').style.display = 'none';
                                document.getElementById('fullObjectActionLine').style.display = 'none';

                                if (document.getElementById('boxGlobalActions').style.display == 'none')
                                    document.getElementById('boxGlobalActions').style.display = 'flex';
                                else
                                    document.getElementById('boxGlobalActions').style.display = 'none';


                                if (document.getElementById('fullGlobalActionLine').style.display == 'none')
                                    document.getElementById('fullGlobalActionLine').style.display = 'block';
                                else
                                    document.getElementById('fullGlobalActionLine').style.display = 'none';
                            }}>Глобальные действия</p>

                            <hr style={{ backgroundColor: person.getThemeColors().backgoundColorFirst.backgroundColor, borderColor: person.getThemeColors().backgoundColorFirst.backgroundColor, display: 'none' }} id="fullGlobalActionLine" />

                            <div id="boxGlobalActions" style={{ display: 'none' }}>
                                <div id="boxDownload" style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().svg.fill }} onClick={this.downloadTxtFile}>
                                    <ImgUpload id="imgDownload" fill={person.getThemeColors().svg.fill} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Control>
            </LeafletMap >);
    }
}