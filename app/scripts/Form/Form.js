import EventPublisher from './EventPublisher';

/**
 * Class holding the state and all
 * of the fields of the form. Handling
 * form submit event and broadcasting
 * it to all of the subscribers.
 */
export default class Form extends EventPublisher {
  /**
   * Constructing the Form. Data fields holds the state of all form fields.
   * @param {Array.<FormField>} fields Form fields.
   * @param {HTMLFormElement} container Form container.
   */
  constructor(fields, container) {
    super();

    this.fields = fields;
    this.container = container;

    this.data = {};
    this.isProcessing = false;

    this.subscribeToFormChange();
    this.valid = this.areFieldsValid();
  }

  /**
   * Subscribing to change event of all form fields.
   * Every time the form field changes, the data of the form
   * is set and the function that checks the validity is called.
   * Validity is set in a real-time.
   */
  subscribeToFormChange() {
    this.fields.forEach((field) => {
      this.data[field.name] = field.state;

      field.subscribe('inputChange', (state) => {
        this.data[field.name] = state;

        const valid = this.areFieldsValid();
        this.valid = valid;
      });
    });
  }

  /**
   * Checking the validity of all form fields.
   * @return {boolean} Validity of fields.
   */
  areFieldsValid() {
    let areValid = true;

    for (const i in this.data) {
      if (this.data.hasOwnProperty(i)) {
        if (!this.data[i].valid) {
          areValid = false;
          break;
        }
      }
    }

    return areValid;
  }

  /**
   * Validating all fields. When all fields are valid
   * function calls the setTimeout function that mocks the HTTP request.
   * When setTimeout is completed, firing all subscribers
   * of 'submitFinished' event.
   */
  submitForm() {
    this.fields.forEach((field) => {
      field.validateAndSetState();
    });

    if (this.valid) {
      this.isProcessing = true;

      setTimeout(() => {
        this.isProcessing = false;
        this.container.reset();
        this.publish('submitFinished');
      }, 2000);
    }
  }
}
