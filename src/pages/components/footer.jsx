import '../../styles/light/green/components/footer.scss'

export default () => {
    return (
        <div id="footer">
            <div className="container">
                <div className="columns">
                    <div className="group-columns">
                        <span className="copyright">© 2021 MapMemory.</span>
                        <br />
                        <div>Быстро, гладко, просто, чисто - это наша общая цель.</div>
                        <div>Для связи с нами используйте Email.</div>
                    </div>
                    <div className="column">
                        <strong>Компания</strong>
                        <ul>
                            <li>Блог</li>
                            <li>Пожертвовать</li>
                            <li>О нас</li>
                            <li>Наша политика</li>
                        </ul>
                    </div>
                    <div className="column">
                        <strong>Скачать</strong>
                        <ul>
                            <li>Настольный</li>
                            <li>Телефон</li>
                        </ul>
                    </div>
                    <div className="column">
                        <strong>Социальное</strong>
                        <ul>
                            <li>Twitter</li>
                            <li>GitHub</li>
                        </ul>
                    </div>
                    <div className="column">
                        <strong>Помощь</strong>
                        <ul>
                            <li>Служба поддержки</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}