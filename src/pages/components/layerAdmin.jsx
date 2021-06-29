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
import SimpleSlider from './simpleSlider.jsx';
import Server from '../../utils/server.jsx';

export default class extends React.Component {
    constructor({ markers, points }) {
        super();
        this.state = {
            isMapInit: false,
            isYourLocation: false,
            isSelectStreetTo: false,
            isSelectStreetFrom: false,
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
        let person = new Person();

        if (idx.split('|').length == 1)
            this.setState({ tempObj: this.state.points.find((point) => point.idx == idx) });

        if (idx.split('|').length > 1)
            this.setState({ tempObj: this.state.points.find((point) => point.idx == idx.split('|')[0]) });

        if (document.getElementById('blockFullInfo'))
            document.getElementById('blockFullInfo').style.display = 'block';

        if (document.getElementById('box'))
            document.getElementById('box').style.display = 'block';

        if (this.state.tempObj.type == 'empty') {
            if (document.getElementById('infoMonumentLatLong'))
                document.getElementById('infoMonumentLatLong').style.display = 'none';

            if (document.getElementById('infoTableLatLong'))
                document.getElementById('infoTableLatLong').style.display = 'none';

            if (document.getElementById('infoStreetFrom'))
                document.getElementById('infoStreetFrom').style.display = 'none';

            if (document.getElementById('infoStreetTo'))
                document.getElementById('infoStreetTo').style.display = 'none';

            ReactDOM.render(<div>
                <textarea class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Позиция точки" disabled={false} editable={true} placeholder="Позиция точки" value={'[' + this.state.tempObj.lat + ', ' + this.state.tempObj.long + ']'}></textarea>
            </div>, document.getElementById('objInfo'));
        }

        if (this.state.tempObj.type == 'monument') {
            if (document.getElementById('infoTableLatLong'))
                document.getElementById('infoTableLatLong').style.display = 'none';

            if (document.getElementById('infoStreetFrom'))
                document.getElementById('infoStreetFrom').style.display = 'none';

            if (document.getElementById('infoStreetTo'))
                document.getElementById('infoStreetTo').style.display = 'none';

            ReactDOM.render(<div>
                {(this.state.tempObj.isDeleted) ? <p className="text" style={person.getThemeColors().text} onClick={() => {
                }}><b style={{ color: 'red' }}>Удаленный</b> Монумент</p> : <p className="text" style={person.getThemeColors().text} onClick={() => {
                }}>Монумент</p>}

                <div id="boxSlider">
                    {(this.state.tempObj.images.length != 0) ? <SimpleSlider id="imgSlider" person={person} imgsUrl={this.state.tempObj.images} /> : <div></div>}
                </div>

                <input id="inputInfoPictures" style={{ display: 'none' }} type="file" multiple accept="image/png, image/jpeg" onClick={
                    () => {
                        document.getElementById("inputInfoPictures").files = null;
                        ReactDOM.render(<div></div>, document.getElementById('boxSlider'));
                    }} onChange={(e) => {
                        let fileList = e.target.files;
                        let tempImgsUrls = [];

                        for (var i = 0, numFiles = fileList.length; i < numFiles; i++)
                            tempImgsUrls.push(window.URL.createObjectURL(fileList[i]));

                        ReactDOM.render(<SimpleSlider id="imgSlider" person={person} imgsUrl={tempImgsUrls} />, document.getElementById('boxSlider'));
                    }}
                />

                <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} id="btnInfoPictures" onClick={() => {
                    var input = document.getElementById('inputInfoPictures');
                    input.click();
                }}>Выбор изображений</button>

                <textarea id="infoMonumentName" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Название" disabled={false} editable={true} placeholder="Название">{this.state.tempObj.name}</textarea>

                <textarea id="infoMonumentDescription" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Описание" disabled={false} editable={true} placeholder="Описание">{this.state.tempObj.description}</textarea>

                <textarea id="infoMonumentDirection" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Направление" disabled={false} editable={true} placeholder="Направление">{this.state.tempObj.direction}</textarea>

                <textarea id="infoMonumentLatLong" class="text" style={{ display: 'none', color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Позиция" disabled={false} editable={false} placeholder="Позиция" value={'[' + this.state.tempObj.lat + ', ' + this.state.tempObj.long + ']'}></textarea>

                <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} id="btnInfoMonumentLatLong" onClick={() => {
                    this.state.isSelectPoint = true;
                    this.state.isSelectStreetFrom = false;
                    this.state.isSelectStreetTo = false;
                }}>Отметить позицию</button>
            </div>, document.getElementById('objInfo'));
        }

        if (this.state.tempObj.type == 'table') {
            if (document.getElementById('infoMonumentLatLong'))
                document.getElementById('infoMonumentLatLong').style.display = 'none';

            if (document.getElementById('infoStreetFrom'))
                document.getElementById('infoStreetFrom').style.display = 'none';

            if (document.getElementById('infoStreetTo'))
                document.getElementById('infoStreetTo').style.display = 'none';

            ReactDOM.render(<div>
                {(this.state.tempObj.isDeleted) ? <p className="text" style={person.getThemeColors().text} onClick={() => {
                }}><b style={{ color: 'red' }}>Удаленная</b> Табличка</p> : <p className="text" style={person.getThemeColors().text} onClick={() => {
                }}>Табличка</p>}

                <div id="boxSlider">
                    {(this.state.tempObj.images.length != 0) ? <SimpleSlider id="imgSlider" person={person} imgsUrl={this.state.tempObj.images} /> : <div></div>}
                </div>

                <input id="inputInfoPictures" style={{ display: 'none' }} type="file" multiple accept="image/png, image/jpeg" onClick={
                    () => {
                        document.getElementById("inputInfoPictures").files = null;
                        ReactDOM.render(<div></div>, document.getElementById('boxSlider'));
                    }} onChange={(e) => {
                        let fileList = e.target.files;
                        let tempImgsUrls = [];

                        for (var i = 0, numFiles = fileList.length; i < numFiles; i++)
                            tempImgsUrls.push(window.URL.createObjectURL(fileList[i]));

                        ReactDOM.render(<SimpleSlider id="imgSlider" person={person} imgsUrl={tempImgsUrls} />, document.getElementById('boxSlider'));
                    }}
                />

                <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} id="btnInfoPictures" onClick={() => {
                    var input = document.getElementById('inputInfoPictures');
                    input.click();
                }}>Выбор изображений</button>

                <textarea id="infoTableName" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Название" disabled={false} editable={true} placeholder="Название">{this.state.tempObj.name}</textarea>

                <textarea id="infoTableDescription" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Описание" disabled={false} editable={true} placeholder="Описание">{this.state.tempObj.description}</textarea>

                <textarea id="infoTableDirection" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Направление" disabled={false} editable={true} placeholder="Направление">{this.state.tempObj.direction}</textarea>

                <textarea id="infoTableLatLong" class="text" style={{ display: 'none', color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Позиция" disabled={false} editable={false} placeholder="Позиция" value={'[' + this.state.tempObj.lat + ', ' + this.state.tempObj.long + ']'}></textarea>

                <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} id="btnInfoTableLatLong" onClick={() => {
                    this.state.isSelectPoint = true;
                    this.state.isSelectStreetFrom = false;
                    this.state.isSelectStreetTo = false;
                }}>Отметить позицию</button>
            </div>, document.getElementById('objInfo'));
        }

        if (this.state.tempObj.type == 'street') {
            if (document.getElementById('infoMonumentLatLong'))
                document.getElementById('infoMonumentLatLong').style.display = 'none';

            if (document.getElementById('infoTableLatLong'))
                document.getElementById('infoTableLatLong').style.display = 'none';

            ReactDOM.render(<div>
                {(this.state.tempObj.isDeleted) ? <p className="text" style={person.getThemeColors().text} onClick={() => {
                }}><b style={{ color: 'red' }}>Удаленный</b> Улица</p> : <p className="text" style={person.getThemeColors().text} onClick={() => {
                }}>Улица</p>}

                <div id="boxSlider">
                    {(this.state.tempObj.images.length != 0) ? <SimpleSlider id="imgSlider" person={person} imgsUrl={this.state.tempObj.images} /> : <div></div>}
                </div>

                <input id="inputInfoPictures" style={{ display: 'none' }} type="file" multiple accept="image/png, image/jpeg" onClick={
                    () => {
                        document.getElementById("inputInfoPictures").files = null;
                        ReactDOM.render(<div></div>, document.getElementById('boxSlider'));
                    }} onChange={(e) => {
                        let fileList = e.target.files;
                        let tempImgsUrls = [];

                        for (var i = 0, numFiles = fileList.length; i < numFiles; i++)
                            tempImgsUrls.push(window.URL.createObjectURL(fileList[i]));

                        ReactDOM.render(<SimpleSlider id="imgSlider" person={person} imgsUrl={tempImgsUrls} />, document.getElementById('boxSlider'));
                    }}
                />

                <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} id="btnInfoPictures" onClick={() => {
                    var input = document.getElementById('inputInfoPictures');
                    input.click();
                }}>Выбор изображений</button>

                <textarea id="infoStreetNewName" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Новое название" disabled={false} editable={true} placeholder="Новое название">{this.state.tempObj.new_name}</textarea>

                <textarea id="infoStreetOldName" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Старое название" disabled={false} editable={true} placeholder="Старое название">{this.state.tempObj.old_name}</textarea>

                <textarea id="infoStreetDescription" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Описание" disabled={false} editable={true} placeholder="Описание">{this.state.tempObj.description}</textarea>

                <textarea id="infoStreetDirection" class="text" style={{ color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Направление" disabled={false} editable={true} placeholder="Направление">{this.state.tempObj.direction}</textarea>

                <textarea id="infoStreetFrom" class="text" style={{ display: 'none', color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Позиция начала" disabled={false} editable={false} placeholder="Позиция начала" value={'[' + this.state.tempObj.start_lat + ', ' + this.state.tempObj.start_long + ']'}></textarea>

                <textarea id="infoStreetTo" class="text" style={{ display: 'none', color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} title="Позиция конца" disabled={false} editable={false} placeholder="Позиция конца">{'[' + this.state.tempObj.end_lat + ', ' + this.state.tempObj.end_long + ']'}</textarea>

                <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} id="btnInfoStreetFrom" onClick={() => {
                    this.state.isSelectPoint = false;
                    this.state.isSelectStreetFrom = true;
                    this.state.isSelectStreetTo = false;
                }}>Отметить начало</button>

                <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} id="btnInfoStreetTo" onClick={() => {
                    this.state.isSelectPoint = false;
                    this.state.isSelectStreetFrom = false;
                    this.state.isSelectStreetTo = true;
                }}>Отметить конец</button>
            </div>, document.getElementById('objInfo'));
        }
    }

    downloadTxtFile = () => {
        alert('Начата отправка изменений на сервер');

        let server = new Server();
        if (server.setDBInfo(this.state.points))
            alert('Изменения были применены успешно');
        else
            alert('Ошибка сервера, сообщите в тех. поддержку');
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
            const inputInfoPictures = document.getElementById('inputInfoPictures');

            if (inputInfoPictures.files.length > 0)
                this.state.tempObj.images = [];

            for (let index = 0; index < inputInfoPictures.files.length; index++)
                this.state.tempObj.images.push(window.URL.createObjectURL(inputInfoPictures.files[index]));

            index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);
            if (index > -1)
                this.state.points[index] = this.state.tempObj;
        }

        if (this.state.tempObj.type == 'table') {
            this.state.tempObj.name = document.getElementById('infoTableName').value;
            this.state.tempObj.description = document.getElementById('infoTableDescription').value;
            this.state.tempObj.direction = document.getElementById('infoTableDirection').value;
            const inputInfoPictures = document.getElementById('inputInfoPictures');

            if (inputInfoPictures.files.length > 0)
                this.state.tempObj.images = [];

            for (let index = 0; index < inputInfoPictures.files.length; index++)
                this.state.tempObj.images.push(window.URL.createObjectURL(inputInfoPictures.files[index]));

            index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);
            if (index > -1)
                this.state.points[index] = this.state.tempObj;
        }

        if (this.state.tempObj.type == 'street') {
            this.state.tempObj.old_name = document.getElementById('infoStreetOldName').value;
            this.state.tempObj.new_name = document.getElementById('infoStreetNewName').value;
            this.state.tempObj.description = document.getElementById('infoStreetDescription').value;
            this.state.tempObj.direction = document.getElementById('infoStreetDirection').value;
            const inputInfoPictures = document.getElementById('inputInfoPictures');

            if (inputInfoPictures.files.length > 0)
                this.state.tempObj.images = [];

            for (let index = 0; index < inputInfoPictures.files.length; index++)
                this.state.tempObj.images.push(window.URL.createObjectURL(inputInfoPictures.files[index]));

            index = this.state.points.findIndex((point) => point.idx == this.state.tempObj.idx);
            if (index > -1)
                this.state.points[index] = this.state.tempObj;
        }

        alert('Объект был сохранен');
    }

