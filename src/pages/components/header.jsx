import '../../styles/light/green/components/header.scss'
import Logo from '../../assets/images/svg/Pin.svg';

export default () => {
    return (
        <div id="header">
            <img className="logo" src={Logo} />
            <strong className="name">MapMemory</strong>
        </div>
    );
}