import BaconImage from './BaconImage';

/**
 * Class responsible for adding bacon images to a container.
 */
export default class BaconManager {
  /**
   * Constructing the BaconManager.
   * @param {string} baconImageSrc Image source for the bacon image.
   * @param {HTMLElement} container Container holding generated bacons.
   */
  constructor(baconImageSrc, container) {
    this.baconImageSrc = baconImageSrc;
    this.container = container;
  }

  /**
   * Generating a new bacon element and adding it to the container.
   */
  addBacon() {
    const baconImage = new BaconImage(this.baconImageSrc);
    const element = baconImage.createElement();

    this.container.appendChild(element);
  }
}
