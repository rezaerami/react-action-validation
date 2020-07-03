import {assign} from '../src';

describe("assign tests", () => {
  it("should a validator to a type", () => {
    const assigned = assign("FOO")("BAR");

    expect(assigned).toHaveProperty("FOO");
    expect(assigned.FOO).toBe("BAR");
  });
  it("should a validator to many types", () => {
    const assigned = assign(["FOO", "BAR"])("FOOBAR");

    expect(assigned).toHaveProperty("FOO");
    expect(assigned.FOO).toBe("FOOBAR");

    expect(assigned).toHaveProperty("BAR");
    expect(assigned.BAR).toBe("FOOBAR");
  });
});
