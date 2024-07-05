import UserService from "../services/User.service.js";

export default class UserController {
  #service;

  constructor(userService = new UserService()) {
    this.#service = userService;
  }

  registerUser = async (req, res) => {
    try {
      const newUser = await this.#service.registerUser(req.body);
      if (!newUser || !newUser.email || !newUser.password) {
        throw new Error("Invalid user.");
      } else {
        res.status(201).json(newUser);
      }
    } catch (e) {
      if (
        e.message === "Invalid user." ||
        e.message === "Email has already been registered." // Brought from user service
      ) {
        res.status(400).json({ message: e.message });
      } else {
        res.status(500).json({ message: "Unable to register user." });
      }
    }
  };

  authenticateUser = async (req, res) => {
    try {
      const userToAuthenticate = await this.#service.authenticateUser(req.body);
      if (
        !userToAuthenticate ||
        !userToAuthenticate.email ||
        !userToAuthenticate.password
      ) {
        throw Error("User authentication failed.");
      } else {
        res
          .status(200)
          .send({ message: `Login Success.`, user: userToAuthenticate });
      }
    } catch (e) {
      if (e.message === "User authentication failed.") {
        // Brought from user service
        res.status(401).json({ message: "User authentication failed." });
      } else {
        res.status(500).json({ message: "Unable to authenticate user." });
      }
    }
  };

  updatePassword = async (req, res) => {
    try {
      const userToUpdate = await this.#service.updatePassword(req.body);
      if (!userToUpdate || !userToUpdate.email || !userToUpdate.password) {
        throw Error("User was not found.");
      } else {
        res.status(200).json(userToUpdate);
      }
    } catch (e) {
      if (e.message === "User was not found.") {
        // Brought from user service
        res.status(400).json({ message: e.message });
      } else {
        res.status(500).json({ message: "Unable to update password." });
      }
    }
  };

  getAllFavs = async (req, res) => {
    try {
      const favs = await this.#service.getAllFavs(req.body);
      res.status(200).send(favs);
    } catch (e) {
      if (e.message === "User authentication failed.") {
        res.status(400).json({ message: e.message });
      } else {
        res.status(500).json({ message: e.message });
      }
    }
  };

  addFav = async (req, res) => {
    try {
      await this.#service.addFav(req.body);
      res.sendStatus(201);
    } catch (e) {
      if (
        e.message ===
          "User authentication failed or favourite already exists." ||
        e.message === "Invalid favourite."
      ) {
        res.status(400).json({ message: e.message });
      } else {
        res.status(500).json({ message: e.message });
      }
    }
  };

  deleteFav = async (req, res) => {
    try {
      await this.#service.deleteFav(req.body);
      res.sendStatus(200);
    } catch (e) {
      if (
        e.message === "User authentication failed or favorite not found." ||
        e.message === "Invalid favourite."
      ) {
        res.status(400).json({ message: e.message });
      } else {
        res.status(500).json({ message: e.message });
      }
    }
  };
}
