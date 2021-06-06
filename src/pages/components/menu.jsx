import '../../styles/pages/components/menu.scss';

import { ReactComponent as ImgMap } from '../../assets/images/svg/map.svg';
import { ReactComponent as ImgPalette } from '../../assets/images/svg/palette.svg';
import { ReactComponent as ImgAbout } from '../../assets/images/svg/about.svg';
import { ReactComponent as ImgPrivacy } from '../../assets/images/svg/privacy.svg';
import { ReactComponent as ImgDownload } from '../../assets/images/svg/download.svg';
import { ReactComponent as ImgSupport } from '../../assets/images/svg/support.svg';

import { useHistory } from "react-router-dom";

import Person from '../../utils/person.jsx';

export default () => {
    let person = new Person();
    const history = useHistory();

    return (
        <div style={{ display: 'none', backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor }} id="menu" >
            <div id="boxChoice">
                <div className="block" >
                    <div className="front">
                        <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} onClick={() => {
                            history.push("/map");

                            document.getElementById('menu').style.display = 'none';
                            if (document.getElementById('body') != null)
                                document.getElementById('body').style.display = 'block';
                            if (document.getElementById('footer') != null)
                                document.getElementById('footer').style.display = 'block';
                            if (document.getElementById('blockScroll') != null)
                                document.getElementById('blockScroll').style.display = 'block';
                        }}>
                            <ImgMap fill={person.getThemeColors().text.color} className="svg" />
                        </button>
                    </div>
                </div >

                <div className="block" >
                    <div className="front">
                        <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} onClick={() => {
                            history.push("/themes");
                            document.getElementById('menu').style.display = 'none';
                            if (document.getElementById('body') != null)
                                document.getElementById('body').style.display = 'block';
                            if (document.getElementById('footer') != null)
                                document.getElementById('footer').style.display = 'block';
                            if (document.getElementById('blockScroll') != null)
                                document.getElementById('blockScroll').style.display = 'block';
                        }}>
                            <ImgPalette fill={person.getThemeColors().text.color} className="svg" />
                        </button>
                    </div>
                </div >

                <div className="block" >
                    <div className="front">
                        <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} onClick={() => {
                            history.push("/about");
                            document.getElementById('menu').style.display = 'none';
                            if (document.getElementById('body') != null)
                                document.getElementById('body').style.display = 'block';
                            if (document.getElementById('footer') != null)
                                document.getElementById('footer').style.display = 'block';
                            if (document.getElementById('blockScroll') != null)
                                document.getElementById('blockScroll').style.display = 'block';
                        }}>
                            <ImgAbout fill={person.getThemeColors().text.color} className="svg" />
                        </button>
                    </div>
                </div >

                <div className="block" >
                    <div className="front">
                        <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} onClick={() => {
                            history.push("/privacy");
                            document.getElementById('menu').style.display = 'none';
                            if (document.getElementById('body') != null)
                                document.getElementById('body').style.display = 'block';
                            if (document.getElementById('footer') != null)
                                document.getElementById('footer').style.display = 'block';
                            if (document.getElementById('blockScroll') != null)
                                document.getElementById('blockScroll').style.display = 'block';
                        }}>
                            <ImgPrivacy fill={person.getThemeColors().text.color} className="svg" />
                        </button>
                    </div>
                </div >

                <div className="block" >
                    <div className="front">
                        <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} onClick={() => {
                            history.push("/download");
                            document.getElementById('menu').style.display = 'none';
                            if (document.getElementById('body') != null)
                                document.getElementById('body').style.display = 'block';
                            if (document.getElementById('footer') != null)
                                document.getElementById('footer').style.display = 'block';
                            if (document.getElementById('blockScroll') != null)
                                document.getElementById('blockScroll').style.display = 'block';
                        }}>
                            <ImgDownload fill={person.getThemeColors().text.color} className="svg" />
                        </button>
                    </div>
                </div >

                <div className="block" >
                    <div className="front">
                        <button style={{ borderColor: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} onClick={() => { window.open('mailto:mapmemory@protonmail.com?subject=Кратко о проблеме&body=Подробнее о проблеме'); }}>
                            <ImgSupport fill={person.getThemeColors().text.color} className="svg" />
                        </button>
                    </div>
                </div >
            </div>
        </div>
    );
}