    handleDeletePoint = async () => {
        let index = this.state.points.findIndex((pont) => pont.idx == this.state.tempObj.idx);
        this.state.points[index].isDeleted = true;
        this.state.tempObj = this.state.points[index];
        await this.openInfo(this.state.tempObj.idx);
        await this.closeInfo();
        alert('Объект был удален');
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

    handleExchangeObject = async () => {
        let messageText = "Тип объекта был изменен";

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
                    isDeleted: false,
                    rating: this.state.tempObj.rating
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
                    isDeleted: false,
                    rating: this.state.tempObj.rating
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
                    isDeleted: false,
                    rating: this.state.tempObj.rating
                };
                this.state.points[index] = this.state.tempObj;
            }

            await this.openInfo(this.state.tempObj.idx);
            alert(messageText);
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
                    isDeleted: false,
                    rating: this.state.tempObj.rating
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
                    isDeleted: false,
                    rating: this.state.tempObj.rating
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
                    isDeleted: false,
                    rating: this.state.tempObj.rating
                };
                this.state.points[index] = this.state.tempObj;
            }
            await this.openInfo(this.state.tempObj.idx);
            alert(messageText);
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
                    isDeleted: false,
                    rating: this.state.tempObj.rating
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
                    isDeleted: false,
                    rating: this.state.tempObj.rating
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
                    isDeleted: false,
                    rating: this.state.tempObj.rating
                };
                this.state.points[index] = this.state.tempObj;
            }
            await this.openInfo(this.state.tempObj.idx);
            alert(messageText);
        }
    }

    handleChangeSearchObject = async (e) => {
        if (e.key === 'Enter') {
            this.handleExchangeObject();
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
                zoom={8} minZoom={6} maxZoom={18} attributionControl={true} zoomControl={false} doubleClickZoom={false} scrollWheelZoom={true} dragging={true} animate={true} easeLinearity={0.35} ref={this.saveMap} onClick={this.addMarker}>

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
                                    onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}>
                                    <Popup fill="#000000">
                                        <b>Точка на карте</b>
                                    </Popup>
                                </Marker>
                            </div> :
                            (this.state.points.find((point) => point.idx == 'MarkerN' + idx).lat) ? <div>
                                <Marker id={'MarkerN' + idx} position={new Array(this.state.points.find((point) => point.idx == 'MarkerN' + idx).lat, this.state.points.find((point) => point.idx == 'MarkerN' + idx).long)} icon={iconPin}
                                    onpopupopen={async () => (document.getElementById("blockFullInfo")) ? await this.openInfo('MarkerN' + idx + "|" + this.state.points.find((point) => point.idx == 'MarkerN' + idx).lat + "|" + this.state.points.find((point) => point.idx == 'MarkerN' + idx).long) : null}
                                    onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}>
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
                                        onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}>
                                        <Popup fill="#000000">
                                            <b>Улица</b><br />
                                            <b>Начало</b>
                                        </Popup>
                                    </Marker>

                                    <Marker
                                        icon={iconPin}
                                        position={new Array(this.state.tempObj.end_lat, this.state.tempObj.end_long)}
                                        onpopupopen={async () => (document.getElementById("blockFullInfo")) ? await this.openInfo('MarkerN' + idx + "|" + this.state.tempObj.end_lat + "|" + this.state.tempObj.end_long) : null}
                                        onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}>
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

                                <div id="boxExchange" style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().svg.fill }} onClick={this.handleExchangeObject}>
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