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
import { ReactComponent as ImgExchange } from '../../assets/images/svg/exchange.svg';
import { ReactComponent as ImgUpload } from '../../assets/images/svg/upload.svg';
import { ReactComponent as ImgManHere } from '../../assets/images/svg/manHere.svg';

import Person from '../../utils/person.jsx';

export default class extends React.Component {
    constructor({ markers, points }) {
        super();

        this.state = {
            isMapInit: false,
            isYourLocation: false,
            isSelectStreetTo: false,
            isSelectPoint: false,
            isUpdatedStreet: false,
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
        this.updateStreet(true);

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

        ReactDOM.render(<this.ObjectInfo state={this.state} person={person} object={this.state.tempObj} type={this.state.tempObj.type} />, document.getElementById('objInfo'));
    }

    downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(this.state.points)], { type: 'text/plain' });
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

            const inputInfoMonumentPictures = document.getElementById('inputInfoMonumentPictures');
            for (let index = 0; index < inputInfoMonumentPictures.files.length; index++) {
                this.state.tempObj.images.push(inputInfoMonumentPictures.files[index])
            }

            index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);

            if (index > -1)
                this.state.points[index] = this.state.tempObj;
        }

        if (this.state.tempObj.type == 'table') {
            this.state.tempObj.name = document.getElementById('infoTableName').value;
            this.state.tempObj.description = document.getElementById('infoTableDescription').value;
            this.state.tempObj.direction = document.getElementById('infoTableDirection').value;

            const inputInfoTablePictures = document.getElementById('inputInfoTablePictures');
            for (let index = 0; index < inputInfoTablePictures.files.length; index++) {
                this.state.tempObj.images.push(inputInfoTablePictures.files[index])
            }

            index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);

            if (index > -1)
                this.state.points[index] = this.state.tempObj;
        }

        if (this.state.tempObj.type == 'street') {
            this.state.tempObj.old_name = document.getElementById('infoStreetNewName').value;
            this.state.tempObj.new_name = document.getElementById('infoStreetOldName').value;
            this.state.tempObj.description = document.getElementById('infoStreetDescription').value;
            this.state.tempObj.direction = document.getElementById('infoStreetDirection').value;

            const inputInfoStreetPictures = document.getElementById('inputInfoStreetPictures');
            for (let index = 0; index < inputInfoStreetPictures.files.length; index++) {
                this.state.tempObj.images.push(inputInfoStreetPictures.files[index])
            }

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

    ObjectInfo({ state, person, object, type }) {
        if (type == 'monument')
            return (
                <div>
                    {(object.isDeleted) ? <p className="text" style={person.getThemeColors().text} onClick={() => {
                    }}><b style={{ color: 'red' }}>Удаленный</b> Монумент</p> : <p className="text" style={person.getThemeColors().text} onClick={() => {
                    }}>Монумент</p>}

                    <textarea id="infoMonumentName" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Название" disabled={false} editable={true} placeholder="Название">{object.name}</textarea>

                    <textarea id="infoMonumentDescription" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Описание" disabled={false} editable={true} placeholder="Описание">{object.description}</textarea>

                    <textarea id="infoMonumentDirection" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Направление" disabled={false} editable={true} placeholder="Направление">{object.direction}</textarea>

                    <input id="inputInfoMonumentPictures" style={{ display: 'none' }} type="file" multiple accept="image/png, image/jpeg" />

                    <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} id="btnInfoMonumentPictures" onClick={() => {
                        var input = document.getElementById('inputInfoMonumentPictures');
                        input.click();
                    }}>Выбор изображений</button>

                    <textarea id="infoMonumentLatLong" class="text" style={{ display: 'none', color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Позиция" disabled={false} editable={false} placeholder="Позиция" value={'[' + object.lat + ', ' + object.long + ']'}></textarea>

                    <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} id="btnInfoMonumentLatLong" onClick={() => {
                        state.isSelectPoint = true;
                        state.isSelectStreetFrom = false;
                        state.isSelectStreetTo = false;
                    }}>Отметить позицию</button>
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

                    <input id="inputInfoTablePictures" style={{ display: 'none' }} type="file" multiple accept="image/png, image/jpeg" />

                    <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} id="btnInfoTablePictures" onClick={() => {
                        var input = document.getElementById('inputInfoTablePictures');
                        input.click();
                    }}>Выбор изображений</button>

                    <textarea id="infoTableLatLong" class="text" style={{ display: 'none', color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Позиция" disabled={false} editable={false} placeholder="Позиция" value={'[' + object.lat + ', ' + object.long + ']'}></textarea>

                    <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} id="btnInfoTableLatLong" onClick={() => {
                        state.isSelectPoint = true;
                        state.isSelectStreetFrom = false;
                        state.isSelectStreetTo = false;
                    }}>Отметить позицию</button>
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

                    <input id="inputInfoStreetPictures" style={{ display: 'none' }} type="file" multiple accept="image/png, image/jpeg" />

                    <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} id="btnInfoStreetPictures" onClick={() => {
                        var input = document.getElementById('inputInfoStreetPictures');
                        input.click();
                    }}>Выбор изображений</button>

                    <textarea id="infoStreetFrom" class="text" style={{ display: 'none', color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Позиция начала" disabled={false} editable={false} placeholder="Позиция начала" value={'[' + object.start_lat + ', ' + object.start_long + ']'}></textarea>

                    <textarea id="infoStreetTo" class="text" style={{ display: 'none', color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Позиция конца" disabled={false} editable={false} placeholder="Позиция конца">{'[' + object.end_lat + ', ' + object.end_long + ']'}</textarea>

                    <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} id="btnInfoStreetFrom" onClick={() => {
                        state.isSelectPoint = false;
                        state.isSelectStreetFrom = true;
                        state.isSelectStreetTo = false;
                    }}>Отметить начало</button>

                    <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} id="btnInfoStreetTo" onClick={() => {
                        state.isSelectPoint = false;
                        state.isSelectStreetFrom = false;
                        state.isSelectStreetTo = true;
                    }}>Отметить конец</button>
                </div >
            );

        if (type == 'empty')
            return (
                <div>
                    <textarea class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Позиция точки" disabled={false} editable={true} placeholder="Позиция точки" value={'[' + object.lat + ', ' + object.long + ']'}></textarea>
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
                <hr style={{ backgroundColor: '#fb9300', borderColor: '#fb9300', display: 'none' }} id="fullInfoLine" />
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
                    images: [],
                    lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long),
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
                    images: [],
                    lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long),
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
                    images: [],
                    lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long),
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
                    images: [],
                    lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long),
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
                    images: [],
                    lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long),
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
                    images: [],
                    lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long),
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
                    images: [],
                    start_lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    start_long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long),
                    end_lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    end_long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long),
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
                    images: [],
                    start_lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    start_long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long),
                    end_lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    end_long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long),
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
                    images: [],
                    start_lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    start_long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long),
                    end_lat: (this.state.tempObj.lat) ? (this.state.tempObj.lat) : (this.state.tempObj.start_lat),
                    end_long: (this.state.tempObj.long) ? (this.state.tempObj.long) : (this.state.tempObj.start_long),
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
        if (!this.state.isSelectStreetTo && !this.state.isSelectStreetFrom && !this.state.isSelectPoint) {
            const { markers, points } = this.state
            markers.push(e.latlng)
            points.push({
                idx: "MarkerN" + points.length,
                lat: e.latlng.lat,
                long: e.latlng.lng,
                type: 'empty',
                isDeleted: false
            })

            this.setState({
                markers: markers,
                points: points
            })

            this.updateStreet(true);
        }

        if (this.state.isSelectStreetTo) {
            const { tempObj, points } = this.state

            tempObj.end_lat = e.latlng.lat;
            tempObj.end_long = e.latlng.lng;

            let index = points.findIndex((point) => point.idx == tempObj.idx);
            points[index] = tempObj;

            this.setState({
                isSelectStreetTo: false,
                tempObj: tempObj,
                points: points
            })

            this.updateStreet(true);
        }

        if (this.state.isSelectStreetFrom) {
            const { tempObj, points } = this.state

            tempObj.start_lat = e.latlng.lat;
            tempObj.start_long = e.latlng.lng;

            let index = points.findIndex((point) => point.idx == tempObj.idx);
            points[index] = tempObj;

            this.setState({
                isSelectStreetTo: false,
                tempObj: tempObj,
                points: points
            })

            this.updateStreet(true);
        }

        if (this.state.isSelectPoint) {
            const { tempObj, points } = this.state

            tempObj.lat = e.latlng.lat;
            tempObj.long = e.latlng.lng;

            let index = points.findIndex((point) => point.idx == tempObj.idx);
            points[index] = tempObj;

            this.setState({
                isSelectPoint: false,
                tempObj: tempObj,
                points: points
            })
        }
    }

    updateStreet = (status) => {
        this.setState({
            isUpdatedStreet: status
        })
    }

    render() {
        let person = new Person();

        let iconMapUrl = null;

        let iconMapYou = null;

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
                    (this.state.points.find((point) => point.idx == 'MarkerN' + idx).isDeleted) ? <div></div> :
                        (this.state.points.find((point) => point.idx == 'MarkerN' + idx).lat && this.state.tempObj != null && 'MarkerN' + idx === this.state.tempObj.idx) ?
                            <div>
                                <Marker id={this.state.tempObj.idx} position={new Array(this.state.tempObj.lat, this.state.tempObj.long)} icon={iconPin}
                                    onpopupopen={async () => (document.getElementById("blockFullInfo")) ? await this.openInfo('MarkerN' + idx + "|" + this.state.tempObj.lat + "|" + this.state.tempObj.long) : null}
                                    onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}
                                >
                                    <Popup fill="#000000">
                                        <b>Точка на карте</b>
                                    </Popup>
                                </Marker>
                            </div> :
                            (this.state.points.find((point) => point.idx == 'MarkerN' + idx).lat) ? <div>
                                <Marker id={'MarkerN' + idx} position={new Array(this.state.points.find((point) => point.idx == 'MarkerN' + idx).lat, this.state.points.find((point) => point.idx == 'MarkerN' + idx).long)} icon={iconPin}
                                    onpopupopen={async () => (document.getElementById("blockFullInfo")) ? await this.openInfo('MarkerN' + idx + "|" + this.state.points.find((point) => point.idx == 'MarkerN' + idx).lat + "|" + this.state.points.find((point) => point.idx == 'MarkerN' + idx).long) : null}
                                    onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}
                                >
                                    <Popup fill="#000000">
                                        <b>Точка на карте</b>
                                    </Popup>
                                </Marker>
                            </div> :
                                (this.state.tempObj !== null && this.state.tempObj.idx === 'MarkerN' + idx) ? <div>
                                    <Marker
                                        icon={iconPin}
                                        position={new Array(this.state.tempObj.start_lat, this.state.tempObj.start_long)}
                                        onpopupopen={async () => (document.getElementById("blockFullInfo")) ? await this.openInfo('MarkerN' + idx + "|" + this.state.tempObj.start_lat + "|" + this.state.tempObj.end_long + "|" + this.state.tempObj.end_lat + "|" + this.state.tempObj.end_long) : null}
                                        onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}
                                    >
                                        <Popup fill="#000000">
                                            <b>Улица</b><br />
                                            <b>Начало</b>
                                        </Popup>
                                    </Marker>

                                    <Marker
                                        icon={iconPin}
                                        position={new Array(this.state.tempObj.end_lat, this.state.tempObj.end_long)}
                                        onpopupopen={async () => (document.getElementById("blockFullInfo")) ? await this.openInfo('MarkerN' + idx + "|" + this.state.tempObj.end_lat + "|" + this.state.tempObj.end_long) : null}
                                        onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}
                                    >
                                        <Popup fill="#000000">
                                            <b>Улица</b><br />
                                            <b>Конец</b>
                                        </Popup>
                                    </Marker>

                                    {this.state.isMapInit && this.state.isUpdatedStreet && this.updateStreet(false)}

                                    {this.state.isMapInit && !this.state.isUpdatedStreet && <Routing map={this.map} person={person} lineColor={'#fb9300'} startPoint={{ lat: this.state.tempObj.start_lat, long: this.state.tempObj.start_long }} endPoint={{ lat: this.state.tempObj.end_lat, long: this.state.tempObj.end_long }} />}
                                </div> :
                                    <div>
                                        <Marker
                                            icon={iconPin}
                                            position={new Array(this.state.points.find((point) => point.idx == 'MarkerN' + idx).start_lat, this.state.points.find((point) => point.idx == 'MarkerN' + idx).start_long)}
                                            onpopupopen={async () => (document.getElementById("blockFullInfo")) ? await this.openInfo('MarkerN' + idx + "|" + this.state.points.find((point) => point.idx == 'MarkerN' + idx).start_lat + "|" + this.state.points.find((point) => point.idx == 'MarkerN' + idx).start_long + "|" + this.state.points.find((point) => point.idx == 'MarkerN' + idx).end_lat + "|" + this.state.points.find((point) => point.idx == 'MarkerN' + idx).end_long) : null}
                                            onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}>
                                            <Popup fill="#000000">
                                                <b>Улица</b><br />
                                                <b>Начало</b>
                                            </Popup>

                                        </Marker>

                                        <Marker
                                            icon={iconPin}
                                            position={new Array(this.state.points.find((point) => point.idx == 'MarkerN' + idx).end_lat, this.state.points.find((point) => point.idx == 'MarkerN' + idx).end_long)}
                                            onpopupopen={async () => (document.getElementById("blockFullInfo")) ? await this.openInfo('MarkerN' + idx + "|" + this.state.points.find((point) => point.idx == 'MarkerN' + idx).end_lat + "|" + this.state.points.find((point) => point.idx == 'MarkerN' + idx).end_long) : null}
                                            onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}>
                                            <Popup fill="#000000">
                                                <b>Улица</b><br />
                                                <b>Конец</b>
                                            </Popup>
                                        </Marker>

                                        {this.state.isMapInit && !this.state.isUpdatedStreet && <Routing map={this.map} person={person} lineColor={person.getThemeColors().svg.fill} startPoint={{ lat: this.state.points.find((point) => point.idx == 'MarkerN' + idx).start_lat, long: this.state.points.find((point) => point.idx == 'MarkerN' + idx).start_long }} endPoint={{ lat: this.state.points.find((point) => point.idx == 'MarkerN' + idx).end_lat, long: this.state.points.find((point) => point.idx == 'MarkerN' + idx).end_long }} />}

                                        {this.state.isMapInit && this.state.isUpdatedStreet && this.updateStreet(false)}
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

                                <div id="boxExchange" style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().svg.fill }} onClick={this.handleSearchObject}>
                                    <ImgExchange id="imgExchange" fill={person.getThemeColors().svg.fill} />
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

                            <hr style={{ backgroundColor: person.getThemeColors().text.color, borderColor: person.getThemeColors().svg.fill, display: 'none' }} id="fullObjectActionLine" />

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

                            <hr style={{ backgroundColor: person.getThemeColors().text.color, borderColor: person.getThemeColors().svg.fill, display: 'none' }} id="fullGlobalActionLine" />

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