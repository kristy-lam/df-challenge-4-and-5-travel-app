import { useState, useEffect } from "react";
import {
  validateEmail,
  validatePassword,
  confirmPassword,
} from "../utils/loginValidator.js";
import registerUser from "../services/registerUser.service.js";
import Login from "./Login.jsx";

const Register = ({
  isLoggedIn,
  setIsLoggedIn,
  isRegistered,
  setIsRegistered,
}) => {
  const [regEmail, setRegEmail] = useState("");
  const [isRegEmailTouched, setIsRegEmailTouched] = useState(false);
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [isRegEmailValid, setIsRegEmailValid] = useState(true);
  const [isRegPasswordValid, setIsRegPasswordValid] = useState(true);
  const [isRegConfirmPasswordValid, setIsRegConfirmPasswordValid] =
    useState(true);
  const [isRegFormValid, setIsRegFormValid] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");

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

  useEffect(() => {
    setIsRegFormValid(
      isRegEmailTouched && isRegEmailValid && isRegPasswordValid
    );
  }, [isRegEmailTouched, isRegEmailValid, isRegPasswordValid]);

  const handleRegister = async () => {
    if (isRegFormValid) {
      try {
        const res = await registerUser(regEmail, regPassword);
        if (res.status === 200) {
          setRegisterMessage("Registration Success.");
          setIsRegistered(true);
        }
      } catch (e) {
        setRegisterMessage(e.message);
      }
    }
  };

  return (
    <>
      <div
        className="modal-fullscreen modal fade text-center"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="registerModalLabel"
                style={{ color: "#2EC4B6", fontWeight: "bold" }}
              >
                Welcome to DF Travel!
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
                Register to enjoy adding a location to your favourites!
              </h6>
              <br />
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
                      placeholder="example@example.com"
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
                  style={{ backgroundColor: "#2EC4B6", color: "#FFFFFF" }}
                  disabled={!isRegFormValid}
                  onClick={handleRegister}
                >
                  Register
                </button>
              </form>
              {registerMessage && (
                <div>
                  <br />
                  {registerMessage}
                </div>
              )}
              {/* After registration */}
              {isRegistered && (
                <>
                  <hr />
                  {!isLoggedIn ? (
                    <>
                      <p>Login now to manage your favourites!</p>
                      <br />
                      <button
                        type="button"
                        className="btn"
                        style={{ backgroundColor: "#FF9F1C", color: "#FFFFFF" }}
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal"
                      >
                        Login
                      </button>
                      <Login setIsLoggedIn={setIsLoggedIn} />
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn"
                      style={{ backgroundColor: "#FF9F1C", color: "#FFFFFF" }}
                      onClick={() => setIsLoggedIn(false)}
                    >
                      Logout
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
