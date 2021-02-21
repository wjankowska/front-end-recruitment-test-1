import {getRandomInt} from '../utils';
import BaconParticle from './BaconParticle';

export default class BaconImage {
    constructor(imageSrc) {
        this.imageSrc = imageSrc;

        this.size = 150;
        this.particlesAmount = 80;
        this.particlesImage = 'https://pngimg.com/uploads/bacon/bacon_PNG10920.png';
    }

    createElement() {
        this.container = document.createElement('div');
        this.container.classList.add('bacon-image-wrapper');

        this.container.appendChild(this.createParticleEffect());
        this.container.appendChild(this.createImage());

        this.positionElement();

        return this.container;
    }

    positionElement() {
        const top = getRandomInt(0, window.innerHeight - this.size);
        const left = getRandomInt(0, window.innerWidth - this.size);
        this.container.style.zIndex = '999';

        this.container.style.width = `${this.size}px`;
        this.container.style.top = `${top}px`;
        this.container.style.left = `${left}px`;
    }

    createImage() {
        const img = document.createElement('img');
        img.setAttribute('src', this.imageSrc);
        return img;
    }

    createParticleEffect() {
        const particleEffect = new BaconParticle(
            this.size,
            this.particlesAmount,
            this.particlesImage
        );
        return particleEffect.createParticles();
    }
}