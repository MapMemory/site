import Cookies from 'universal-cookie';
import Information from './helpers/information.jsx';
import Light from './themes/light.jsx';
import Dark from './themes/dark.jsx';


export default class {
    constructor() {
        this.cookies = new Cookies();
        this.information = new Information();
        this.light = new Light();
        this.dark = new Dark();

        this.tone = this.cookies.get('tone');
        this.color = this.cookies.get('color');

        if (this.tone === undefined) {
            this.tone = 'light';
            this.cookies.set('tone', 'light', { path: '/' });
        }

        if (this.color === undefined) {
            this.color = 'green';
            this.cookies.set('color', 'green', { path: '/' });
        }
    }

    getThemeTone() {
        if (this.tone === 'light') {
            return 'light';
        }
        if (this.tone === 'dark') {
            return 'dark';
        }
    }

    getThemeColors() {
        if (this.tone === 'light') {
            if (this.color === 'green') {
                return this.light.green();
            }

            if (this.color === 'orange') {
                return this.light.orange();
            }

            if (this.color === 'red') {
                return this.light.red();
            }
        }

        if (this.tone === 'dark') {
            if (this.color === 'green') {
                return this.dark.green();
            }

            if (this.color === 'orange') {
                return this.dark.orange();
            }

            if (this.color === 'red') {
                return this.dark.red();
            }
        }

        return this.light.green();
    }
}