import React from 'react';
import ReactDOM from 'react-dom';
import ReactStars from "react-rating-stars-component";
import Control from 'react-leaflet-control';
import TinyURL from 'tinyurl';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import Routing from "./RoutingMachine.jsx";

import '../../styles/pages/map.scss';
import 'leaflet/dist/leaflet.css';

import ImgMapPinLight from '../../assets/images/svg/mapPinLight.svg';
import ImgMapPinDark from '../../assets/images/svg/mapPinDark.svg';

import ImgMapYouDark from '../../assets/images/svg/mapYouDark.svg';
import ImgMapYouLight from '../../assets/images/svg/mapYouLight.svg';

import { ReactComponent as ImgSendMail } from '../../assets/images/svg/sendMail.svg';
import { ReactComponent as ImgManHere } from '../../assets/images/svg/manHere.svg';
import { ReactComponent as ImgMop } from '../../assets/images/svg/mop.svg';
import { ReactComponent as ImgMagnify } from '../../assets/images/svg/magnify.svg';

import Server from '../../utils/server.jsx';
import Person from '../../utils/person.jsx';
import SimpleSlider from './simpleSlider.jsx';
import ShowQRCode from '../../utils/helpers/showQRCode.jsx';
import CONSTANTS from '../../utils/constants.jsx';

