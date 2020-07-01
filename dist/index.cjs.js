'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var assign = types => validator => {
  if (Array.isArray(types)) {
    return types.reduce((result, current) => {
      // eslint-disable-next-line no-param-reassign
      result[current] = validator;
      return result;
    }, {});
  }
  return { [types]: validator };
};

var validationGate = validations => () => next => action => {
  if (!validations[action.type]) {
    next(action);
  } else {
    const validation = new validations[action.type]();
    validation
      .validate(action.payload)
      .then(() => {
        validation.accept(action.type);
        next(action);
      })
      .catch(e => {
        console.error(e);
        validation.reject(action.type);
      });
  }
};

class Validator {
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

exports.Validator = Validator;
exports.assign = assign;
exports.validationGate = validationGate;
