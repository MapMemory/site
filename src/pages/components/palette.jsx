import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';

import '../../styles/pages/components/palette.scss';
import Light from '../../utils/themes/light.jsx';
import Dark from '../../utils/themes/dark.jsx';

export default ({ left, right, title, tone, color, theme }) => {
    const cookies = new Cookies();
    const light = new Light();
    const dark = new Dark();
    const history = useHistory();

    if (tone === "light") {
        if (color === "green") {
            if (left)
                return (
                    <div className="palette">
                        <div style={theme.backgoundColorFirst} className="block">
                            <div className="front">
                                <div style={theme.text} className="text general">{title}</div>
                                <div id="boxBtn">
                                    <button style={{ backgroundColor: theme.headerColorPrimary.backgroundColor, color: theme.text.color }} onClick={() => {
                                        cookies.set('tone', 'light', { path: '/' });
                                        cookies.set('color', 'green', { path: '/' });
                                        history.push("/");
                                    }}>Выбрать</button>
                                </div>
                            </div>
                            <div className="back">
                                <div style={light.green().backgoundColorFirst} className="color"></div>
                                <div style={light.green().backgoundColorSecond} className="color"></div>
                            </div>
                        </div>
                    </div>
                );

            if (right)
                return (
                    <div className="palette">
                        <div style={theme.backgoundColorSecond} className="block">
                            <div className="front">
                                <div style={theme.text} className="text general">{title}</div>
                                <div id="boxBtn">
                                    <button style={{ backgroundColor: theme.headerColorPrimary.backgroundColor, color: theme.text.color }} onClick={() => {
                                        cookies.set('tone', 'light', { path: '/' });
                                        cookies.set('color', 'green', { path: '/' });
                                        history.push("/");
                                    }}>Выбрать</button>
                                </div>
                            </div>
                            <div className="back">
                                <div style={light.green().backgoundColorFirst} className="color"></div>
                                <div style={light.green().backgoundColorSecond} className="color"></div>
                            </div>
                        </div>
                    </div>
                );
        }
        if (color === "orange") {
            if (left)
                return (
                    <div className="palette">
                        <div style={theme.backgoundColorFirst} className="block">
                            <div className="front">
                                <div style={theme.text} className="text general">{title}</div>
                                <div id="boxBtn">
                                    <button style={{ backgroundColor: theme.headerColorPrimary.backgroundColor, color: theme.text.color }} onClick={() => {
                                        cookies.set('tone', 'light', { path: '/' });
                                        cookies.set('color', 'orange', { path: '/' });
                                        history.push("/");
                                    }}>Выбрать</button>
                                </div>
                            </div>
                            <div className="back">
                                <div style={light.orange().backgoundColorFirst} className="color"></div>
                                <div style={light.orange().backgoundColorSecond} className="color"></div>
                            </div>
                        </div>
                    </div>
                );

            if (right)
                return (
                    <div className="palette">
                        <div style={theme.backgoundColorSecond} className="block">
                            <div className="front">
                                <div style={theme.text} className="text general">{title}</div>
                                <div id="boxBtn">
                                    <button style={{ backgroundColor: theme.headerColorPrimary.backgroundColor, color: theme.text.color }} onClick={() => {
                                        cookies.set('tone', 'light', { path: '/' });
                                        cookies.set('color', 'orange', { path: '/' });
                                        history.push("/");
                                    }}>Выбрать</button>
                                </div>
                            </div>
                            <div className="back">
                                <div style={light.orange().backgoundColorFirst} className="color"></div>
                                <div style={light.orange().backgoundColorSecond} className="color"></div>
                            </div>
                        </div>
                    </div>
                );
        }
        if (color === "red") {
            if (left)
                return (
                    <div className="palette">
                        <div style={theme.backgoundColorFirst} className="block">
                            <div className="front">
                                <div style={theme.text} className="text general">{title}</div>
                                <div id="boxBtn">
                                    <button style={{ backgroundColor: theme.headerColorPrimary.backgroundColor, color: theme.text.color }} onClick={() => {
                                        cookies.set('tone', 'light', { path: '/' });
                                        cookies.set('color', 'red', { path: '/' });
                                        history.push("/");
                                    }}>Выбрать</button>
                                </div>
                            </div>
                            <div className="back">
                                <div style={light.red().backgoundColorFirst} className="color"></div>
                                <div style={light.red().backgoundColorSecond} className="color"></div>
                            </div>
                        </div>
                    </div>
                );

            if (right)
                return (
                    <div className="palette">
                        <div style={theme.backgoundColorSecond} className="block">
                            <div className="front">
                                <div style={theme.text} className="text general">{title}</div>
                                <div id="boxBtn">
                                    <button style={{ backgroundColor: theme.headerColorPrimary.backgroundColor, color: theme.text.color }} onClick={() => {
                                        cookies.set('tone', 'light', { path: '/' });
                                        cookies.set('color', 'red', { path: '/' });
                                        history.push("/");
                                    }}>Выбрать</button>
                                </div>
                            </div>
                            <div className="back">
                                <div style={light.red().backgoundColorFirst} className="color"></div>
                                <div style={light.red().backgoundColorSecond} className="color"></div>
                            </div>
                        </div>
                    </div>
                );
        }
    }

    if (tone === "dark") {
        if (color === "green") {
            if (left)
                return (
                    <div className="palette">
                        <div style={theme.backgoundColorFirst} className="block">
                            <div className="front">
                                <div style={theme.text} className="text general">{title}</div>
                                <div id="boxBtn">
                                    <button style={{ backgroundColor: theme.headerColorPrimary.backgroundColor, color: theme.text.color }} onClick={() => {
                                        cookies.set('tone', 'dark', { path: '/' });
                                        cookies.set('color', 'green', { path: '/' });
                                        history.push("/");
                                    }}>Выбрать</button>
                                </div>
                            </div>
                            <div className="back">
                                <div style={dark.green().backgoundColorFirst} className="color"></div>
                                <div style={dark.green().backgoundColorSecond} className="color"></div>
                            </div>
                        </div>
                    </div>
                );

            if (right)
                return (
                    <div className="palette">
                        <div style={theme.backgoundColorSecond} className="block">
                            <div className="front">
                                <div style={theme.text} className="text general">{title}</div>
                                <div id="boxBtn">
                                    <button style={{ backgroundColor: theme.headerColorPrimary.backgroundColor, color: theme.text.color }} onClick={() => {
                                        cookies.set('tone', 'dark', { path: '/' });
                                        cookies.set('color', 'green', { path: '/' });
                                        history.push("/");
                                    }}>Выбрать</button>
                                </div>
                            </div>
                            <div className="back">
                                <div style={dark.green().backgoundColorFirst} className="color"></div>
                                <div style={dark.green().backgoundColorSecond} className="color"></div>
                            </div>
                        </div>
                    </div>
                );
        }
        if (color === "orange") {
            if (left)
                return (
                    <div className="palette">
                        <div style={theme.backgoundColorFirst} className="block">
                            <div className="front">
                                <div style={theme.text} className="text general">{title}</div>
                                <div id="boxBtn">
                                    <button style={{ backgroundColor: theme.headerColorPrimary.backgroundColor, color: theme.text.color }} onClick={() => {
                                        cookies.set('tone', 'dark', { path: '/' });
                                        cookies.set('color', 'orange', { path: '/' });
                                        history.push("/");
                                    }}>Выбрать</button>
                                </div>
                            </div>
                            <div className="back">
                                <div style={dark.orange().backgoundColorFirst} className="color"></div>
                                <div style={dark.orange().backgoundColorSecond} className="color"></div>
                            </div>
                        </div>
                    </div>
                );

            if (right)
                return (
                    <div className="palette">
                        <div style={theme.backgoundColorSecond} className="block">
                            <div className="front">
                                <div style={theme.text} className="text general">{title}</div>
                                <div id="boxBtn">
                                    <button style={{ backgroundColor: theme.headerColorPrimary.backgroundColor, color: theme.text.color }} onClick={() => {
                                        cookies.set('tone', 'dark', { path: '/' });
                                        cookies.set('color', 'orange', { path: '/' });
                                        history.push("/");
                                    }}>Выбрать</button>
                                </div>
                            </div>
                            <div className="back">
                                <div style={dark.orange().backgoundColorFirst} className="color"></div>
                                <div style={dark.orange().backgoundColorSecond} className="color"></div>
                            </div>
                        </div>
                    </div>
                );
        }
        if (color === "red") {
            if (left)
                return (
                    <div className="palette">
                        <div style={theme.backgoundColorFirst} className="block">
                            <div className="front">
                                <div style={theme.text} className="text general">{title}</div>
                                <div id="boxBtn">
                                    <button style={{ backgroundColor: theme.headerColorPrimary.backgroundColor, color: theme.text.color }} onClick={() => {
                                        cookies.set('tone', 'dark', { path: '/' });
                                        cookies.set('color', 'red', { path: '/' });
                                        history.push("/");
                                    }}>Выбрать</button>
                                </div>
                            </div>
                            <div className="back">
                                <div style={dark.red().backgoundColorFirst} className="color"></div>
                                <div style={dark.red().backgoundColorSecond} className="color"></div>
                            </div>
                        </div>
                    </div>
                );

            if (right)
                return (
                    <div className="palette">
                        <div style={theme.backgoundColorSecond} className="block">
                            <div className="front">
                                <div style={theme.text} className="text general">{title}</div>
                                <div id="boxBtn">
                                    <button style={{ backgroundColor: theme.headerColorPrimary.backgroundColor, color: theme.text.color }} onClick={() => {
                                        cookies.set('tone', 'dark', { path: '/' });
                                        cookies.set('color', 'red', { path: '/' });
                                        history.push("/");
                                    }}>Выбрать</button>
                                </div>
                            </div>
                            <div className="back">
                                <div style={dark.red().backgoundColorFirst} className="color"></div>
                                <div style={dark.red().backgoundColorSecond} className="color"></div>
                            </div>
                        </div>
                    </div>
                );
        }
    }
}