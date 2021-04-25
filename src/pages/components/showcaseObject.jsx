import '../../styles/light/green/components/header.scss';
import '../../styles/light/green/components/showcaseObject.scss';

export default ({ left, right, title, content, img }) => {
    if (left)
        return (
            <div className="block-left green">
                <div className="front">
                    <div className="text general">{title}</div>
                    <div className="text">{content}</div>
                </div>
                <div className="back">
                    <img className="image-object" src={img} alt="" />
                </div>
            </div>
        );

    if (right)
        return (
            <div className="block-right blue">
                <div className="back">
                    <img className="image-object" src={img} alt="" />
                </div>
                <div className="front">
                    <div className="text general">{title}</div>
                    <div className="text">{content}</div>
                </div>
            </div>
        );
}