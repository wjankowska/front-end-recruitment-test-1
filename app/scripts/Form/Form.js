import EventPublisher from './EventPublisher';

export default class Form extends EventPublisher {
  constructor(fields, container) {
    super();

    this.fields = fields;
    this.container = container;

    this.data = {};
    this.isProcessing = false;

    this.subscribeToFormChange();
    this.valid = this.areFieldsValid();
  }

  subscribeToFormChange() {
    this.fields.forEach(field => {
      this.data[field.name] = field.state;

      field.subscribe('inputChange', state => {
        this.data[field.name] = state;

        const valid = this.areFieldsValid();
        this.valid = valid;
      })
    })
  }

  areFieldsValid() {
    let areValid = true;

    for (let i in this.data) {
      if (this.data.hasOwnProperty(i)) {
        if (!this.data[i].valid) {
          areValid = false;
          break;
        }
      }
    }

    return areValid;
  }

  submitForm() {
    this.fields.forEach(field => {
      field.validateAndSetState();
    })

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