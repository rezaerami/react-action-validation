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
    await this.rules.validateAsync(payload);
  }

  accept(type) {
    console.log(`${type} accepted!`);
  }

  reject(type) {
    console.error(`${type} rejected!`);
  }
}
