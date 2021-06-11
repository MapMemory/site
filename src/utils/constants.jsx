const SERVER_ADDRESS = 'http://localhost:80/';
const SITE_ADDRESS = 'http://localhost:3000';

const PAGES = {
    MAP: {
        GET_IMG_OF_OBJECT: 'map/getImageOfObject.php',
        GET_AIM_OBJECT: 'map/getAimObject.php',
        GET_POINT: 'map/getPoint.php',
        GET_MONUMENTS: 'map/getMonuments.php',
        GET_TABLES: 'map/getTables.php',
        GET_STREETS: 'map/getStreets.php',
        SET_RATING: 'map/setRating.php'
    },
    ADMIN: {
        GET_IS_AUTH: 'admin/getIsAuth.php'
    }
};

export default { SITE_ADDRESS, SERVER_ADDRESS, PAGES };