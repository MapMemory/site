import '../../styles/pages/components/header.scss';
import '../../styles/pages/components/present.scss';

export default ({ left, right, title, content, ImgObj, theme }) => {
    if (left)
        return (
            <div className="present">
                <div style={theme.backgoundColorFirst} className="block-left" >
                    <div className="front">
                        <div style={theme.text} className="text general">{title}</div>
                        <div style={theme.text} className="text">{content}</div>
                    </div>
                    <div className="back">
                        <ImgObj fill={theme.svg.fill} className="image-object" alt="" />
                    </div>
                </div >
            </div>
        );

    if (right)
        return (
            <div className="present">
                <div style={theme.backgoundColorSecond} className="block-right">
                    <div className="front">
                        <div style={theme.text} className="text general">{title}</div>
                        <div style={theme.text} className="text">{content}</div>
                    </div>
                    <div className="back">
                        <ImgObj fill={theme.svg.fill} className="image-object" alt="" />
                    </div>
                </div>
            </div>
        );
}