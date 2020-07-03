import * as Validation from '../src';

describe("export module tests", () => {
  it("should export the assign from the validation", () => {
    expect(Validation).toHaveProperty("assign");
  });
  it("should export the validationGate from the validation", () => {
    expect(Validation).toHaveProperty("validationGate");
  });
  it("should export the assign from the Validator", () => {
    expect(Validation).toHaveProperty("Validator");
  });
});
