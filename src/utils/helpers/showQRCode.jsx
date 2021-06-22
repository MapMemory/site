import QRCode from 'qrcode';
import CONSTANTS from '../../utils/constants.jsx';

export default (object) => {
    var canvas = document.getElementById('qrCode')
    var qrBox = document.getElementById('qrBox')
    qrBox.style.display = 'block';
    QRCode.toCanvas(canvas, `${CONSTANTS.SITE_ADDRESS}/map?scheme=${object.id_scheme}&id=${object.id}&temp=${Math.floor(Math.random() * 1000)}`, function (error) {
        if (error) console.error(error)
    });
}