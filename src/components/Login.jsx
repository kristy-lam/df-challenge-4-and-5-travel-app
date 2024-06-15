import { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../utils/loginValidator.js";
import loginUser from "../services/loginUser.service.js";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [userEmail, setUserEmail] = useState("");
  const [isUserEmailTouched, setIsUserEmailTouched] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [isUserEmailValid, setIsUserEmailValid] = useState(true);
  const [isUserPasswordValid, setIsUserPasswordValid] = useState(true);
  const [isLoginFormValid, setIsLoginFormValid] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

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

  const handleLogin = async () => {
    if (isLoginFormValid) {
      try {
        const res = await loginUser(userEmail, userPassword);
        setLoginMessage(res.message);
        setIsLoggedIn(true);
      } catch (e) {
        setLoginMessage(e.message);
      }
    }
  };

  return (
    <>
      <div
        className="modal-fullscreen modal fade text-center"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="loginModalLabel"
                style={{ color: "#2EC4B6", fontWeight: "bold" }}
              >
                Welcome back!
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
                      placeholder="example@example.com"
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
                  disabled={!isLoginFormValid || isLoggedIn}
                  onClick={handleLogin}
                >
                  Login
                </button>
                {loginMessage && (
                  <div>
                    <br />
                    {loginMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