export default class extends React.Component {
    constructor({ monuments, tables, streets, aimObject, userLocation, focus, allObjects }) {
        super();

        this.state = {
            isMapInit: false,
            objects: {
                monuments: monuments,
                tables: tables,
                streets: streets
            },
            route: {
                startPoint: null,
                endPoint: null
            },
            height: 0,
            width: 0,
            aimObject: aimObject,
            allObjects: allObjects,
            userLocation: userLocation,
            focus: focus
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    closeInfo() {
        document.getElementById('blockFullInfo').style.display = 'none';
        document.getElementById('blockShare').style.display = 'none';

        ReactDOM.render(<this.ElementNull />, document.getElementById('objInfo'));
        ReactDOM.render(<this.ElementNull />, document.getElementById('objDescription'));
        ReactDOM.render(<this.ElementNull />, document.getElementById('objShare'));
    }

    openInfoBlock() {
        if (document.getElementById('objInfo').style.display === 'none')
            document.getElementById('objInfo').style.display = 'block';

        if (document.getElementById('objDescription').style.display === 'none')
            document.getElementById('objDescription').style.display = 'block';


        if (document.getElementById('fullInfoLine').style.display === 'none')
            document.getElementById('fullInfoLine').style.display = 'block';

        document.getElementById('routesLine').style.display = 'none';
        document.getElementById('blockCreateRoute').style.display = 'none';

        document.getElementById('objShare').style.display = 'none';
        document.getElementById('shareLine').style.display = 'none';
    }

    async openInfo(object) {
        document.getElementById('blockFullInfo').style.display = 'block';
        document.getElementById('blockShare').style.display = 'block';

        let person = new Person();
        let server = new Server();

        let imgsUrl = await server.getImgsOfObject({ scheme: object.id_scheme, id: object.id });

        let shortenURL = await TinyURL.shorten(`${CONSTANTS.SITE_ADDRESS}/map?scheme=${object.id_scheme}&id=${object.id}`);

        if (object.id_scheme === 1) {
            ReactDOM.render(<this.Monumentinfo state={this.state} person={person} object={object} imgsUrl={imgsUrl} />, document.getElementById('objInfo'));
            ReactDOM.render(<this.ObjectDescripion person={person} object={object} />, document.getElementById('objDescription'));
            ReactDOM.render(<this.ObjectShare state={this.state} person={person} object={object} shortenURL={shortenURL} />, document.getElementById('objShare'));
        }

        if (object.id_scheme === 2) {
            ReactDOM.render(<this.Tableinfo state={this.state} person={person} object={object} imgsUrl={imgsUrl} />, document.getElementById('objInfo'));
            ReactDOM.render(<this.ObjectDescripion person={person} object={object} />, document.getElementById('objDescription'));
            ReactDOM.render(<this.ObjectShare state={this.state} person={person} object={object} shortenURL={shortenURL} />, document.getElementById('objShare'));
        }

        if (object.id_scheme === 3) {
            ReactDOM.render(<this.StreetInfo state={this.state} person={person} object={object} imgsUrl={imgsUrl} />, document.getElementById('objInfo'));
            ReactDOM.render(<this.ObjectDescripion person={person} object={object} />, document.getElementById('objDescription'));
            ReactDOM.render(<this.ObjectShare state={this.state} person={person} object={object} shortenURL={shortenURL} />, document.getElementById('objShare'));
        }

        if (this.state.width >= 940)
            ShowQRCode(object);
    }

    ElementNull() {
        return (<div></div>);
    }

    ObjectShare({ state, person, object, shortenURL }) {
        return (
            <div id="boxShare">
                <div id="boxText">
                    {(state.width >= 940) ? <div id="qrBox" style={person.getThemeColors().headerColorPrimary}>
                        <canvas id="qrCode"></canvas>
                    </div> : <div />}
                    <ImgSendMail id="email" fill={person.getThemeColors().svg.fill} alt="Поделиться" onClick={() => {
                        window.open(`mailto:Введите почту?subject=Тема&body=Это письмо было отправлено из MapMemory. Приглашаем вас виртуально посетить объект "${(object.name) ? object.name : object.new_name}". Для этого перейдите по ссылке: ${shortenURL}`);
                    }} />
                </div>
            </div>
        );
    }

    handleToggleDescription = async () => {
        if (document.getElementById('fullScreenText').style.display === 'none') {
            document.getElementById('fullScreenText').style.display = 'table';
            document.getElementById('screenText').innerHTML = 'aaaa';
        }
        else {
            document.getElementById('fullScreenText').style.display = 'none';
        }
    }

    ObjectDescripion({ person, object }) {
        function handleToggleDescription() {
            if (document.getElementById('fullScreenText').style.display === 'none') {
                document.getElementById('fullScreenText').style.display = 'flex';
                document.getElementById('screenText').innerHTML = object.description;
            }
            else {
                document.getElementById('fullScreenText').style.display = 'none';
            }
        }

        return (
            <div>
                <button style={{
                    color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().backgoundColorFirst.backgroundColor
                }} onClick={handleToggleDescription} title="Описание">{object.description}</button>
            </div>
        );
    }

    Monumentinfo({ state, person, object, imgsUrl }) {
        return (
            <div>
                <div id="boxSlider">
                    <SimpleSlider person={person} imgsUrl={imgsUrl} />
                </div>
                <div className="text" style={person.getThemeColors().text} title="Тип">Монумент</div>
                <ReactStars
                    count={5}
                    onChange={async (newRating) => {
                        let server = new Server();

                        server.setRating({
                            person: person,
                            object: object,
                            newRating: newRating
                        })

                        let index = state.objects.monuments.findIndex((monument) => monument.id === object.id && monument.id_scheme === object.id_scheme);
                        state.objects.monuments[index].rating = newRating;
                    }}
                    size={(state.width >= 940) ? 45 : 30}
                    isHalf={true}
                    value={object.rating}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor={person.getThemeColors().backgoundColorFirst.backgroundColor}
                />
                <div className="text" style={person.getThemeColors().text} title="Название">{object.name}</div>
                <div className="text" style={person.getThemeColors().text} title="Направление">{object.direction}</div>
            </div >
        );
    }

    Tableinfo({ state, person, object, imgsUrl }) {
        return (
            <div>
                <div id="boxSlider">
                    <SimpleSlider person={person} imgsUrl={imgsUrl} />
                </div>
                <div className="text" style={person.getThemeColors().text} title="Тип">Табличка</div>
                <ReactStars
                    count={5}
                    onChange={async (newRating) => {
                        let server = new Server();

                        server.setRating({
                            person: person,
                            object: object,
                            newRating: newRating
                        })

                        let index = state.objects.tables.findIndex((table) => table.id === object.id && table.id_scheme === object.id_scheme);
                        state.objects.tables[index].rating = newRating;
                    }}
                    size={(state.width >= 940) ? 45 : 30}
                    isHalf={true}
                    value={object.rating}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor={person.getThemeColors().backgoundColorSecond.backgroundColor}
                />
                <div className="text" style={person.getThemeColors().text} title="Название">{object.name}</div>
                <div className="text" style={person.getThemeColors().text} title="Направление">{object.direction}</div>
            </div >
        );
    }

    StreetInfo({ state, person, object, imgsUrl }) {
        return (
            <div>
                <div id="boxSlider">
                    <SimpleSlider person={person} imgsUrl={imgsUrl} />
                </div>
                <div className="text" style={person.getThemeColors().text} title="Название">{object.new_name}</div>
                <ReactStars
                    count={5}
                    onChange={async (newRating) => {
                        let server = new Server();

                        server.setRating({
                            person: person,
                            object: object,
                            newRating: newRating
                        })

                        let index = state.objects.streets.findIndex((street) => street.id === object.id && street.id_scheme === object.id_scheme);
                        state.objects.streets[index].rating = newRating;
                    }}
                    size={(state.width >= 940) ? 45 : 30}
                    isHalf={true}
                    value={object.rating}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor={person.getThemeColors().backgoundColorFirst.backgroundColor}
                />
                <div className="text" style={person.getThemeColors().text} title="Тип">Улица</div>
                <div className="text" style={person.getThemeColors().text} title="Направление">{object.direction}</div>
            </div >
        );
    }

    handleSearchObject = async (e) => {
        if (e.key === 'Enter') {
            await this.handleSearch();
        }
    }

    handleShowRoute = async (e) => {
        if (e.key === 'Enter') {
            this.handleRoute();
        }
    }

    handleClearSearch = async () => {
        document.getElementById('inputSearch').value = "";
    }

    handleSearch = async () => {
        let server = new Server();

        if (document.getElementById('inputSearch').value === '') {
            this.setState({
                focus: 'objects',
                objects: await server.getObjects('')
            });
        }

        if (document.getElementById('inputSearch').value === 'Все объекты') {
            this.setState({
                focus: 'objects',
                objects: await server.getObjects('')
            });
        }

        if (document.getElementById('inputSearch').value === 'Мое местоположение') {
            this.setState({
                focus: 'i',
                objects: await server.getObjects(''),
                userLocation: await new Promise((resolve) => {
                    navigator.geolocation.getCurrentPosition((position) =>
                        resolve({
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        }));
                })
            });
        }

        if (document.getElementById('inputSearch').value != 'Мое местоположение' && document.getElementById('inputSearch').value != 'Все объекты' && document.getElementById('inputSearch').value != '') {

            let objects = await server.getObjects('');

            let aimObject = objects.monuments.find((monument) => monument.name === document.getElementById('inputSearch').value);

            if (!aimObject)
                aimObject = objects.tables.find((table) => table.name === document.getElementById('inputSearch').value);

            if (!aimObject)
                aimObject = objects.streets.find((street) => street.new_name === document.getElementById('inputSearch').value);

            if (!aimObject)
                return;

            this.setState({
                focus: 'aim',
                aimObject: await server.getAimObject({
                    scheme: aimObject.id_scheme,
                    id: aimObject.id
                }),
                objects: objects
            });

            this.openInfo(this.state.aimObject);
            this.openInfoBlock()
        }
    }

    handleClearRouteFrom = async () => {
        document.getElementById('inpRouteFrom').value = "";
        this.setState({
            route: {
                startPoint: null,
                endPoint: null,
            }
        })
    }

    handleClearRouteTo = async () => {
        document.getElementById('inpRouteTo').value = "";
        this.setState({
            route: {
                startPoint: null,
                endPoint: null,
            }
        })
    }

    handleRoute = async () => {
        let server = new Server();

        if (document.getElementById('inpRouteFrom').value === 'Мое местоположение') {
            this.setState({
                objects: await server.getObjects(''),
                route: {
                    startPoint: await new Promise((resolve) => {
                        navigator.geolocation.getCurrentPosition((position) =>
                            resolve({
                                lat: position.coords.latitude,
                                long: position.coords.longitude
                            }));
                    }),
                    endPoint: await server.getPoint(document.getElementById('inpRouteTo').value)
                }
            });
        }

        if (document.getElementById('inpRouteTo').value === 'Мое местоположение') {
            this.setState({
                objects: await server.getObjects(''),
                route: {
                    startPoint: await server.getPoint(document.getElementById('inpRouteFrom').value),
                    endPoint: await new Promise((resolve) => {
                        navigator.geolocation.getCurrentPosition((position) =>
                            resolve({
                                lat: position.coords.latitude,
                                long: position.coords.longitude
                            }));
                    })
                }
            });
        }

        if (document.getElementById('inpRouteFrom').value !== 'Мое местоположение' && document.getElementById('inpRouteTo').value !== 'Мое местоположение') {
            this.setState({
                objects: await server.getObjects(''),
                route: {
                    startPoint: await server.getPoint(document.getElementById('inpRouteFrom').value),
                    endPoint: await server.getPoint(document.getElementById('inpRouteTo').value)
                }
            });
        }
    }


    handleGoToMe = async () => {
        let server = new Server();

        this.setState({
            focus: 'i',
            objects: await server.getObjects(''),
            userLocation: await new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition((position) =>
                    resolve({
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    }));
            })
        });
    }

