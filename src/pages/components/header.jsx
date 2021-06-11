import '../../styles/pages/components/header.scss'

import { ReactComponent as ImgLogo } from '../../assets/images/svg/pin.svg';
import { ReactComponent as ImgMenu } from '../../assets/images/svg/menu.svg';

import { useHistory } from "react-router-dom";

import Person from '../../utils/person.jsx';

export default () => {
    let person = new Person();
    const history = useHistory();

    return (
        <div style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().headerColorPrimary.backgroundColor }} id="header">
            <ImgLogo fill={person.getThemeColors().svg.fill} className="logo" onClick={() => {
                history.push("/");
                document.getElementById('menu').style.display = 'none';
                if (document.getElementById('body') != null)
                    document.getElementById('body').style.display = 'block';
                if (document.getElementById('footer') != null)
                    document.getElementById('footer').style.display = 'block';
                if (document.getElementById('blockScroll') != null)
                    document.getElementById('blockScroll').style.display = 'block';
            }} />
            <div>
                <strong style={person.getThemeColors().text} className="name" onClick={() => {
                    history.push("/");
                    document.getElementById('menu').style.display = 'none';
                    if (document.getElementById('body') != null)
                        document.getElementById('body').style.display = 'block';
                    if (document.getElementById('footer') != null)
                        document.getElementById('footer').style.display = 'block';
                    if (document.getElementById('blockScroll') != null)
                        document.getElementById('blockScroll').style.display = 'block';
                }}>MapMemory</strong>
            </div>
            <ImgMenu fill={person.getThemeColors().svg.fill} className="menu" onClick={() => {
                if (document.getElementById('menu').style.display === 'none') {
                    document.getElementById('menu').style.display = 'flex';

                    if (document.getElementById('blockScroll') != null)
                        document.getElementById('blockScroll').style.display = 'none';

                    if (document.getElementById('fullScreenText') != null)
                        document.getElementById('fullScreenText').style.display = 'none';
                }
                else {
                    document.getElementById('menu').style.display = 'none';
                    if (document.getElementById('blockScroll') != null)
                        document.getElementById('blockScroll').style.display = 'block';
                }
            }} />
        </div>
    );
}