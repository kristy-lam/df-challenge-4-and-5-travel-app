// Import packages
import { expect } from "chai";
import sinon from "sinon";
import supertest from "supertest";

// Import system and env configs
import Config from "../../src/Config/Config.js";
import Database from "../../src/db/Database.js";
import Server from "../../src/server/Server.js";
import User from "../../src/models/User.model.js";
import UserService from "../../src/services/User.service.js";
import UserRoutes from "../../src/routes/User.routes.js";
import Router from "../../src/routes/Router.js";

// Import test data
import testUsers from "../data/testUsers.js";

describe("Integration Tests", () => {
  let database;
  let server;
  let request;

  // Assign: create a server and a connection to the database
  before(async () => {
    Config.load();
    const { PORT, HOST, DB_URI } = process.env;
    const router = new Router();
    const userRoutes = new UserRoutes();
    router.addRouter(userRoutes);
    server = new Server(PORT, HOST, router);
    database = new Database(DB_URI);
    server.start();
    await database.connect();
    request = supertest(server.getApp());
  });

  after(async () => {
    await server.close();
    await database.close();
  });

  beforeEach(async () => {
    try {
      await User.deleteMany();
      console.log("Database cleared");
    } catch (e) {
      console.log(e.message);
      console.log("Error clearing");
      throw new Error();
    }
    try {
      await User.insertMany(testUsers);
      console.log("Database populated with test users");
    } catch (e) {
      console.log(e.message);
      console.log("Error inserting");
      throw new Error();
    }
  });

  describe("POST requests to /register on UserRoutes", () => {
    it("should respond with a 201 status code when a valid user is sent", async () => {
      // Act
      const validUser = {
        email: "new@example.com",
        password: "Password1!",
      };
      const response = await request.post("/register").send(validUser);
      // Assert
      expect(response.status).to.equal(201);
    });

    it("should return the registered user", async () => {
      // Assign
      const validUser = {
        email: "new@example.com",
        password: "Password1!",
      };
      const response = await request.post("/register").send(validUser);
      // Act
      const { __v, _id, favs, ...responseBodyWithoutIdAndV } = response.body;
      // Assert
      expect(responseBodyWithoutIdAndV).to.deep.equal(validUser);
    });

    it("should respond with a 400 status code when user is empty", async () => {
      // Act
      const response = await request.post("/register").send({});
      // Assert
      expect(response.status).to.equal(400);
    });

    it("should respond with a 400 status code when password is empty", async () => {
      // Act
      const response = await request
        .post("/register")
        .send({ email: "new@example.com" });
      // Assert
      expect(response.status).to.equal(400);
    });

    it("should respond with a 400 status code when email is empty", async () => {
      // Act
      const response = await request
        .post("/register")
        .send({ password: "Password123!" });
      // Assert
      expect(response.status).to.equal(400);
    });

    it("should respond with a 400 status code when email has already been registered", async () => {
      // Act
      const invalidUser = {
        email: "test1@example.com",
        password: "Password123!",
      };
      const response = await request.post("/register").send(invalidUser);
      // Assert
      expect(response.status).to.equal(400);
    });

    it("should respond with a 400 status code when email is invalid", async () => {
      // Act
      const invalidUser = {
        email: "test-email",
        password: "Password123!",
      };
      const response = await request.post("/register").send(invalidUser);
      // Assert
      expect(response.status).to.equal(400);
    });

    it("should respond with a 400 status code when password is invalid", async () => {
      // Act
      const invalidUser = {
        email: "test@example.com",
        password: "Password",
      };
      const response = await request.post("/register").send(invalidUser);
      // Assert
      expect(response.status).to.equal(400);
    });
  });

  describe("POST requests to /login on UserRoutes", () => {
    it("should respond with a 200 status code", async () => {
      const validUser = {
        email: "test1@example.com",
        password: "Password1!",
      };
      const response = await request.post("/login").send(validUser);
      // Assert
      expect(response.status).to.equal(200);
    });

    it("should return the logged in user", async () => {
      // Assign
      const validUser = {
        email: "test1@example.com",
        password: "Password1!",
      };
      const response = await request.post("/login").send(validUser);
      // Act
      const { __v, _id, favs, ...responseBodyWithoutIdAndV } =
        response.body.user;
      // Assert
      expect(responseBodyWithoutIdAndV).to.deep.equal(validUser);
    });

    it("should respond with a 401 status code when user is not found", async () => {
      const invalidUser = {
        email: "no-such-user@example.com",
        password: "Password123!",
      };
      const response = await request.post("/login").send(invalidUser);
      // Assert
      expect(response.status).to.equal(401);
    });

    it("should respond with a 401 status code when password is missing", async () => {
      const invalidUser = {
        email: "test1@example.com",
      };
      const response = await request.post("/login").send(invalidUser);
      // Assert
      expect(response.status).to.equal(401);
    });

    it("should respond with a 401 status code when email is missing", async () => {
      const invalidUser = {
        password: "Password1!",
      };
      const response = await request.post("/login").send(invalidUser);
      // Assert
      expect(response.status).to.equal(401);
    });
  });

  describe("PATCH requests to /password on UserRoutes", () => {
    it("should respond with a 200 status code when a valid user is sent", async () => {
      // Act
      const validUser = {
        email: "test1@example.com",
        password: "NewPassword1!",
      };
      const response = await request.patch("/password").send(validUser);
      // Assert
      expect(response.status).to.equal(200);
    });

    it("should return the user and the updated password", async () => {
      // Assign
      const validUser = {
        email: "test1@example.com",
        password: "NewPassword1!",
      };
      const response = await request.patch("/password").send(validUser);
      // Act
      const { __v, _id, favs, ...responseBodyWithoutIdAndV } = response.body;
      // Assert
      expect(responseBodyWithoutIdAndV).to.deep.equal(validUser);
    });

    it("should respond with a 400 status code when user is empty", async () => {
      // Act
      const response = await request.patch("/password").send({});
      // Assert
      expect(response.status).to.equal(400);
    });

    it("should respond with a 400 status code when password is empty", async () => {
      // Act
      const response = await request
        .patch("/password")
        .send({ email: "test1@example.com" });
      // Assert
      expect(response.status).to.equal(400);
    });

    it("should respond with a 400 status code when new password is invalid", async () => {
      // Act
      const invalidUser = {
        email: "test1@example.com",
        password: "Password",
      };
      const response = await request.patch("/password").send(invalidUser);
      // Assert
      expect(response.status).to.equal(400);
    });
  });

  describe("POST requests to /fav on FavRoutes", () => {
    it("should respond with a 200 status code when user is authenticated", async () => {
      // Act
      const validUser = {
        email: "test1@example.com",
        password: "Password1!",
      };
      const response = await request.post("/fav").send(validUser);
      // Assert
      expect(response.status).to.equal(200);
    });

    it("should respond with an array of favs", async () => {
      // Act
      const validUser = {
        email: "test1@example.com",
        password: "Password1!",
      };
      const response = await request.post("/fav").send(validUser);
      // Assert
      expect(response.body).to.be.an("array");
    });

    it("should respond with the correct favs", async () => {
      // Assign
      const validUser = {
        email: "test1@example.com",
        password: "Password1!",
      };
      const expectedResult = [
        {
          city: "testCity1",
        },
        {
          city: "testCity2",
        },
        {
          city: "testCity3",
        },
      ];
      const response = await request.post("/fav").send(validUser);
      // Act
      const responseBodyWithoutIdAndV = response.body.map((doc) => {
        const { __v, _id, email, password, ...docWithoutIdAndV } = doc;
        return docWithoutIdAndV;
      });
      // Assert
      expect(responseBodyWithoutIdAndV).to.deep.equal(expectedResult);
    });

    it("should return a 200 status if the database has no favs", async () => {
      // Assign
      const validUserWithNoFavs = {
        email: "user-with-no-favs@example.com",
        password: "Password3!",
      };
      // Act
      const response = await request.post("/fav").send(validUserWithNoFavs);
      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.have.length(0);
    });
  });

  it("should respond with a 400 status if user is not authenticated", async () => {
    // Assign
    const invalidUser = {
      email: "no-such-user@example.com",
      password: "Password1!",
    };
    // Act
    const response = await request.post("/fav").send(invalidUser);
    // Assert
    expect(response.status).to.equal(400);
  });

  describe("PATCH requests to /addfav on FavRoutes", () => {
    it("should respond with a 201 status code when a valid input is sent", async () => {
      // Assign
      const validInput = {
        email: "test1@example.com",
        password: "Password1!",
        city: "newCity",
      };
      // Act
      const response = await request.patch("/addfav").send(validInput);
      // Assert
      expect(response.status).to.equal(201);
    });

    it("should respond with a 400 status code when city has already been added", async () => {
      // Assign
      const invalidInput = {
        email: "test1@example.com",
        password: "Password1!",
        city: "testCity1",
      };
      // Act
      const response = await request.patch("/addfav").send(invalidInput);
      // Assert
      expect(response.status).to.equal(400);
    });

    it("should respond with a 400 status code when user is not authenticated", async () => {
      // Assign
      const invalidInput = {
        email: "no-such-user@example.com",
        password: "Password1!",
        city: "testCity1",
      };
      // Act
      const response = await request.patch("/addfav").send(invalidInput);
      // Assert
      expect(response.status).to.equal(400);
    });

    it("should respond with a 400 status code when city is empty", async () => {
      // Assign
      const invalidInput = {
        email: "test1@example.com",
        password: "Password1!",
      };
      // Act
      const response = await request.patch("/addfav").send(invalidInput);
      // Assert
      expect(response.status).to.equal(400);
    });
  });

  describe("PATCH requests to /deletefav on FavRoutes", () => {
    it("should respond with a 200 status code when a valid input is sent", async () => {
      // Assign
      const validInput = {
        email: "test1@example.com",
        password: "Password1!",
        city: "testCity1",
      };
      // Act
      const response = await request.patch("/deletefav").send(validInput);
      // Assert
      expect(response.status).to.equal(200);
    });

    it("should respond with a 400 status code when user is not authenticated", async () => {
      // Assign
      const invalidInput = {
        email: "no-such-user@example.com",
        password: "Password1!",
        city: "testCity1",
      };
      // Act
      const response = await request.patch("/deletefav").send(invalidInput);
      // Assert
      expect(response.status).to.equal(400);
    });

    it("should respond with a 400 status code when city is empty", async () => {
      // Assign
      const invalidInput = {
        email: "test1@example.com",
        password: "Password1!",
      };
      // Act
      const response = await request.patch("/deletefav").send(invalidInput);
      // Assert
      expect(response.status).to.equal(400);
    });
  });
});
