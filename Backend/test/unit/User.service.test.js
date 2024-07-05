import { expect } from "chai";
import sinon from "sinon";

import User from "../../src/models/User.model.js";
import UserService from "../../src/services/User.service.js";

describe("UserService tests", () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("registerUser tests", () => {
    it("should call registerUser in the User model", async () => {
      // Assign
      const newUser = {
        email: "new-email@example.com",
        password: "NewPassword456!",
      };
      const findDuplicateUserStub = sinon.stub(User, "findOne");
      findDuplicateUserStub.withArgs(newUser).returns(false);
      const registerUserStub = sinon.stub(User.prototype, "save");
      registerUserStub.withArgs(newUser).returns({});
      // Act
      await userService.registerUser({
        email: "test@example.com",
        password: "Password123!",
      });
      // Assert
      expect(registerUserStub.calledOnce).to.be.true;
    });

    it("should add new user in the User model and returns the new user", async () => {
      // Assign
      const newUser = {
        email: "new-email@example.com",
        password: "NewPassword456!",
      };
      const findDuplicateUserStub = sinon.stub(User, "findOne");
      findDuplicateUserStub.withArgs(newUser).returns(false);
      const registerUserStub = sinon.stub(User.prototype, "save");
      registerUserStub.returns(newUser);
      // Act
      const result = await userService.registerUser(newUser);
      // Assert
      expect(result).to.equal(newUser);
    });

    it("should throw an error when save fails is added", async () => {
      // Assign
      const invalidUser = { email: "test" };
      const error = new Error("Invalid user.");
      const findDuplicateUserStub = sinon.stub(User, "findOne");
      findDuplicateUserStub.withArgs(invalidUser).returns(false);
      const registerUserStub = sinon.stub(User.prototype, "save");
      registerUserStub.throws(error);
      // Act
      try {
        await userService.registerUser(invalidUser);
        assert.fail("Expected error was not thrown.");
      } catch (e) {
        expect(e.message).to.equal(error.message);
      }
    });

    it("should throw an error when trying to register a user with an existing email", async () => {
      // Assign
      const duplicateUser = { email: "duplicate@example.com" };
      const error = new Error("Email has already been registered.");
      const findDuplicateUserStub = sinon.stub(User, "findOne");
      findDuplicateUserStub.throws(error);
      // Act
      try {
        await userService.registerUser({ email: duplicateUser });
        assert.fail("Expected error was not thrown.");
      } catch (e) {
        expect(e.message).to.equal(error.message);
      }
    });
  });

  describe("authenticateUser tests", () => {
    it("should call authenticateUser on the User model", async () => {
      // Assign
      const authenticateUserStub = sinon.stub(User, "findOne");
      authenticateUserStub
        .withArgs({
          email: "test@example.com",
          password: "Password123!",
        })
        .returns({});
      // Act
      await userService.authenticateUser({
        email: "test@example.com",
        password: "Password123!",
      });
      // Assert
      expect(authenticateUserStub.calledOnce).to.be.true;
    });

    it("should return the result of calling authenticateUser on the User model", async () => {
      //Assign
      const user = {
        email: "test@example.com",
        password: "Password123!",
      };
      const authenticateUserStub = sinon.stub(User, "findOne");
      authenticateUserStub
        .withArgs({
          email: "test@example.com",
          password: "Password123!",
        })
        .returns(user);
      // Act
      const result = await userService.authenticateUser({
        email: "test@example.com",
        password: "Password123!",
      });
      // Assert
      expect(result).to.equal(user);
    });

    it("should throw an error if user email is not found", async () => {
      // Assign
      const invalidUser = {
        email: "no-such-email@example.com",
        password: "Password123!",
      };
      const authenticateUserStub = sinon.stub(User, "findOne");
      const error = new Error("User authentication failed.");
      authenticateUserStub.returns(invalidUser);
      authenticateUserStub.throws(error);
      // Act
      try {
        await userService.authenticateUser(invalidUser);
        assert.fail("Expected error was not thrown.");
      } catch (e) {
        // Assert
        expect(e.message).to.equal(error.message);
      }
    });

    it("should throw an error if user password is not found", async () => {
      // Assign
      const invalidUser = {
        email: "test@example.com",
        password: "no-such-password",
      };
      const authenticateUserStub = sinon.stub(User, "findOne");
      const error = new Error("User authentication failed.");
      authenticateUserStub.returns(invalidUser);
      authenticateUserStub.throws(error);
      // Act
      try {
        await userService.authenticateUser(invalidUser);
        assert.fail("Expected error was not thrown.");
      } catch (e) {
        // Assert
        expect(e.message).to.equal(error.message);
      }
    });
  });

  describe("updatePassword tests", () => {
    it("should call updatePassword and find and return the result when a valid email and updated password are provided", async () => {
      // Assign
      const validEmail = "test@example.com";
      const newPassword = "NewPassword123!";
      const updatedUser = { email: validEmail, password: newPassword };
      const updatePasswordStub = sinon.stub(User, "findOneAndUpdate");
      updatePasswordStub.returns(updatedUser);
      // Act
      const result = await userService.updatePassword(updatedUser);
      // Assert
      expect(result).to.equal(updatedUser);
    });

    it("should throw an error when update fails is added", async () => {
      // Assign
      const invalidEmail = "no-such-email@example.com";
      const newPassword = "NewPassword123";
      const invalidNewUser = { email: invalidEmail, password: newPassword };
      const updatePasswordStub = sinon.stub(User, "findOneAndUpdate");
      const error = new Error("Password update failed.");
      updatePasswordStub.throws(error);
      // Act
      try {
        await userService.updatePassword(invalidNewUser);
        assert.fail("Expected error was not thrown");
      } catch (e) {
        // Assert
        expect(e.message).to.equal(error.message);
      }
    });
  });

  describe("getAllFavs tests", () => {
    it("should call getAllFavs with correct arguments", async () => {
      // Assign
      const userInput = {
        email: "test@example.com",
        password: "NewPassword123!",
      };
      const getAllFavsStub = sinon.stub(User, "findOne").resolves({});
      // Act
      await userService.getAllFavs(userInput);
      // Assert
      expect(getAllFavsStub.calledOnceWith(userInput)).to.be.true;
    });

    it("should get all favs if user is authenticated", async () => {
      // Assign
      const validUser = {
        email: "test@example.com",
        password: "NewPassword123!",
      };
      const userWithFavs = {
        favs: [
          {
            city: "test1City, test1State, test1Country",
          },
          {
            city: "test2City, test2State, test2Country",
          },
        ],
      };
      const getAllFavsStub = sinon.stub(User, "findOne");
      getAllFavsStub.resolves(userWithFavs);
      // Act
      const result = await userService.getAllFavs(validUser);
      // Assert
      expect(result).to.deep.equal(userWithFavs.favs);
    });

    it("should throw an error if user is not found", async () => {
      // Assign
      const userInput = {
        email: "no-such-email@example.com",
        password: "NewPassword123!",
      };
      sinon.stub(User, "findOne").resolves(null);

      // Act and Assert
      try {
        await userService.getAllFavs(userInput);
        expect.fail("Expected error was not thrown"); // This will fail the test if no error is thrown
      } catch (e) {
        expect(e.message).to.equal("User authentication failed.");
      }
    });
  });

  describe("addFav tests", () => {
    it("should call addFav with correct arguments", async () => {
      // Assign
      const userInput = {
        email: "test@example.com",
        password: "Password123!",
        city: "testCity, testState, testCountry",
      };
      const addFavStub = sinon.stub(User, "findOneAndUpdate").returns({});
      // Act
      await userService.addFav(userInput);
      // Assert
      expect(
        addFavStub.calledOnceWith(
          {
            email: userInput.email,
            password: userInput.password,
            "favs.city": { $ne: userInput.city },
          },
          {
            $push: { favs: { city: userInput.city } },
          },
          {
            new: true,
          }
        )
      ).to.be.true;
    });

    it("should throw an error if user authentication fails or favorite already exists", async () => {
      // Assign
      const userInput = {
        email: "test@example.com",
        password: "Password123!",
        city: "testCity, testState, testCountry",
      };
      sinon.stub(User, "findOneAndUpdate").returns(null);
      // Act and Assert
      try {
        await userService.addFav(userInput);
        expect.fail("Expected error was not thrown");
      } catch (e) {
        expect(e.message).to.equal(
          "User authentication failed or favourite already exists."
        );
      }
    });

    it("should throw an error if could not add favorite", async () => {
      // Assign
      const userInput = {
        email: "test@example.com",
        password: "Password123!",
        city: "testCity, testState, testCountry",
      };
      sinon
        .stub(User, "findOneAndUpdate")
        .throws(new Error("Could not add favourite."));
      // Act and Assert
      try {
        await userService.addFav(userInput);
        expect.fail("Expected error was not thrown");
      } catch (e) {
        expect(e.message).to.equal("Could not add favourite.");
      }
    });
  });

  describe("deleteFav tests", () => {
    it("should call findOneAndUpdate with correct arguments", async () => {
      // Assign
      const userInput = {
        email: "test@example.com",
        password: "Password123!",
        city: "testCity, testState, testCountry",
      };
      const deleteFavStub = sinon.stub(User, "findOneAndUpdate").returns({});
      // Act
      await userService.deleteFav(userInput);
      // Assert
      expect(
        deleteFavStub.calledOnceWith(
          {
            email: userInput.email,
            password: userInput.password,
            "favs.city": userInput.city,
          },
          {
            $pull: { favs: { city: userInput.city } },
          },
          {
            new: true,
          }
        )
      ).to.be.true;
    });

    it("should throw an error if user authentication fails or favorite not found", async () => {
      // Assign
      const userInput = {
        email: "test@example.com",
        password: "Password123!",
        city: "testCity, testState, testCountry",
      };
      sinon.stub(User, "findOneAndUpdate").returns(null);
      // Act and Assert
      try {
        await userService.deleteFav(userInput);
        expect.fail("Expected error was not thrown");
      } catch (e) {
        expect(e.message).to.equal(
          "User authentication failed or favorite not found."
        );
      }
    });

    it("should throw an error if could not delete favorite", async () => {
      // Assign
      const userInput = {
        email: "test@example.com",
        password: "Password123!",
        city: "testCity, testState, testCountry",
      };
      sinon
        .stub(User, "findOneAndUpdate")
        .throws(new Error("Could not delete favorite."));
      // Act and Assert
      try {
        await userService.deleteFav(userInput);
        expect.fail("Expected error was not thrown");
      } catch (e) {
        expect(e.message).to.equal("Could not delete favorite.");
      }
    });
  });
});
