import EventPublisher from './EventPublisher';

/**
 * Class representing a form field.
 * The form field holds its state, checks validity,
 * adjusts proper styling and fire
 * its subscribers on the 'keyup' event.
 */
export default class FormField extends EventPublisher {
  /**
   * Constructing the FormField.
   * @param {string} name FormField name.
   * @param {Array.<function>} validators FormField validator functions.
   */
  constructor(name, validators) {
    super();

    this.name = name;
    this.state = {};

    this.element = document.getElementById(name);
    this.validators = validators;

    this.setState();
    this.listenToChange();
  }

  /**
   * Checking validity of the field. Iterating over all validator functions.
   * @return {{valid: boolean, message: string}} Validity and error message.
   */
  getValidState() {
    let valid = null;

    for (const validator of this.validators) {
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

    return {valid: true, message: ''};
  }

  /**
   * Adding 'invalid' class when field is invalid
   * or removing one when field is correct.
   */
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

  /**
   * Validating field on keyup event.
   */
  listenToChange() {
    this.element.addEventListener('keyup', () => {
      this.validateAndSetState();
    });
  }

  /**
   * Checking validity and setting value, valid and errorMsg fields.
   */
  setState() {
    const isValid = this.getValidState();
    this.state = {
      value: this.element.value,
      valid: isValid.valid,
      errorMsg: isValid.message,
    };
  }

  /**
   * Checking validity and setting value, valid and errorMsg fields.
   * Styling the element.
   */
  validateAndSetState() {
    this.setState();
    this.styleElement();
    super.publish('inputChange', this.state);
  }
}
