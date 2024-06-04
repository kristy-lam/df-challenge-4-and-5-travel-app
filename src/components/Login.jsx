import { useState, useEffect } from "react";
import {
  validateEmail,
  validatePassword,
  confirmPassword,
} from "../utils/loginValidator.js";

const Login = () => {
  // States, effect and event handlers for login details
  const [userEmail, setUserEmail] = useState("");
  const [isUserEmailTouched, setIsUserEmailTouched] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [isUserEmailValid, setIsUserEmailValid] = useState(true);
  const [isUserPasswordValid, setIsUserPasswordValid] = useState(true);
  const [isLoginFormValid, setIsLoginFormValid] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUserEmailChange = (event) => {
    const userEmail = event.target.value;
    setUserEmail(userEmail);
    setIsUserEmailTouched(true);
    setIsUserEmailValid(validateEmail(userEmail));
  };

  const handleUserPasswordChange = (event) => {
    const userPassword = event.target.value;
    setUserPassword(userPassword);
    setIsUserPasswordValid(validatePassword(userPassword));
  };

  useEffect(() => {
    setIsLoginFormValid(
      isUserEmailTouched && isUserEmailValid && isUserPasswordValid
    );
  }, [isUserEmailTouched, isUserEmailValid, isUserPasswordValid]);

  useEffect(() => {
    setIsLoggedIn(isLoginFormValid);
  }, [isLoginFormValid]);

  // States, effect and event handlers for registration details
  const [regEmail, setRegEmail] = useState("");
  const [isRegEmailTouched, setIsRegEmailTouched] = useState(false);
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [isRegEmailValid, setIsRegEmailValid] = useState(true);
  const [isRegPasswordValid, setIsRegPasswordValid] = useState(true);
  const [isRegConfirmPasswordValid, setIsRegConfirmPasswordValid] =
    useState(true);
  const [isRegFormValid, setIsRegFormValid] = useState(false);

  useEffect(() => {
    setIsRegFormValid(
      isRegEmailTouched &&
        isRegEmailValid &&
        isRegPasswordValid &&
        isRegConfirmPasswordValid
    );
  }, [
    isRegEmailTouched,
    isRegEmailValid,
    isRegPasswordValid,
    isRegConfirmPasswordValid,
  ]);

  const handleRegEmailChange = (event) => {
    const regEmail = event.target.value;
    setRegEmail(regEmail);
    setIsRegEmailTouched(true);
    setIsRegEmailValid(validateEmail(regEmail));
  };

  const handleRegPasswordChange = (event) => {
    const regPassword = event.target.value;
    setRegPassword(regPassword);
    setIsRegPasswordValid(validatePassword(regPassword));
  };

  const handleRegConfirmPasswordChange = (event) => {
    const regConfirmPassword = event.target.value;
    setRegConfirmPassword(regConfirmPassword);
    setIsRegConfirmPasswordValid(
      confirmPassword(regPassword, regConfirmPassword)
    );
  };

  return (
    <>
      <div
        className="modal fade modal-fullscreen text-center"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="staticBackdropLabel"
                style={{ color: "#2EC4B6", fontWeight: "bold" }}
              >
                Welcome to DF Travel
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h6 style={{ color: "#2EC4B6", fontWeight: "bolder" }}>
                Login to manage your favourite locations!
              </h6>
              <br />
              {/* Login Form */}
              <form>
                <div className="row mb-3">
                  <label
                    htmlFor="loginEmail"
                    className="col-sm-4 col-form-label"
                  >
                    User Email
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="email"
                      className={`form-control ${
                        isUserEmailValid ? "" : "is-invalid"
                      }`}
                      id="loginEmail"
                      placeholder="Enter your email address..."
                      autoComplete="username"
                      value={userEmail}
                      onChange={handleUserEmailChange}
                      required
                    />
                    {!isUserEmailValid && (
                      <div className="invalid-feedback">
                        The email address you inputted is invalid.
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="loginPassword"
                    className="col-sm-4 col-form-label"
                  >
                    User Password
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="password"
                      className={`form-control ${
                        isUserPasswordValid ? "" : "is-invalid"
                      }`}
                      id="loginPassword"
                      placeholder="Enter your password..."
                      autoComplete="current-password"
                      value={userPassword}
                      onChange={handleUserPasswordChange}
                      required
                    />
                    {!isUserPasswordValid && (
                      <div className="invalid-feedback">
                        The password must be at least 8 characters long and
                        contain at least one uppercase letter, one number, and
                        one special character.
                      </div>
                    )}
                  </div>
                </div>
                <button
                  name="login"
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#2EC4B6", color: "#FFFFFF" }}
                  disabled={!isLoginFormValid}
                >
                  Login
                </button>
              </form>
            </div>
            <hr />
            <div className="modal-body">
              <h6 style={{ color: "#FF9F1C", fontWeight: "bolder" }}>
                Don't have an account yet?
                <br />
                Register for an account to save your favourite locations!
              </h6>
              <br />
              {/* Registration Form */}
              <form>
                <div className="row mb-3">
                  <label
                    htmlFor="registerEmail"
                    className="col-sm-4 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="email"
                      className={`form-control ${
                        isRegEmailValid ? "" : "is-invalid"
                      }`}
                      id="registerEmail"
                      placeholder="Enter your email address..."
                      autoComplete="username"
                      value={regEmail}
                      onChange={handleRegEmailChange}
                      required
                    />
                    {!isRegEmailValid && (
                      <div className="invalid-feedback">
                        The email address you inputted is invalid.
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="registerPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Password
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="password"
                      className={`form-control ${
                        isRegPasswordValid ? "" : "is-invalid"
                      }`}
                      id="registerPassword"
                      placeholder="Enter a password..."
                      autoComplete="new-password"
                      value={regPassword}
                      onChange={handleRegPasswordChange}
                      required
                    />
                    {!isRegPasswordValid && (
                      <div className="invalid-feedback">
                        The password must be at least 8 characters long and
                        contain at least one uppercase letter, one number, and
                        one special character.
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="confirmPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Confirm Password
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="password"
                      className={`form-control ${
                        isRegConfirmPasswordValid ? "" : "is-invalid"
                      }`}
                      id="confirmPassword"
                      placeholder="Confirm the password..."
                      autoComplete="new-password"
                      value={regConfirmPassword}
                      onChange={handleRegConfirmPasswordChange}
                      required
                    />
                    {!isRegConfirmPasswordValid && (
                      <div className="invalid-feedback">
                        Your password inputs do not match.
                      </div>
                    )}
                  </div>
                </div>
                <button
                  name="register"
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#FF9F1C", color: "#FFFFFF" }}
                  disabled={!isRegFormValid}
                >
                  Register
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary text-secondary"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#FFFFFF",
                  borderColor: "#2EC4B6",
                }}
                data-bs-dismiss="modal"
              >
                Back to the App without registering / logging in...
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
