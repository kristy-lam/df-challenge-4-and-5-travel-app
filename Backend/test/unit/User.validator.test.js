import UserValidator from "../../src/middleware/User.validator.js";
import { expect } from "chai";

describe("UserValidator tests", () => {
  it("should return an array of middleware functions", () => {
    // Assign
    const middleware = UserValidator.validate();
    // Act & Assert
    expect(Array.isArray(middleware)).to.be.true;
    middleware.forEach((fn) => expect(typeof fn).to.equal("function"));
  });

  it("should include the handleValidationErrors method in the middleware array", () => {
    // Assign
    const middleware = UserValidator.validate();
    // Act & Assert
    expect(middleware).to.include(UserValidator.handleValidationErrors);
  });
});
