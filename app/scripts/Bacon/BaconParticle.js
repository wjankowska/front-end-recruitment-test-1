/** Class responsible for creating particle effect in a given container. */
export default class ParticleEffect {
  /**
   * Constructing the ParticleEffect.
   * @param {number} size Size of the particle container.
   * @param {number} amount Amount of particles in the image.
   * @param {string} particleImage Image for the single particle.
   */
  constructor(size, amount, particleImage) {
    this.left = size / 2;
    this.top = size / 2;
    this.amount = amount;
    this.background = particleImage;
  }

  /**
   * Creating a proper amount of particles.
   * @return {HTMLDivElement} Single div container containing the particles.
   */
  createParticles() {
    this.container = document.createElement('div');
    this.container.classList.add('particles-container');

    for (let i = 0; i < this.amount; i++) {
      this.container.appendChild(this.createParticle());
    }

    return this.container;
  }

  /**
   * Creating a single particle as a HTML Element.
   * Setting random values of size, destination, delay and rotation.
   * @return {HTMLDivElement} Created particle.
   */
  createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const width = Math.floor(Math.random() * 40 + 20);
    const height = width;
    const destinationX = (Math.random() - 0.5) * 300;
    const destinationY = (Math.random() - 0.5) * 300;
    const rotation = Math.random() * 520;
    const delay = Math.random() * 200;

    particle.style.backgroundImage = `url(${this.background})`;
    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;

    const animation = particle.animate(
      [
        {
          transform: `translate(-50%, -50%) 
                      translate(${this.left}px, 
                      ${this.top}px) 
                      rotate(0deg)`,
          opacity: 1,
        },
        {
          opacity: 1,
        },
        {
          transform: `translate(-50%, -50%) translate(${
            this.left + destinationX
          }px, ${this.top + destinationY}px) rotate(${rotation}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 1000 + 5000,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        delay: delay,
      }
    );
    animation.onfinish = this.removeParticle;

    return particle;
  }

  /**
   * Removing HTML element of the particle.
   * @param  {AnimationPlaybackEvent} e Event of an animation.
   */
  removeParticle(e) {
    e.srcElement.effect.target.remove();
  }
}
