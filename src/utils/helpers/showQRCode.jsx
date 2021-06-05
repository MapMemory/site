import QRCode from 'qrcode';

export default (object) => {
    var canvas = document.getElementById('qrCode')
    var qrBox = document.getElementById('qrBox')
    qrBox.style.display = 'block';
    QRCode.toCanvas(canvas, `http://localhost:3000/map?scheme=${object.id_scheme}&id=${object.id}`, function (error) {
        if (error) console.error(error)
        console.log('success!');
    });
}