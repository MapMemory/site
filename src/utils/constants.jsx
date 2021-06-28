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
        GET_IS_AUTH: 'admin/getIsAuth.php',
        SET_DATA_TO_TABLES: 'admin/setDataToTables.php',
        DELETE_TABLES: 'admin/deleteTables.php',
        CREATE_BECKUP_TABLES: 'admin/createBeckup.php',
        GET_RATING_ARRAY: 'admin/getRatingArray.php',
        MOVE_FILES_FROM_FOLDER: 'admin/moveFilesFromFolder.php'
    }
};

export default { SITE_ADDRESS, SERVER_ADDRESS, PAGES };