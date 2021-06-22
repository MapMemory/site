import '../../styles/pages/components/fullScreenText.scss';

import Person from '../../utils/person.jsx';

export default ({ text }) => {
    function handleHideDescription() {
        document.getElementById('fullScreenText').style.display = 'none';
    }

    let person = new Person();

    return (
        <div style={{ display: 'none', backgroundColor: person.getThemeColors().backgoundColorFirst.backgroundColor }} id="fullScreenText" >
            <div id="blockScrollST">
                <div>
                    <div>
                        <p id="screenText" style={{
                            color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().backgoundColorFirst.backgroundColor
                        }}>{text}</p>
                    </div>
                    <button style={{ backgroundColor: person.getThemeColors().headerColorPrimary.backgroundColor, color: person.getThemeColors().text.color }} onClick={handleHideDescription}>Вернуться</button>
                </div>
            </div>
        </div>
    );
}