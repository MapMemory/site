import '../../styles/light/green/components/device.scss';

export default ({ title, img, url }) => {
    return (
        <div className="block green">
            <div className="front">
                <div className="text general">{title}</div>
                <button onClick={() => { window.location.assign(url); }}>Скачать</button>
            </div>
            <div className="back">
                <img className="image-object" src={img} alt="" />
            </div>
        </div>
    );
}