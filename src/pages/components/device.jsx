import '../../styles/pages/components/device.scss'

export default ({ left, right, title, ImgObj, url, theme }) => {
    if (left)
        return (
            <div style={theme.backgoundColorFirst} className="block">
                <div className="front">
                    <div style={theme.text} className="text general">{title}</div>
                    <button style={{ backgroundColor: theme.headerColorPrimary.backgroundColor, color: theme.text.color }} onClick={() => { window.location.assign(url); }}>Скачать</button>
                </div>
                <div className="back">
                    <ImgObj fill={theme.svg.fill} className="image-object" alt="" />
                </div>
            </div>
        );

    if (right)
        return (
            <div style={theme.backgoundColorSecond} className="block">
                <div className="front">
                    <div style={theme.text} className="text general">{title}</div>
                    <button style={{ backgroundColor: theme.headerColorPrimary.backgroundColor, color: theme.text.color }} onClick={() => { window.location.assign(url); }}>Скачать</button>
                </div>
                <div className="back">
                    <ImgObj fill={theme.svg.fill} className="image-object" alt="" />
                </div>
            </div>
        );
}