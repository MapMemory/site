import '../../styles/pages/components/header.scss'

import { ReactComponent as ImgLogo } from '../../assets/images/svg/pin.svg';
import { ReactComponent as ImgMenu } from '../../assets/images/svg/menu.svg';

import Person from '../../utils/person.jsx';

export default () => {
    let person = new Person();

    return (
        <div style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, borderColor: person.getThemeColors().headerColorPrimary.backgroundColor }} id="header">
            <ImgLogo fill={person.getThemeColors().svg.fill} className="logo" />
            <strong style={person.getThemeColors().text} className="name">MapMemory</strong>
            <ImgMenu fill={person.getThemeColors().svg.fill} className="menu" onClick={() => {
                if (document.getElementById('menu').style.display === 'none') {
                    document.getElementById('menu').style.display = 'flex';

                    if (document.getElementById('blockScroll') != null)
                        document.getElementById('blockScroll').style.display = 'none';
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