    saveMap = map => {
        this.map = map;
        this.setState({
            isMapInit: true
        });
    };

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


        if (this.state.focus === 'objects') {
            focusObject = (this.state.objects.monuments.length > 0) ? [this.state.objects.monuments[0].lat, this.state.objects.monuments[0].long] : ((this.state.objects.tables.length > 0) ? [this.state.objects.tables[0].lat, this.state.objects.tables[0].long] : (this.state.objects.streets.length > 0) ? [this.state.objects.streets[0].start_lat, this.state.objects.streets[0].start_long] : [0, 0]);
            zoom = 6;
        }

        if (this.state.focus === 'i') {
            focusObject = (this.state.userLocation) ? [this.state.userLocation.lat, this.state.userLocation.long] : [0, 0];
            zoom = 16;
        }

        if (this.state.focus === 'aim') {
            focusObject = (this.state.aimObject) ? [(this.state.aimObject.lat) ? this.state.aimObject.lat : this.state.aimObject.start_lat, (this.state.aimObject.long) ? this.state.aimObject.long : this.state.aimObject.start_long] : [0, 0];
            zoom = 16;
        }

        return (
            <LeafletMap
                center={focusObject}
                zoom={zoom} minZoom={3} maxZoom={24} attributionControl={true} zoomControl={false} doubleClickZoom={false} scrollWheelZoom={true} dragging={true} animate={true} easeLinearity={0.35} ref={this.saveMap}>

                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url={linkMap} />

                {
                    (this.state.route.startPoint != null && this.state.route.endPoint != null) ? this.state.isMapInit && <Routing id="YourRouteFromTo" map={this.map} person={person} lineColor={'#fb9300'} startPoint={this.state.route.startPoint} endPoint={this.state.route.endPoint} /> : null
                }

                <Marker
                    icon={iconYou}
                    position={new Array(this.state.userLocation.lat, this.state.userLocation.long)}
                >
                    <Popup fill="#000000">
                        <b>Ваша позиция</b>
                    </Popup>
                </Marker>

                <Control>
                    <div id="boxMenHere" style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().svg.fill }} onClick={this.handleGoToMe}>
                        <ImgManHere id="imgMenHere" fill={person.getThemeColors().svg.fill} />
                    </div>

                    <datalist id="inpSearchHelp">
                        <option value="Мое местоположение"></option>
                        <option value="Все объекты"></option>
                        {
                            this.state.allObjects.monuments.map(monument => <option value={monument.name}>{'Монумент "' + monument.name + '"'}</option>)
                        }
                        {
                            this.state.allObjects.tables.map(table => <option value={table.name}>{'Табличка "' + table.name + '"'}</option>)
                        }
                        {
                            this.state.allObjects.streets.map(street => <option value={street.new_name}>{'Улица "' + street.new_name + '"'}</option>)
                        }
                    </datalist>

                    <datalist id="inpRouteHelp">
                        <option value="Мое местоположение"></option>
                        {
                            this.state.allObjects.monuments.map(monument => <option value={monument.name}>{'Монумент "' + monument.name + '"'}</option>)
                        }
                        {
                            this.state.allObjects.tables.map(table => <option value={table.name}>{'Табличка "' + table.name + '"'}</option>)
                        }
                        {
                            this.state.allObjects.streets.map(street => <option value={street.new_name}>{'Улица "' + street.new_name + '"'}</option>)
                        }
                    </datalist>

                    <div id="box" style={{
                        backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor,
                        borderColor: person.getThemeColors().svg.fill
                    }}>
                        <div id="blockSearch">
                            <div id="boxInput">
                                <input id="inputSearch" list="inpSearchHelp" style={{
                                    color: person.getThemeColors().text.color,
                                    backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor,
                                    borderColor: person.getThemeColors().svg.fill
                                }}
                                    placeholder={"Поиск..."}
                                    onKeyDown={this.handleSearchObject}
                                    className={(person.getThemeTone() === 'light') ? 'dark' : 'light'}>
                                </input>
                                <div id="boxMopClear" style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().svg.fill }} onClick={this.handleClearSearch}>
                                    <ImgMop id="imgMopClear" fill={person.getThemeColors().svg.fill} />
                                </div>
                                <div id="boxMagnifySearch" style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().svg.fill }} onClick={this.handleSearch}>
                                    <ImgMagnify id="imgMagnifySearch" fill={person.getThemeColors().svg.fill} />
                                </div>
                            </div>
                        </div>

                        <div style={{
                            borderColor: person.getThemeColors().svg.fill, display: 'none'
                        }} className="box-block" id="blockFullInfo">
                            <p className="text" style={person.getThemeColors().text} onClick={() => {
                                if (document.getElementById('objInfo').style.display === 'none')
                                    document.getElementById('objInfo').style.display = 'block';
                                else
                                    document.getElementById('objInfo').style.display = 'none';

                                if (document.getElementById('objDescription').style.display === 'none')
                                    document.getElementById('objDescription').style.display = 'block';
                                else
                                    document.getElementById('objDescription').style.display = 'none';


                                if (document.getElementById('fullInfoLine').style.display === 'none')
                                    document.getElementById('fullInfoLine').style.display = 'block';
                                else
                                    document.getElementById('fullInfoLine').style.display = 'none';

                                document.getElementById('routesLine').style.display = 'none';
                                document.getElementById('blockCreateRoute').style.display = 'none';

                                document.getElementById('objShare').style.display = 'none';
                                document.getElementById('shareLine').style.display = 'none';
                            }}>Информация</p>
                            <hr style={{ backgroundColor: person.getThemeColors().text.color, borderColor: person.getThemeColors().svg.fill, display: 'none' }} id="fullInfoLine" />
                            <div style={{ display: 'none' }} id="objInfo">
                            </div>
                            <div style={{ display: 'none' }} id="objDescription">
                            </div>
                        </div>

                        <div style={{
                            borderColor: person.getThemeColors().svg.fill
                        }} className="box-block" id="blockRoutes">
                            <p className="text" style={person.getThemeColors().text} onClick={() => {
                                if (document.getElementById('routesLine').style.display === 'none')
                                    document.getElementById('routesLine').style.display = 'block';
                                else
                                    document.getElementById('routesLine').style.display = 'none';

                                if (document.getElementById('blockCreateRoute').style.display === 'none')
                                    document.getElementById('blockCreateRoute').style.display = 'flex';
                                else
                                    document.getElementById('blockCreateRoute').style.display = 'none';

                                document.getElementById('objInfo').style.display = 'none';
                                document.getElementById('objDescription').style.display = 'none';
                                document.getElementById('fullInfoLine').style.display = 'none';

                                document.getElementById('objShare').style.display = 'none';
                                document.getElementById('shareLine').style.display = 'none';
                            }}>Маршрут</p>
                            <hr style={{ backgroundColor: '#fb9300', borderColor: '#fb9300', display: 'none' }} id="routesLine" />
                            <div id="blockCreateRoute" style={{ display: 'none' }}>
                                <div>
                                    <input id="inpRouteFrom" list="inpRouteHelp" type="text" className="text" style={{
                                        color: person.getThemeColors().text.color,
                                        backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor,
                                        borderColor: person.getThemeColors().svg.fill
                                    }} title="Откуда?" placeholder="Откуда?"
                                        className={(person.getThemeTone() === 'light') ? 'dark' : 'light'}
                                        onKeyDown={this.handleShowRoute} />

                                    <div id="boxMopClear" style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().svg.fill }} onClick={this.handleClearRouteFrom}>
                                        <ImgMop id="imgMopClear" fill={person.getThemeColors().svg.fill} />
                                    </div>
                                    <div id="boxMagnifySearch" style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().svg.fill }} onClick={this.handleRoute}>
                                        <ImgMagnify id="imgMagnifySearch" fill={person.getThemeColors().svg.fill} />
                                    </div>
                                </div>
                                <div>
                                    <input id="inpRouteTo" list="inpRouteHelp" type="text" className="text" style={{
                                        color: person.getThemeColors().text.color,
                                        backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor,
                                        borderColor: person.getThemeColors().svg.fill
                                    }} title="Куда?" placeholder="Куда?"
                                        className={(person.getThemeTone() === 'light') ? 'dark' : 'light'}
                                        onKeyDown={this.handleShowRoute} />

                                    <div id="boxMopClear" style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().svg.fill }} onClick={this.handleClearRouteTo}>
                                        <ImgMop id="imgMopClear" fill={person.getThemeColors().svg.fill} />
                                    </div>
                                    <div id="boxMagnifySearch" style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().svg.fill }} onClick={this.handleRoute}>
                                        <ImgMagnify id="imgMagnifySearch" fill={person.getThemeColors().svg.fill} />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div style={{
                            borderColor: person.getThemeColors().svg.fill, display: 'none'
                        }} className="box-block" id="blockShare">
                            <p className="text" style={person.getThemeColors().text} onClick={(obj) => {
                                if (document.getElementById('objShare').style.display === 'none')
                                    document.getElementById('objShare').style.display = 'block';
                                else
                                    document.getElementById('objShare').style.display = 'none';

                                if (document.getElementById('shareLine').style.display === 'none')
                                    document.getElementById('shareLine').style.display = 'block';
                                else
                                    document.getElementById('shareLine').style.display = 'none';

                                document.getElementById('routesLine').style.display = 'none';
                                document.getElementById('blockCreateRoute').style.display = 'none';

                                document.getElementById('objInfo').style.display = 'none';
                                document.getElementById('objDescription').style.display = 'none';
                                document.getElementById('fullInfoLine').style.display = 'none';
                            }}>Поделиться</p>

                            <hr style={{ backgroundColor: person.getThemeColors().text.color, borderColor: person.getThemeColors().svg.fill, display: 'none' }} id="shareLine" />

                            <div style={{ display: 'none' }} id="objShare">
                            </div>
                        </div>
                    </div>
                </Control>

                {
                    this.state.objects.monuments.map(monument =>
                        <Marker
                            icon={iconPin}
                            position={new Array(monument.lat, monument.long)}
                            onpopupopen={async () => (document.getElementById("blockFullInfo")) ? await this.openInfo(monument) : null}
                            onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}
                        >

                            <Popup fill="#000000">
                                <b>{monument.name}</b>
                                <br />
                                Монумент
                                <br /> {monument.direction}
                            </Popup>

                        </Marker>
                    )
                }
                {
                    this.state.objects.tables.map(table =>
                        <Marker
                            icon={iconPin}
                            position={new Array(table.lat, table.long)}
                            onpopupopen={async () => (document.getElementById("blockFullInfo")) ? await this.openInfo(table) : null}
                            onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}
                        >

                            <Popup fill="#000000">
                                <b>{table.name}</b>
                                <br />
                                Табличка
                                <br /> {table.direction}
                            </Popup>

                        </Marker>
                    )
                }
                {
                    this.state.objects.streets.map(street =>
                        <div>
                            <Marker
                                icon={iconPin}
                                position={new Array(street.start_lat, street.start_long)}
                                onpopupopen={async () => (document.getElementById("blockFullInfo")) ? await this.openInfo(street) : null}
                                onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}
                            >

                                <Popup fill="#000000">
                                    <b>{street.new_name}</b>
                                    <br />
                                    <b>Начало</b>
                                    <br />
                                    Улица
                                    <br />
                                    {street.direction}
                                </Popup>

                            </Marker>

                            <Marker
                                icon={iconPin}
                                position={new Array(street.end_lat, street.end_long)}
                                onpopupopen={async () => (document.getElementById("blockFullInfo")) ? await this.openInfo(street) : null}
                                onpopupclose={async () => (document.getElementById("blockFullInfo")) ? await this.closeInfo() : null}
                            >

                                <Popup fill="#000000">
                                    <b>{street.new_name}</b>
                                    <br />
                                    <b>Конец</b>
                                    <br />
                                    Улица
                                    <br /> {street.direction}
                                </Popup>

                            </Marker>

                            {this.state.isMapInit && <Routing map={this.map} person={person} lineColor={person.getThemeColors().svg.fill} startPoint={{ lat: street.start_lat, long: street.start_long }} endPoint={{ lat: street.end_lat, long: street.end_long }} />}
                        </div>
                    )
                }

            </LeafletMap >);
    }
}