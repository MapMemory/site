import PublicIP from 'public-ip';

export default class {
    constructor() { }

    async getIP() {
        return await PublicIP.v4();
    }
}