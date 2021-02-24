import {getRandomInt} from '../utils';
import BaconParticle from './BaconParticle';

/**
 * Class responsible for creating a single bacon,
 * a particle effect and positioning an image.
 */
export default class BaconImage {
  /**
   * Constructing the BaconImage with a given image.
   * @param {string} imageSrc Image source for the bacon.
   */
  constructor(imageSrc) {
    this.imageSrc = imageSrc;

    this.size = 150;
    this.particlesAmount = 80;
    this.particlesImage = 'https://pngimg.com/uploads/bacon/bacon_PNG10920.png';
  }

  /**
   * Creating the bacon, the particle effect and positioning the image.
   * @return {HTMLDivElement} Positioned bacon container
   *    with the particle effect.
   */
  createElement() {
    this.container = document.createElement('div');
    this.container.classList.add('bacon-image-wrapper');

    this.container.appendChild(this.createParticleEffect());
    this.container.appendChild(this.createImage());

    this.positionElement();

    return this.container;
  }

  /**
   * Positioning the bacon image in a random screen view.
   */
  positionElement() {
    const top = getRandomInt(0, window.innerHeight - this.size);
    const left = getRandomInt(0, window.innerWidth - this.size);
    this.container.style.zIndex = '999';

    this.container.style.width = `${this.size}px`;
    this.container.style.top = `${top}px`;
    this.container.style.left = `${left}px`;
  }

  /**
   * Creating the image element with given url as a source.
   * @return {HTMLImageElement} Constructed image.
   */
  createImage() {
    const img = document.createElement('img');
    img.setAttribute('src', this.imageSrc);
    return img;
  }

  /**
   * Creating the particle effect.
   * @return {HTMLDivElement} Container for the particle effect.
   */
  createParticleEffect() {
    const particleEffect = new BaconParticle(
      this.size,
      this.particlesAmount,
      this.particlesImage
    );
    return particleEffect.createParticles();
  }
}
