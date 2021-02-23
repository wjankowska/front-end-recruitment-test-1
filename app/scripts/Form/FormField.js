import EventPublisher from './EventPublisher';

export default class FormField extends EventPublisher {
  constructor(name, validators) {
    super();

    this.name = name;
    this.state = {}

    this.element = document.getElementById(name);
    this.validators = validators;

    this.setState();
    this.listenToChange();
  }

  getValidState() {
    let valid = null;

    for (let validator of this.validators) {
      if (typeof validator === 'function') {
        valid = validator(this.element);
      } else if (
        typeof validator.validator === 'function' &&
        validator.param
      ) {
        valid = validator.validator(this.element, validator.param);
      }

      if (!valid || !valid.valid) {
        return valid;
      }
    }

    return { valid: true, message: '' };
  }

  styleElement() {
    let elToStyle = this.element.parentElement;
    const validMsg = elToStyle.getElementsByClassName('validation-msg')[0];

    if (!elToStyle.classList.contains('form__input')) {
      elToStyle = this.element;
    }

    if (!this.state.valid && !elToStyle.classList.contains('invalid')) {
      elToStyle.classList.add('invalid');
    }

    if (this.state.valid) {
      elToStyle.classList.remove('invalid');
      validMsg.innerHTML = '';
    }

    if (!this.state.valid) {
      validMsg.innerHTML = this.state.errorMsg;
    }
  }

  listenToChange() {
    this.element.addEventListener('keyup', () => {
      this.validateAndSetState();
    })
  }

  setState() {
    const isValid = this.getValidState();
    this.state = {
      value: this.element.value,
      valid: isValid.valid,
      errorMsg: isValid.message
    }
  }

  validateAndSetState() {
    this.setState();
    this.styleElement();
    super.publish('inputChange', this.state);
  }
}