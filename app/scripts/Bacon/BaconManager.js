import BaconImage from './BaconImage';

export default class BaconManager {
    constructor(baconImageSrc, container) {
        this.baconImageSrc = baconImageSrc;
        this.container = container;
    }

    addBacon() {
        const baconImage = new BaconImage(this.baconImageSrc);
        const element = baconImage.createElement();

        this.container.appendChild(element);
    }
}