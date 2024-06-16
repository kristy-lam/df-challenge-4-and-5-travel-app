import axiosMock from "axios";
import addFavService from "../../src/services/addFav.service.js";
import deleteFavService from "../../src/services/deleteFav.service.js";
import getAllFavsService from "../../src/services/getAllFavs.service.js";
import loginUser from "../../src/services/loginUser.service.js";
import registerUser from "../../src/services/registerUser.service.js";
import testUser from "./testUser.json";
import testNewUser from "./testNewUser.json";
import testNewFav from "./testNewFav.json";

vi.mock("axios");

describe("External user data tests", () => {
  let functionResult;

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("registerUser tests", () => {
    describe("Successful requests", () => {
      beforeEach(async () => {
        // Assign
        axiosMock.post.mockResolvedValueOnce({ status: 201 });
        // Act
        functionResult = await registerUser(
          testNewUser.email,
          testNewUser.password
        );
      });

      test("should call axios.post once with supplied URL", async () => {
        // Assert
        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(axiosMock.post).toHaveBeenCalledWith(
          import.meta.env.VITE_APP_REGISTERURL,
          { email: testNewUser.email, password: testNewUser.password }
        );
      });

      test("should return 201 status when valid data is sent", async () => {
        // Assert
        expect(functionResult.status).toEqual(201);
      });
    });

    describe("Error tests", () => {
      test("should return an error object with provided error message", async () => {
        // Assign
        const expectedError = new Error("Test error message");
        axiosMock.post.mockRejectedValueOnce(expectedError);
        // Act & Assert
        await expect(
          registerUser({ email: testUser.email, password: testUser.password })
        ).rejects.toThrow(expectedError.message);
      });
    });
  });

  describe("loginUser tests", () => {
    describe("Successful requests", () => {
      beforeEach(async () => {
        // Assign
        axiosMock.post.mockResolvedValueOnce(
          { status: 200 },
          {
            data: testUser,
          }
        );
        // Act
        functionResult = await loginUser(testUser.email, testUser.password);
      });

      test("should call axios.post once with supplied URL", async () => {
        // Assert
        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(axiosMock.post).toHaveBeenCalledWith(
          import.meta.env.VITE_APP_LOGINURL,
          { email: testUser.email, password: testUser.password }
        );
      });

      test("should return 200 status when valid data is sent", async () => {
        // Assert
        expect(functionResult.status).toEqual(200);
      });
    });

    describe("Error tests", () => {
      test("should return an error object with provided error message", async () => {
        // Assign
        const expectedError = new Error("Test error message");
        axiosMock.post.mockRejectedValueOnce(expectedError);
        // Act & Assert
        await expect(
          loginUser({ email: testUser.email, password: testUser.password })
        ).rejects.toThrow(expectedError.message);
      });
    });
  });

  describe("getAllFavs tests", () => {
    describe("Successful requests", () => {
      const expectedReturn = { status: 200, data: testUser.favs };

      beforeEach(async () => {
        // Assign
        axiosMock.post.mockResolvedValueOnce(expectedReturn);
        // Act
        functionResult = await getAllFavsService({
          email: testUser.email,
          password: testUser.password,
        });
      });

      test("should call axios.post once with supplied URL", async () => {
        // Assert
        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(axiosMock.post).toHaveBeenCalledWith(
          import.meta.env.VITE_APP_FAVURL,
          { email: testUser.email, password: testUser.password }
        );
      });

      test("should return an array of favourites when valid data is sent", async () => {
        // Assert
        expect(functionResult).toEqual(
          expect.arrayContaining(expectedReturn.data)
        );
      });
    });

    describe("Error tests", () => {
      test("should return an error object with provided error message", async () => {
        // Assign
        const expectedError = new Error("Test error message");
        axiosMock.post.mockRejectedValueOnce(expectedError);
        // Act & Assert
        await expect(
          getAllFavsService({
            email: testUser.email,
            password: testUser.password,
          })
        ).rejects.toThrow(expectedError.message);
      });
    });
  });

  describe("addFav tests", () => {
    describe("Successful requests", () => {
      beforeEach(async () => {
        // Assign
        axiosMock.patch.mockResolvedValueOnce({ data: { status: 201 } });
        // Act
        functionResult = await addFavService(testNewFav.city, {
          email: testUser.email,
          password: testUser.password,
        });
      });

      test("should call axios.patch once with supplied URL", async () => {
        // Assert
        expect(axiosMock.patch).toHaveBeenCalledTimes(1);
        expect(axiosMock.patch).toHaveBeenCalledWith(
          import.meta.env.VITE_APP_ADDFAVURL,
          {
            city: testNewFav.city,
            email: testUser.email,
            password: testUser.password,
          }
        );
      });

      test("should return a 201 status when valid data is sent", async () => {
        // Assert
        expect(functionResult.status).toEqual(201);
      });
    });

    describe("Error tests", () => {
      test("should return an error object with provided error message", async () => {
        // Assign
        const expectedError = new Error("Test error message");
        axiosMock.patch.mockRejectedValueOnce(expectedError);
        // Act
        const result = await addFavService(testNewFav.city, {
          email: testUser.email,
          password: testUser.password,
        });
        // Assert
        expect(result).toEqual(expectedError.message);
      });
    });
  });

  describe("deleteFav tests", () => {
    describe("Successful requests", () => {
      beforeEach(async () => {
        // Assign
        axiosMock.patch.mockResolvedValueOnce({ data: { status: 200 } });
        // Act
        functionResult = await deleteFavService(testUser.favs[0].city, {
          email: testUser.email,
          password: testUser.password,
        });
      });

      test("should call axios.patch once with supplied URL", async () => {
        // Assert
        expect(axiosMock.patch).toHaveBeenCalledTimes(1);
        expect(axiosMock.patch).toHaveBeenCalledWith(
          import.meta.env.VITE_APP_DELETEFAVURL,
          {
            city: testUser.favs[0].city,
            email: testUser.email,
            password: testUser.password,
          }
        );
      });

      test("should return a 200 status when valid data is sent", async () => {
        // Assert
        expect(functionResult.status).toEqual(200);
      });
    });

    describe("Error tests", () => {
      test("should return an error object with provided error message", async () => {
        // Assign
        const expectedError = new Error("Test error message");
        axiosMock.patch.mockRejectedValueOnce(expectedError);
        // Act
        const result = await deleteFavService(testUser.favs[0].city, {
          email: testUser.email,
          password: testUser.password,
        });
        // Assert
        expect(result).toEqual(expectedError.message);
      });
    });
  });
});
