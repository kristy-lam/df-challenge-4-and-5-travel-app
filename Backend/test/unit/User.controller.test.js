import { expect } from "chai";
import sinon from "sinon";

import UserController from "../../src/controllers/User.controller.js";

describe("UserController tests", () => {
  let userController;
  let userService;
  let req;
  let res;

  beforeEach(() => {
    userService = {
      registerUser: sinon.stub(),
      authenticateUser: sinon.stub(),
      updatePassword: sinon.stub(),
      getAllFavs: sinon.stub(),
      addFav: sinon.stub(),
      deleteFav: sinon.stub(),
    };
    userController = new UserController(userService);
    req = {
      body: {},
    };
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
      sendStatus: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("registerUser tests", () => {
    it("should add a user", async () => {
      // Assign
      const newUser = { email: "test@example.com", password: "Password123!" };
      userService.registerUser.resolves(newUser);
      // Act
      await userController.registerUser(req, res);
      // Assert
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(newUser)).to.be.true;
    });

    it("should send a 400 status code when req.body is null", async () => {
      // Assign
      req.body = null;
      // Act
      await userController.registerUser(req, res);
      // Assert
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: "Invalid user." })).to.be.true;
    });

    it("should send a 400 status code when email is null", async () => {
      // Assign
      const newUser = { password: "Password123!" };
      userService.registerUser.resolves(newUser);
      // Act
      await userController.registerUser(req, res);
      // Assert
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: "Invalid user." })).to.be.true;
    });

    it("should send a 400 status code when password is null", async () => {
      // Assign
      const newUser = { email: "test@example.com" };
      userService.registerUser.resolves(newUser);
      // Act
      await userController.registerUser(req, res);
      // Assert
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: "Invalid user." })).to.be.true;
    });

    it("should send a 500 status code when registerUser service returns an error", async () => {
      // Assign
      userService.registerUser.throws(new Error());
      // Act
      await userController.registerUser(req, res);
      // Assert
      expect(res.status.calledWith(500)).to.be.true;
      expect(
        res.json.calledWith({
          message: "Unable to register user.",
        })
      ).to.be.true;
    });
  });

  describe("authenticateUser tests", () => {
    it("should authenticate a user", async () => {
      // Assign
      const validUser = {
        email: "test@example.com",
        password: "Password123!",
      };
      userService.authenticateUser.resolves(validUser);
      // Act
      await userController.authenticateUser(req, res);
      // Assert
      expect(res.status.calledWith(200)).to.be.true;
    });

    it("should send a 401 status code when req.body is null", async () => {
      // Assign
      req.body = null;
      // Act
      await userController.authenticateUser(req, res);
      // Assert
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith({ message: "User authentication failed." })).to
        .be.true;
    });

    it("should send a 401 status code when email is null", async () => {
      // Assign
      const newUser = { password: "Password123!" };
      userService.authenticateUser.resolves(newUser);
      // Act
      await userController.authenticateUser(req, res);
      // Assert
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith({ message: "User authentication failed." })).to
        .be.true;
    });

    it("should send a 401 status code when password is null", async () => {
      // Assign
      const newUser = { email: "test@example.com" };
      userService.authenticateUser.resolves(newUser);
      // Act
      await userController.authenticateUser(req, res);
      // Assert
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith({ message: "User authentication failed." })).to
        .be.true;
    });

    it("should send a 500 status code when authenticateUser service returns an error", async () => {
      // Assign
      userService.authenticateUser.throws(new Error());
      // Act
      await userController.authenticateUser(req, res);
      // Assert
      expect(res.status.calledWith(500)).to.be.true;
      expect(
        res.json.calledWith({
          message: "Unable to authenticate user.",
        })
      ).to.be.true;
    });
  });

  describe("updatePassword tests", () => {
    it("should update the password of a user", async () => {
      // Assign
      const validUser = {
        email: "test@example.com",
        password: "Password123!",
      };
      userService.updatePassword.resolves(validUser);
      // Act
      await userController.updatePassword(req, res);
      // Assert
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(validUser)).to.be.true;
    });

    it("should send a 400 status code when req.body is null", async () => {
      // Assign
      req.body = null;
      // Act
      await userController.updatePassword(req, res);
      // Assert
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: "User was not found." })).to.be
        .true;
    });

    it("should send a 400 status code when email is null", async () => {
      // Assign
      const userToUpdate = { password: "Password123!" };
      userService.updatePassword.resolves(userToUpdate);
      // Act
      await userController.updatePassword(req, res);
      // Assert
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: "User was not found." })).to.be
        .true;
    });

    it("should send a 400 status code when password is null", async () => {
      // Assign
      const userToUpdate = { email: "test@example.com" };
      userService.updatePassword.resolves(userToUpdate);
      // Act
      await userController.updatePassword(req, res);
      // Assert
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: "User was not found." })).to.be
        .true;
    });

    it("should send a 500 status code when authenticateUser service returns an error", async () => {
      // Assign
      userService.updatePassword.throws(new Error());
      // Act
      await userController.updatePassword(req, res);
      // Assert
      expect(res.status.calledWith(500)).to.be.true;
      expect(
        res.json.calledWith({
          message: "Unable to update password.",
        })
      ).to.be.true;
    });
  });

  describe("getAllFavs", () => {
    it("should send a 200 status and the user favs on success", async () => {
      // Assign
      const favs = [{ city: "New York" }, { city: "Tokyo" }];
      userService.getAllFavs.resolves(favs);
      // Act
      await userController.getAllFavs(req, res);
      // Assert
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(favs)).to.be.true;
    });

    it("should handle errors and send the appropriate response", async () => {
      // Assign
      const error = new Error("User authentication failed.");
      userService.getAllFavs.rejects(error);
      // Act
      await userController.getAllFavs(req, res);
      // Assert
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
    });
  });

  describe("addFav", () => {
    it("should send a 201 status on success", async () => {
      // Assign
      userService.addFav.resolves();
      // Act
      await userController.addFav(req, res);
      // Assert
      expect(res.sendStatus.calledWith(201)).to.be.true;
    });

    it("should handle errors and send the appropriate response", async () => {
      // Assign
      const error = new Error(
        "User authentication failed or favourite already exists."
      );
      userService.addFav.rejects(error);
      // Act
      await userController.addFav(req, res);
      // Assert
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
    });
  });

  describe("deleteFav", () => {
    it("should send a 200 status on success", async () => {
      // Assign
      userService.deleteFav.resolves();
      // Act
      await userController.deleteFav(req, res);
      // Assert
      expect(res.sendStatus.calledWith(200)).to.be.true;
    });

    it("should handle errors and send the appropriate response", async () => {
      // Assign
      const error = new Error(
        "User authentication failed or favorite not found."
      );
      userService.deleteFav.rejects(error);
      // Act
      await userController.deleteFav(req, res);
      // Assert
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
    });
  });
});
