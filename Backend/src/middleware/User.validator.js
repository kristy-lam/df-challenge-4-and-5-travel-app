import * as expressValidator from "express-validator";

export default class UserValidator {
  static validate = () => {
    try {
      return [
        expressValidator.body("_id").optional().isMongoId(),
        expressValidator
          .body("email")
          .notEmpty()
          .isEmail()
          .withMessage("Email is invalid."),
        expressValidator
          .body("password")
          .notEmpty()
          .matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
          )
          .withMessage(
            "Password is invalid. It must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character."
          ),
        expressValidator
          .body("favs")
          .isArray()
          .optional()
          .custom((favs) => {
            favs.forEach((fav) => {
              if ("city" in fav && typeof fav.city !== "string") {
                throw new Error("Each fav must have a city as a string.");
              }
            });
            return true;
          }),
        UserValidator.handleValidationErrors,
      ];
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  static handleValidationErrors = (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
}
