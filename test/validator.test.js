import Joi from '@hapi/joi';
import { Validator } from '../src';

describe('validator tests', () => {
  it('should make an instance of validator setup the rules', () => {
    const rules = {
      foo: Joi.string(),
    };
    const validator = new Validator(rules);
    expect(validator.getRules()).toEqual(rules);
  });
});
