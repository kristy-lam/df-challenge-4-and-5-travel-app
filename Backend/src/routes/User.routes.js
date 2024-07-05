import { Router } from "express";
import UserController from "../controllers/User.controller.js";
import UserValidator from "../middleware/User.validator.js";

export default class UserRoutes {
  #controller;
  #router;
  #routeStartPoint;

  constructor(controller = new UserController(), routeStartPoint = "/") {
    this.#controller = controller;
    this.#routeStartPoint = routeStartPoint;
    this.#router = Router();
    this.#initialiseRoutes();
  }

  #initialiseRoutes = () => {
    this.#router.post(
      "/register",
      UserValidator.validate(),
      this.#controller.registerUser
    );
    this.#router.post("/login", this.#controller.authenticateUser);
    this.#router.patch(
      "/password",
      UserValidator.validate(),
      this.#controller.updatePassword
    );
    this.#router.post("/fav", this.#controller.getAllFavs);
    this.#router.patch(
      "/addfav",
      UserValidator.validate(),
      this.#controller.addFav
    );
    this.#router.patch("/deletefav", this.#controller.deleteFav);
  };

  getRouter = () => {
    return this.#router;
  };

  getRouteStartPoint = () => {
    return this.#routeStartPoint;
  };
}
