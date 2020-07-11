import Joi from '@hapi/joi';

export default class Validator {
  rules = {};

  constructor(rules = null) {
    if (rules) {
      this.setRules(rules);
    }
  }

  setRules(rules) {
    this.rules = rules;
  }

  getRules() {
    return this.rules;
  }

  async validate(payload) {
    await Joi.object(this.getRules()).validateAsync(payload);
  }

  accept(store, action) {
    console.log(`${action.type} accepted!`);
  }

  reject(store, action) {
    console.error(`${action.type} rejected!`);
  }
}
