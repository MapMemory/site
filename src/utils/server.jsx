import axios from 'axios';
import CONSTANTS from '../utils/constants.jsx';

export default class {
    constructor() { }

    async getObjects(name) {
        return {
            monuments: await this.getMonuments(name),
            tables: await this.getTables(name),
            streets: await this.getStreets(name)
        };
    }

    async getAdminIsAuth(login, password) {
        return await axios.get(CONSTANTS.SERVER_ADDRESS + CONSTANTS.PAGES.ADMIN.GET_IS_AUTH + `?login=${login}` + `&password=${password}`).then((result) => { return result.data });
    }

    async setRating(aim) {
        axios.post(CONSTANTS.SERVER_ADDRESS + CONSTANTS.PAGES.MAP.SET_RATING + `?ip=${await aim.person.information.getIP()}` + `&id=${aim.object.id}` + `&scheme=${aim.object.id_scheme}` + `&rating=${aim.newRating}`);
    }

    async getImgsOfObject(aim) {
        return await axios.get(CONSTANTS.SERVER_ADDRESS + CONSTANTS.PAGES.MAP.GET_IMG_OF_OBJECT + `?scheme=${aim.scheme}` + `&id=${aim.id}`).then((result) => { return result.data });
    }

    async getAimObject(aim) {
        return await axios.get(CONSTANTS.SERVER_ADDRESS + CONSTANTS.PAGES.MAP.GET_AIM_OBJECT + `?scheme=${aim.scheme}` + `&id=${aim.id}`).then((result) => { return result.data });
    }

    async getPoint(name) {
        return await axios.get(CONSTANTS.SERVER_ADDRESS + CONSTANTS.PAGES.MAP.GET_POINT + `?name=${name}`).then((result) => { return result.data });
    }

    async getMonuments(name) {
        console.log(CONSTANTS.SERVER_ADDRESS + CONSTANTS.PAGES.MAP.GET_MONUMENTS + `?name=${name}`);
        return await axios.get(CONSTANTS.SERVER_ADDRESS + CONSTANTS.PAGES.MAP.GET_MONUMENTS + `?name=${name}`).then((result) => { return result.data });
    }

    async getTables(name) {
        return await axios.get(CONSTANTS.SERVER_ADDRESS + CONSTANTS.PAGES.MAP.GET_TABLES + `?name=${name}`).then((result) => { return result.data });
    }

    async getStreets(name) {
        return await axios.get(CONSTANTS.SERVER_ADDRESS + CONSTANTS.PAGES.MAP.GET_STREETS + `?name=${name}`).then((result) => { return result.data });
    }
}