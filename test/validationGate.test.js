import Joi from '@hapi/joi';
import {assign, validationGate, Validator} from '../src';

class CustomValidator extends Validator {
  rules = {
    foo: Joi.string(),
  }
}
const validations = assign('FOO')(CustomValidator)

describe("validationGate tests", () => {
  it("should pass through the gates", async () => {
    jest.spyOn(console, 'log');

    const next = jest.fn();

    const type = 'FOO';
    const payload = { foo: 'this is foo' };
    const action = { type, payload }

    expect(console.log).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(0);

    await validationGate(validations)()(next)(action);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
  });
  it("should not pass through the gates", async () => {
    jest.spyOn(console, 'error');

    const next = jest.fn();

    const type = 'FOO';
    const payload = { foo: false };
    const action = { type, payload }

    expect(console.error).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(0);

    await validationGate(validations)()(next)(action);
    expect(console.error).toHaveBeenCalledTimes(2);
    expect(next).toHaveBeenCalledTimes(0);
  });
});
